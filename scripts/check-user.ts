import { PrismaClient } from "../generated/management-client";

const db = new PrismaClient();

async function main() {
  console.log("Checking for user 'admin' in hexing_management...");
  try {
    const user = await db.users.findFirst({
      where: { username: "admin" },
    });

    if (user) {
      console.log("User found:");
      console.log("ID:", user.id);
      console.log("Username:", user.username);
      console.log("Role:", user.role);
      console.log("Password Hash:", user.password);
    } else {
      console.log("User 'admin' NOT found.");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
