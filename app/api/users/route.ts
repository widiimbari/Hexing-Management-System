import { NextResponse } from "next/server";
import { dbManagement } from "@/lib/db";
import crypto from "crypto";

export async function GET() {
  try {
    const users = await dbManagement.users.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
      orderBy: {
        username: "asc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { username, password, role } = await req.json();

    if (!username || !password || !role) {
      return NextResponse.json(
        { message: "Username, password, and role are required" },
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

    // Hash password here to be consistent with login
    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    const newUser = await dbManagement.users.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
