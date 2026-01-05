import { PrismaClient } from "../generated/management-client";
import crypto from "crypto";

const db = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "admin";
  
  // MD5("admin") = 21232f297a57a5a743894a0e4a801fc3
  const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
  
  console.log(`Resetting password for '${username}' to '${password}' (${hashedPassword})...`);

  try {
    const user = await db.users.update({
        where: { username },
        data: { password: hashedPassword }
    });
    console.log("Password reset successful.");
    console.log("New Hash in DB:", user.password);
  } catch (error) {
    console.error("Failed to reset password:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
