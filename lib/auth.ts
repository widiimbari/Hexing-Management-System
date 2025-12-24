import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey123";
const key = new TextEncoder().encode(SECRET_KEY);

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, key);
    return {
      id: payload.sub,
      username: payload.username as string,
      role: payload.role as string,
    };
  } catch (error) {
    return null;
  }
}
