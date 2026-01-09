import { dbManagement } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { headers } from "next/headers";

// Module types
export type LogModule = 'ASSET' | 'INVENTORY' | 'WAREHOUSE' | 'USER' | 'SYSTEM';

// Action types
export type LogAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'VIEW'
  | 'EXPORT'
  | 'IMPORT'
  | 'LOGIN'
  | 'LOGOUT'
  | 'ASSIGN'
  | 'TRANSFER'
  | 'RETURN';

// Entity types per module
export type AssetEntity = 'Asset' | 'Employee' | 'Category' | 'Brand' | 'Area' | 'Location' | 'Supplier' | 'Department' | 'AssetType' | 'Transaction';
export type InventoryEntity = 'Product' | 'Attachment' | 'PackingList' | 'Box' | 'Pallet';
export type WarehouseEntity = 'StockIn' | 'StockOut' | 'Transfer';
export type UserEntity = 'User' | 'Session';
export type SystemEntity = 'Settings' | 'Backup';

export type LogEntity = AssetEntity | InventoryEntity | WarehouseEntity | UserEntity | SystemEntity;

interface LogOptions {
  module: LogModule;
  action: LogAction;
  entityType: LogEntity;
  entityId?: string | number;
  description?: string;
  oldValues?: Record<string, any> | null;
  newValues?: Record<string, any> | null;
  userId?: number;
  userName?: string;
}

/**
 * Get client IP address from request headers
 */
async function getClientInfo(): Promise<{ ip: string | null; userAgent: string | null }> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const userAgent = headersList.get('user-agent');

    let ip = forwardedFor?.split(',')[0]?.trim() || realIp || null;

    return { ip, userAgent };
  } catch {
    return { ip: null, userAgent: null };
  }
}

/**
 * Create a system log entry
 */
export async function systemLog(options: LogOptions): Promise<void> {
  try {
    const { module, action, entityType, entityId, description, oldValues, newValues, userId, userName } = options;

    console.log("[SystemLog] Creating log:", { module, action, entityType, entityId });

    // Get current user if not provided
    let logUserId: number | null = userId ? Number(userId) : null;
    let logUserName = userName;

    if (!logUserId || !logUserName) {
      try {
        const currentUser = await getCurrentUser();
        if (!logUserId && currentUser?.id) {
          logUserId = parseInt(String(currentUser.id), 10);
        }
        logUserName = logUserName || currentUser?.username;
      } catch (e) {
        console.log("[SystemLog] Could not get current user, using defaults");
      }
    }

    // Get client info
    let ip: string | null = null;
    let userAgent: string | null = null;
    try {
      const clientInfo = await getClientInfo();
      ip = clientInfo.ip;
      userAgent = clientInfo.userAgent;
    } catch (e) {
      console.log("[SystemLog] Could not get client info");
    }

    const result = await dbManagement.system_logs.create({
      data: {
        module,
        action,
        entity_type: entityType,
        entity_id: entityId ? String(entityId) : null,
        description: description || `${action} ${entityType}`,
        old_values: oldValues || undefined,
        new_values: newValues || undefined,
        user_id: logUserId,
        user_name: logUserName || 'System',
        ip_address: ip,
        user_agent: userAgent,
      }
    });

    console.log("[SystemLog] Log created successfully, ID:", result.id.toString());
  } catch (error) {
    // Log to console but don't throw - logging should never break the main operation
    console.error("[SystemLog] Failed to create log:", error);
  }
}

/**
 * Helper functions for common log operations
 */
export const AssetLog = {
  create: (entityType: AssetEntity, entityId: string | number, description?: string, newValues?: Record<string, any>) =>
    systemLog({ module: 'ASSET', action: 'CREATE', entityType, entityId, description, newValues }),

  update: (entityType: AssetEntity, entityId: string | number, description?: string, oldValues?: Record<string, any>, newValues?: Record<string, any>) =>
    systemLog({ module: 'ASSET', action: 'UPDATE', entityType, entityId, description, oldValues, newValues }),

  delete: (entityType: AssetEntity, entityId: string | number, description?: string, oldValues?: Record<string, any>) =>
    systemLog({ module: 'ASSET', action: 'DELETE', entityType, entityId, description, oldValues }),

  assign: (entityId: string | number, description?: string, oldValues?: Record<string, any>, newValues?: Record<string, any>) =>
    systemLog({ module: 'ASSET', action: 'ASSIGN', entityType: 'Asset', entityId, description, oldValues, newValues }),

  transfer: (entityId: string | number, description?: string, oldValues?: Record<string, any>, newValues?: Record<string, any>) =>
    systemLog({ module: 'ASSET', action: 'TRANSFER', entityType: 'Asset', entityId, description, oldValues, newValues }),

  export: (description?: string) =>
    systemLog({ module: 'ASSET', action: 'EXPORT', entityType: 'Asset', description }),

  import: (description?: string, newValues?: Record<string, any>) =>
    systemLog({ module: 'ASSET', action: 'IMPORT', entityType: 'Asset', description, newValues }),
};

export const InventoryLog = {
  create: (entityType: InventoryEntity, entityId: string | number, description?: string, newValues?: Record<string, any>) =>
    systemLog({ module: 'INVENTORY', action: 'CREATE', entityType, entityId, description, newValues }),

  update: (entityType: InventoryEntity, entityId: string | number, description?: string, oldValues?: Record<string, any>, newValues?: Record<string, any>) =>
    systemLog({ module: 'INVENTORY', action: 'UPDATE', entityType, entityId, description, oldValues, newValues }),

  delete: (entityType: InventoryEntity, entityId: string | number, description?: string, oldValues?: Record<string, any>) =>
    systemLog({ module: 'INVENTORY', action: 'DELETE', entityType, entityId, description, oldValues }),

  export: (entityType: InventoryEntity, description?: string) =>
    systemLog({ module: 'INVENTORY', action: 'EXPORT', entityType, description }),
};

export const UserLog = {
  login: (userId: number, userName: string) =>
    systemLog({ module: 'USER', action: 'LOGIN', entityType: 'User', entityId: userId, description: `User ${userName} logged in`, userId, userName }),

  logout: (userId: number, userName: string) =>
    systemLog({ module: 'USER', action: 'LOGOUT', entityType: 'User', entityId: userId, description: `User ${userName} logged out`, userId, userName }),

  create: (entityId: number, description?: string, newValues?: Record<string, any>) =>
    systemLog({ module: 'USER', action: 'CREATE', entityType: 'User', entityId, description, newValues }),

  update: (entityId: number, description?: string, oldValues?: Record<string, any>, newValues?: Record<string, any>) =>
    systemLog({ module: 'USER', action: 'UPDATE', entityType: 'User', entityId, description, oldValues, newValues }),

  delete: (entityId: number, description?: string, oldValues?: Record<string, any>) =>
    systemLog({ module: 'USER', action: 'DELETE', entityType: 'User', entityId, description, oldValues }),
};
