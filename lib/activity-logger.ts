import { getCurrentUser } from "@/lib/auth";
import { AssetLog, type LogAction as SystemLogAction } from "@/lib/system-logger";

export type LogAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPORT' | 'EXPORT' | 'TRANSFER';

// Map entity names to AssetEntity type
type AssetEntityType = 'Asset' | 'Employee' | 'Category' | 'Brand' | 'Area' | 'Location' | 'Supplier' | 'Department' | 'AssetType' | 'Transaction';

function mapEntityType(entity: string): AssetEntityType {
  const mapping: Record<string, AssetEntityType> = {
    'asset': 'Asset',
    'assets': 'Asset',
    'employee': 'Employee',
    'employees': 'Employee',
    'category': 'Category',
    'categories': 'Category',
    'brand': 'Brand',
    'brands': 'Brand',
    'area': 'Area',
    'areas': 'Area',
    'location': 'Location',
    'locations': 'Location',
    'supplier': 'Supplier',
    'suppliers': 'Supplier',
    'department': 'Department',
    'departments': 'Department',
    'asset_type': 'AssetType',
    'asset_types': 'AssetType',
    'transaction': 'Transaction',
    'transactions': 'Transaction',
  };
  return mapping[entity.toLowerCase()] || 'Asset';
}

/**
 * @deprecated Use systemLog from system-logger.ts instead
 * This function is kept for backwards compatibility
 */
export async function createInventoryLog(
  action: LogAction,
  entity: string,
  entityId: string,
  details: string,
  user?: { username: string } | null
) {
  try {
    // Log to new system_logs
    const mappedEntity = mapEntityType(entity);
    if (action === 'CREATE') {
      await AssetLog.create(mappedEntity, entityId, details);
    } else if (action === 'UPDATE') {
      await AssetLog.update(mappedEntity, entityId, details);
    } else if (action === 'DELETE') {
      await AssetLog.delete(mappedEntity, entityId, details);
    } else if (action === 'EXPORT') {
      await AssetLog.export(details);
    } else if (action === 'IMPORT') {
      await AssetLog.import(details);
    }
  } catch (error) {
    console.error("Failed to create inventory log:", error);
  }
}

/**
 * @deprecated Use systemLog from system-logger.ts instead
 * This function is kept for backwards compatibility
 */
export async function logActivity(
  action: LogAction,
  entityType: string,
  entityId: string,
  details: string | object,
  user?: { id: string | undefined; username: string } | null
) {
  try {
    const detailsStr = typeof details === 'string' ? details : JSON.stringify(details);

    // Log to new system_logs
    const mappedEntity = mapEntityType(entityType);
    if (action === 'CREATE') {
      await AssetLog.create(mappedEntity, entityId, detailsStr);
    } else if (action === 'UPDATE') {
      await AssetLog.update(mappedEntity, entityId, detailsStr);
    } else if (action === 'DELETE') {
      await AssetLog.delete(mappedEntity, entityId, detailsStr);
    } else if (action === 'EXPORT') {
      await AssetLog.export(detailsStr);
    } else if (action === 'IMPORT') {
      await AssetLog.import(detailsStr);
    }
  } catch (error) {
    console.error("Failed to create activity log:", error);
  }
}
