
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const db = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "admin"; // The desired password

  // Calculate the correct hash locally
  const correctHash = crypto.createHash("md5").update(password).digest("hex");
  console.log(`Setting password for '${username}' to '${password}'`);
  console.log(`Expected Hash: ${correctHash}`);

  // Update directly
  const user = await db.users.updateMany({
    where: { username: username },
    data: {
      password: correctHash,
    },
  });

  console.log(`Updated ${user.count} user(s).`);
  
  // Verify
  const updatedUser = await db.users.findFirst({ where: { username } });
  if (updatedUser) {
      console.log(`New Stored Hash: ${updatedUser.password}`);
      if (updatedUser.password === correctHash) {
          console.log("SUCCESS: Hash matches.");
      } else {
          console.log("ERROR: Hash mismatch after update. Something is weird.");
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
