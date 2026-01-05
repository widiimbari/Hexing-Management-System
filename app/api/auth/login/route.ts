import { NextResponse } from "next/server";
import { dbManagement } from "@/lib/db";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey123";
const key = new TextEncoder().encode(SECRET_KEY);

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

    // Check password (MD5)
    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    if (hashedPassword !== user.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT
    const token = await new SignJWT({
      sub: user.id.toString(),
      username: user.username,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h") // Token expires in 24 hours
      .sign(key);

    // Set Cookie
    (await cookies()).set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: `Internal server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
