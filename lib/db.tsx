import { PrismaClient as InventoryClient } from "../generated/inventory-client";
import { PrismaClient as ManagementClient } from "../generated/management-client";
import { PrismaClient as AssetClient } from "../generated/asset-client-new";
import { PrismaClient as WarehouseClient } from "../generated/warehouse-client";

// Global declaration for development HMR
const globalForPrisma = globalThis as unknown as {
  prismaInventory: InventoryClient | undefined;
  prismaManagement: ManagementClient | undefined;
  prismaAsset: AssetClient | undefined;
  prismaWarehouse: WarehouseClient | undefined;
};

// Export individual database clients
export const db = globalForPrisma.prismaInventory ?? new InventoryClient();
export const dbManagement = globalForPrisma.prismaManagement ?? new ManagementClient();
export const dbAsset = globalForPrisma.prismaAsset ?? new AssetClient();
export const dbWarehouse = globalForPrisma.prismaWarehouse ?? new WarehouseClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaInventory = db;
  globalForPrisma.prismaManagement = dbManagement;
  globalForPrisma.prismaAsset = dbAsset;
  globalForPrisma.prismaWarehouse = dbWarehouse;
}