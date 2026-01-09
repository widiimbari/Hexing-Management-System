import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import { UserLog } from "@/lib/system-logger";

export async function POST() {
  // Get current user before deleting the session
  let userId: number | undefined;
  let userName: string | undefined;

  try {
    const user = await getCurrentUser();
    if (user && user.id) {
      userId = parseInt(user.id, 10);
      userName = user.username;
    }
  } catch (error) {
    console.error("[Logout API] Failed to get current user:", error);
  }

  // Delete the session cookie
  (await cookies()).delete("session_token");

  // Log the logout event
  if (userId && userName) {
    try {
      await UserLog.logout(userId, userName);
    } catch (error) {
      console.error("[Logout API] Failed to log logout event:", error);
    }
  }

  return NextResponse.json({ message: "Logout successful" });
}