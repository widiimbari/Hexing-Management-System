
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const db = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "admin"; 

  // Delete existing
  const deleted = await db.users.deleteMany({
    where: { username: username },
  });
  console.log(`Deleted ${deleted.count} users.`);

  // Create new
  const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
  const user = await db.users.create({
    data: {
      username,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`Created user ID: ${user.id}, Hash: ${user.password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
