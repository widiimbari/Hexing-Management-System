import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function GET() {
  try {
    const users = await db.users.findMany({
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

    const existingUser = await db.users.findFirst({
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

    const newUser = await db.users.create({
      data: {
        username,
        password: password, // Send plain text, DB trigger handles hashing
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
