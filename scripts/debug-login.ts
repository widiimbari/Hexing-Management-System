
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const db = new PrismaClient();

async function main() {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.log("Usage: npx tsx scripts/debug-login.ts <username> <password>");
    return;
  }

  console.log(`Checking user: ${username}`);
  const user = await db.users.findFirst({
    where: { username: username },
  });

  if (!user) {
    console.log("User not found in DB.");
    return;
  }

  console.log("User found:", user.username);
  console.log("Stored Password Hash:", user.password);

  const inputHash = crypto.createHash("md5").update(password).digest("hex");
  console.log("Input Password Hash: ", inputHash);

  if (user.password === inputHash) {
    console.log("MATCH! Login should work.");
  } else {
    console.log("MISMATCH! Login will fail.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
