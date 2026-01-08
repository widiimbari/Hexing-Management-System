import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const attachmentId = parseInt(id);

    if (isNaN(attachmentId)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

import { createInventoryLog } from "@/lib/activity-logger";

// ... inside DELETE ...
    const slave = await db.attachment2.findUnique({ where: { id: attachmentId }, select: { nomor: true } });

    // 1. Find products to see which master PLs are affected
    const products = await db.product.findMany({
      where: { attachment2_id: attachmentId },
      select: { attachment_id: true }
    });

    // Group by master PL to know how much to decrement
    const masterCounts = products.reduce((acc, p) => {
      if (p.attachment_id) {
        acc[p.attachment_id] = (acc[p.attachment_id] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);

    // Transaction to release products and update counts
    await db.$transaction(async (tx) => {
      // Update used_qty in master PLs
      for (const [masterId, count] of Object.entries(masterCounts)) {
        await tx.attachment.update({
          where: { id: parseInt(masterId) },
          data: {
            used_qty: { decrement: count }
          }
        });
      }

      // Reset attachment2_id in products
      await tx.product.updateMany({
        where: { attachment2_id: attachmentId },
        data: { attachment2_id: null }
      });

      // Delete the attachment
      await tx.attachment2.delete({
        where: { id: attachmentId },
      });
    });

    await createInventoryLog("DELETE", "PL Slave", String(attachmentId), `Deleted PL Slave: ${slave?.nomor}`);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[ATTACHMENT2_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const attachmentId = parseInt(id);
    const body = await req.json();
    const { nomor, no_do, no_order, area, timestamp, tgl_order } = body;

    if (isNaN(attachmentId)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // Convert dates
    const parsedTglOrder = tgl_order ? new Date(tgl_order) : undefined;
    const parsedTimestamp = timestamp ? new Date(timestamp) : undefined;

    const attachment = await db.attachment2.update({
      where: { id: attachmentId },
      data: {
        nomor,
        no_do,
        no_order,
        area,
        timestamp: parsedTimestamp,
        tgl_order: parsedTglOrder,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[ATTACHMENT2_UPDATE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}