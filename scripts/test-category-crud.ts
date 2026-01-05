
import { dbAsset } from "../lib/db";

async function main() {
  try {
    console.log("Creating test category...");
    const category = await dbAsset.categories.create({
      data: {
        name: "Test Category " + Date.now(),
        created_at: new Date(),
        updated_at: new Date(),
      }
    });
    console.log("Created:", category);

    console.log("Updating test category...");
    const updated = await dbAsset.categories.update({
      where: { id: category.id },
      data: {
        name: category.name + " Updated",
        updated_at: new Date(),
      }
    });
    console.log("Updated:", updated);

    console.log("Deleting test category...");
    await dbAsset.categories.delete({
      where: { id: category.id }
    });
    console.log("Deleted.");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await dbAsset.$disconnect();
  }
}

main();
