import { dbAsset } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export type LogAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPORT' | 'EXPORT' | 'TRANSFER';

export async function logActivity(
  action: LogAction,
  entityType: string,
  entityId: string,
  details: string | object,
  user?: { id: string; username: string } | null
) {
  try {
    const currentUser = user || await getCurrentUser();
    
    // Fallback if no user is found (e.g. system action or unauthenticated, though should be guarded)
    const userId = currentUser?.id ? String(currentUser.id) : "system";
    const userName = currentUser?.username || "System";

    await dbAsset.activity_log.create({
      data: {
        action,
        entity_type: entityType,
        entity_id: String(entityId),
        details: typeof details === 'string' ? details : JSON.stringify(details),
        user_id: userId,
        user_name: userName,
        // ip_address can be added if we pass request context, skipping for now to keep simple
      }
    });
  } catch (error) {
    console.error("Failed to create activity log:", error);
    // Don't throw error to avoid blocking the main action
  }
}
