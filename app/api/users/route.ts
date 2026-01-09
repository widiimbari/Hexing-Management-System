import { NextResponse } from "next/server";
import { dbManagement } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { logError, getErrorContext, getSafeErrorMessage } from "@/lib/error-logger";
import { getCurrentUser } from "@/lib/auth";
import { UserLog } from "@/lib/system-logger";

export async function GET(req: Request) {
  try {
    // Authorization: Only super_admin can access users list
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "super_admin") {
      return NextResponse.json(
        { message: "Unauthorized: Super admin access required" },
        { status: 403 }
      );
    }

    const users = await dbManagement.users.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        name: true,
        image_url: true,
      },
      orderBy: {
        username: "asc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    const currentUser = await getCurrentUser();
    const userContext = currentUser?.id
      ? { id: currentUser.id as string, username: currentUser.username }
      : undefined;

    logError(
      error as Error,
      getErrorContext(req, userContext),
      "medium"
    );

    const isDevelopment = process.env.NODE_ENV === "development";
    const safeMessage = getSafeErrorMessage(error, isDevelopment);

    return NextResponse.json(
      { message: safeMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Authorization: Only super_admin can create users
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "super_admin") {
      return NextResponse.json(
        { message: "Unauthorized: Super admin access required" },
        { status: 403 }
      );
    }

    const { username, password, role, name, image_url } = await req.json();

    if (!username || !password || !role || !name) {
      return NextResponse.json(
        { message: "Username, password, role, and name are required" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const existingUser = await dbManagement.users.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }

    // Hash password using bcrypt (secure)
    const hashedPassword = await hashPassword(password);

    const newUser = await dbManagement.users.create({
      data: {
        username,
        password: hashedPassword,
        role,
        name,
        image_url,
      },
    });

    // Log user creation
    try {
      await UserLog.create(newUser.id, `Created user ${newUser.username}`, { username, role, name });
    } catch (logError) {
      console.error("[User API] Failed to log user creation:", logError);
    }

    return NextResponse.json({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      name: newUser.name,
      image_url: newUser.image_url,
    });
  } catch (error) {
    const currentUser = await getCurrentUser();
    const userContext = currentUser?.id
      ? { id: currentUser.id as string, username: currentUser.username }
      : undefined;

    logError(
      error as Error,
      getErrorContext(req, userContext),
      "medium"
    );

    const isDevelopment = process.env.NODE_ENV === "development";
    const safeMessage = getSafeErrorMessage(error, isDevelopment);

    return NextResponse.json(
      { message: safeMessage },
      { status: 500 }
    );
  }
}
