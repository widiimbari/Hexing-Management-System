import { PrismaClient } from "../generated/management-client-v2";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "admin"; // Default password

  // Use bcrypt instead of MD5
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`Resetting password for '${username}' to '${password}'...`);

  try {
    const user = await db.users.update({
        where: { username },
        data: { password: hashedPassword }
    });
    console.log("✅ Password reset successful.");
    console.log("   New password: " + password);
    console.log("   Hash format: bcrypt (secure)");
  } catch (error) {
    console.error("❌ Failed to reset password:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
