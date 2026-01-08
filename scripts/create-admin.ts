
import { PrismaClient } from "../generated/management-client-v2";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "admin"; // Default password
  const role = "super_admin"; // Use super_admin role
  const name = "Administrator";

  const existing = await db.users.findFirst({
    where: { username },
  });

  if (existing) {
    console.log("User 'admin' already exists.");
    return;
  }

  // Use bcrypt instead of MD5
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.users.create({
    data: {
      username,
      password: hashedPassword,
      role,
      name,
    },
  });

  console.log(`✅ Created user: ${user.username} with password: ${password}`);
  console.log(`   Role: ${role}`);
  console.log(`   Name: ${name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
