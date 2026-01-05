import { dbManagement } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { newPassword } = body;

    if (!newPassword) {
      return NextResponse.json({ message: "New password is required" }, { status: 400 });
    }

    // Update user password in management database
    // Assuming user.id is the ID in management database
    await dbManagement.users.update({
      where: { id: parseInt(user.id as string) },
      data: {
        password: newPassword, // The DB trigger will handle hashing
      },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}