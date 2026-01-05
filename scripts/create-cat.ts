
import { dbAsset } from "../lib/db";

async function main() {
  try {
    const category = await dbAsset.categories.create({
      data: {
        name: "Test Cat " + Date.now(),
        created_at: new Date(),
        updated_at: new Date(),
      }
    });
    console.log(category.id.toString());
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await dbAsset.$disconnect();
  }
}

main();
