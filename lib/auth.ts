import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { JWT_KEY } from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_KEY);
    return {
      id: payload.sub,
      username: payload.username as string,
      role: payload.role as string,
    };
  } catch (error) {
    return null;
  }
}
