
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const username = "admin";
  const users = await db.users.findMany({
    where: { username: username },
  });

  console.log(`Found ${users.length} users with username '${username}'`);
  users.forEach((u) => {
      console.log(`ID: ${u.id}, Role: ${u.role}, PasswordHash: ${u.password}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
