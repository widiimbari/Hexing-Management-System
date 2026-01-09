import { NextResponse } from "next/server";
import { dbManagement } from "@/lib/db";
import { SignJWT } from "jose";
import { JWT_KEY, JWT_EXPIRY, JWT_COOKIE_MAX_AGE, JWT_ALGORITHM } from "@/lib/jwt";
import { verifyPassword, isMD5Hash, verifyMD5Password, hashPassword } from "@/lib/password";
import { logError, getErrorContext, getSafeErrorMessage } from "@/lib/error-logger";
import { UserLog } from "@/lib/system-logger";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await dbManagement.users.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password (supports both bcrypt and legacy MD5)
    let isPasswordValid = false;
    let needsMigration = false;

    if (isMD5Hash(user.password)) {
      // Legacy MD5 hash - verify using MD5
      isPasswordValid = verifyMD5Password(password, user.password);
      needsMigration = true; // Flag for migration to bcrypt
    } else {
      // Modern bcrypt hash
      isPasswordValid = await verifyPassword(password, user.password);
    }

    if (!isPasswordValid) {
      // Log failed login attempt
      logError(
        "Failed login attempt",
        {
          username,
          endpoint: "/api/auth/login",
          method: "POST",
          additionalInfo: { reason: "Invalid password" },
        },
        "low"
      );

      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Auto-migrate MD5 password to bcrypt on successful login
    if (needsMigration) {
      try {
        const newHashedPassword = await hashPassword(password);
        await dbManagement.users.update({
          where: { id: user.id },
          data: { password: newHashedPassword },
        });
        console.log(`✅ Migrated user ${username} from MD5 to bcrypt`);
      } catch (migrationError) {
        // Don't fail login if migration fails, just log it
        logError(
          migrationError as Error,
          {
            username,
            endpoint: "/api/auth/login",
            method: "POST",
            additionalInfo: { action: "password_migration" },
          },
          "medium"
        );
      }
    }

    // Create JWT
    const token = await new SignJWT({
      sub: user.id.toString(),
      username: user.username,
      role: user.role,
      name: user.name,
      image_url: user.image_url,
    })
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRY)
      .sign(JWT_KEY);

    // Log successful login
    try {
      await UserLog.login(user.id, user.username);
    } catch (logError) {
      console.error("[Login API] Failed to log login event:", logError);
    }

    // Create response and set cookie on the response object
    const response = NextResponse.json({ message: "Login successful" });

    // Determine if we should use secure cookies
    // In production, only use secure if using HTTPS (not on local/private network)
    const host = req.headers.get("host") || "";
    const hostWithoutPort = host.split(":")[0];
    const isLocalNetwork =
      hostWithoutPort === "localhost" ||
      hostWithoutPort.startsWith("127.") ||
      hostWithoutPort.startsWith("192.168.") ||
      hostWithoutPort.startsWith("10.") ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostWithoutPort);
    const useSecure = process.env.NODE_ENV === "production" && !isLocalNetwork;

    response.cookies.set("session_token", token, {
      httpOnly: true,
      secure: useSecure,
      sameSite: "lax", // Changed from "strict" to allow redirects
      path: "/",
      maxAge: JWT_COOKIE_MAX_AGE,
    });

    console.log(`[Login API] Cookie set - secure: ${useSecure}, host: ${host}`);

    return response;
  } catch (error) {
    // Log the error with context
    logError(
      error as Error,
      getErrorContext(req),
      "high"
    );

    // Return safe error message to client
    const isDevelopment = process.env.NODE_ENV === "development";
    const safeMessage = getSafeErrorMessage(error, isDevelopment);

    return NextResponse.json(
      { message: safeMessage },
      { status: 500 }
    );
  }
}
