import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

// Helper to get ID from params
// Next.js 15+ (and recent 14) params might be promises or direct objects depending on config.
// The safe way is to treat params as potentially awaitable or use the second arg directly.
// In this setup, we usually access context.params.
// But to be safe with types:
type Props = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: Request, { params }: Props) {
  try {
    // In Next.js 15, params is a Promise. In 14 it's an object.
    // The prompt says "Next.js", assuming recent version.
    // Let's await it just in case or access it directly if it's not a promise.
    const { id } = await params; 
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const { username, password, role } = await req.json();

    if (!username || !role) {
        return NextResponse.json({ message: "Username and role are required" }, { status: 400 });
    }

    const dataToUpdate: any = {
      username,
      role,
    };

    if (password) {
      dataToUpdate.password = password; // Send plain text, DB trigger handles hashing
    }

    const updatedUser = await db.users.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    return NextResponse.json({
      id: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    await db.users.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
