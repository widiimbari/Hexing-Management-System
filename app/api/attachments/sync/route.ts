import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createInventoryLog } from "@/lib/activity-logger";

export async function POST(req: Request) {
  try {
    // Get all active attachments
    const attachments = await db.attachment.findMany({
      where: { active: true },
      select: { id: true, nomor: true, qty: true, used_qty: true }
    });

    if (attachments.length === 0) {
      return NextResponse.json({
        message: "No attachments to sync",
        synced: 0
      });
    }

    const attachmentIds = attachments.map(a => a.id);

    // Count total products per attachment (qty)
    const qtyResults = await db.product.groupBy({
      by: ['attachment_id'],
      where: {
        attachment_id: { in: attachmentIds }
      },
      _count: { id: true }
    });

    // Count used products per attachment (products that have been moved to slave)
    const usedQtyResults = await db.product.groupBy({
      by: ['attachment_id'],
      where: {
        attachment_id: { in: attachmentIds },
        attachment2_id: { not: null }
      },
      _count: { id: true }
    });

    // Create maps for quick lookup
    const qtyMap = new Map(qtyResults.map(r => [r.attachment_id, r._count.id]));
    const usedQtyMap = new Map(usedQtyResults.map(r => [r.attachment_id, r._count.id]));

    // Update each attachment
    let syncedCount = 0;
    const updates: { id: number; nomor: string; oldQty: number; newQty: number; oldUsedQty: number; newUsedQty: number }[] = [];

    for (const att of attachments) {
      const newQty = qtyMap.get(att.id) || 0;
      const newUsedQty = usedQtyMap.get(att.id) || 0;

      // Only update if values are different
      if (att.qty !== newQty || att.used_qty !== newUsedQty) {
        await db.attachment.update({
          where: { id: att.id },
          data: {
            qty: newQty,
            used_qty: newUsedQty
          }
        });

        updates.push({
          id: att.id,
          nomor: att.nomor,
          oldQty: att.qty,
          newQty,
          oldUsedQty: att.used_qty,
          newUsedQty
        });

        syncedCount++;
      }
    }

    // Log the sync operation
    if (syncedCount > 0) {
      await createInventoryLog(
        "UPDATE",
        "PL Master",
        "SYNC",
        `Synced ${syncedCount} PL Master(s) qty/used_qty`
      );
    }

    return NextResponse.json({
      message: `Successfully synced ${syncedCount} attachment(s)`,
      synced: syncedCount,
      updates
    });

  } catch (error: any) {
    console.error("[SYNC_ATTACHMENTS] Error:", error);
    return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
  }
}
