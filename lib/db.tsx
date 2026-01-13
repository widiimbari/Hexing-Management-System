import { PrismaClient as InventoryClient } from "../generated/inventory-client-v2";
import { PrismaClient as ManagementClient } from "../generated/management-client-v2";
import { PrismaClient as AssetClient } from "../generated/asset-client-v15";
import { PrismaClient as WarehouseClient } from "../generated/warehouse-client";

// Global declaration for development HMR
const globalForPrisma = globalThis as unknown as {
  prismaInventory: InventoryClient | undefined;
  prismaManagement: ManagementClient | undefined;
  prismaAssetV15: AssetClient | undefined;
  prismaWarehouse: WarehouseClient | undefined;
};

// Export individual database clients
// Force reload: v2 client update
export const db = globalForPrisma.prismaInventory ?? new InventoryClient();
export const dbManagement = globalForPrisma.prismaManagement ?? new ManagementClient();
export const dbAsset = globalForPrisma.prismaAssetV15 ?? new AssetClient();
export const dbWarehouse = globalForPrisma.prismaWarehouse ?? new WarehouseClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaInventory = db;
  globalForPrisma.prismaManagement = dbManagement;
  globalForPrisma.prismaAssetV15 = dbAsset;
  globalForPrisma.prismaWarehouse = dbWarehouse;
}