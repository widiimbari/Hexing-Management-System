import { dbManagement } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { logError, getErrorContext, getSafeErrorMessage } from "@/lib/error-logger";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, image_url, newPassword } = body;

    const data: any = {};
    if (name) data.name = name;
    if (image_url !== undefined) data.image_url = image_url;

    // Hash password if provided
    if (newPassword) {
      // Validate password strength
      if (newPassword.length < 6) {
        return NextResponse.json(
          { message: "Password must be at least 6 characters long" },
          { status: 400 }
        );
      }

      // Hash the new password using bcrypt
      data.password = await hashPassword(newPassword);
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ message: "No data to update" }, { status: 400 });
    }

    // Update user in management database
    await dbManagement.users.update({
      where: { id: parseInt(user.id as string) },
      data: data,
    });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    // Log the error with context
    const currentUser = await getCurrentUser();
    const userContext = currentUser?.id
      ? { id: currentUser.id as string, username: currentUser.username }
      : undefined;

    logError(
      error as Error,
      getErrorContext(req, userContext),
      "medium"
    );

    // Return safe error message to client
    const isDevelopment = process.env.NODE_ENV === "development";
    const safeMessage = getSafeErrorMessage(error, isDevelopment);

    return NextResponse.json({ message: safeMessage }, { status: 500 });
  }
}