import { NextResponse } from "next/server";
import { dbManagement } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { logError, getErrorContext, getSafeErrorMessage } from "@/lib/error-logger";
import { getCurrentUser } from "@/lib/auth";
import { UserLog } from "@/lib/system-logger";

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
    // Authorization: Only super_admin can update users
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "super_admin") {
      return NextResponse.json(
        { message: "Unauthorized: Super admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const { username, password, role, name, image_url } = await req.json();

    if (!username || !role || !name) {
        return NextResponse.json({ message: "Username, role, and name are required" }, { status: 400 });
    }

    const dataToUpdate: any = {
      username,
      role,
      name,
      image_url,
    };

    if (password) {
      // Validate password strength
      if (password.length < 6) {
        return NextResponse.json(
          { message: "Password must be at least 6 characters long" },
          { status: 400 }
        );
      }

      // Hash password using bcrypt (secure)
      dataToUpdate.password = await hashPassword(password);
    }

    // Get old values for logging
    const oldUser = await dbManagement.users.findUnique({
      where: { id: userId },
      select: { username: true, role: true, name: true }
    });

    const updatedUser = await dbManagement.users.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    // Log user update
    try {
      await UserLog.update(updatedUser.id, `Updated user ${updatedUser.username}`, oldUser || undefined, { username, role, name });
    } catch (logError) {
      console.error("[User API] Failed to log user update:", logError);
    }

    return NextResponse.json({
      id: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role,
      name: updatedUser.name,
      image_url: updatedUser.image_url,
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

export async function DELETE(req: Request, { params }: Props) {
  try {
    // Authorization: Only super_admin can delete users
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "super_admin") {
      return NextResponse.json(
        { message: "Unauthorized: Super admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // Prevent deleting yourself
    if (currentUser.id === userId.toString()) {
      return NextResponse.json(
        { message: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Get user details before delete for logging
    const userToDelete = await dbManagement.users.findUnique({
      where: { id: userId },
      select: { username: true, role: true, name: true }
    });

    await dbManagement.users.delete({
      where: { id: userId },
    });

    // Log user deletion
    try {
      if (userToDelete) {
        await UserLog.delete(userId, `Deleted user ${userToDelete.username}`, userToDelete);
      }
    } catch (logError) {
      console.error("[User API] Failed to log user deletion:", logError);
    }

    return NextResponse.json({ message: "User deleted successfully" });
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
