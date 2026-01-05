
import { PrismaClient } from "../generated/management-client";
import crypto from "crypto";

const db = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "admin"; // Default password
  const role = "admin";

  const existing = await db.users.findFirst({
    where: { username },
  });

  if (existing) {
    console.log("User 'admin' already exists.");
    return;
  }

  const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

  const user = await db.users.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });

  console.log(`Created user: ${user.username} with password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
