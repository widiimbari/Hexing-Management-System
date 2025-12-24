
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "admin"; // Sending plain text now

  console.log(`Updating password for '${username}' to '${password}' (plain text)...`);

  await db.users.updateMany({
    where: { username: username },
    data: {
      password: password,
    },
  });

  console.log("Update sent.");

  // Verify
  const user = await db.users.findFirst({ where: { username } });
  if (user) {
      console.log(`Stored Hash: ${user.password}`);
      // Expected: 21232f297a57a5a743894a0e4a801fc3
      if (user.password === "21232f297a57a5a743894a0e4a801fc3") {
          console.log("SUCCESS: Stored hash matches MD5('admin').");
      } else {
          console.log("WARNING: Stored hash is " + user.password);
      }
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
