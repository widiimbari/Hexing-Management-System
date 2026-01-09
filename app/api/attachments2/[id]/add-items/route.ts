import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createInventoryLog } from "@/lib/activity-logger";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const attachmentId = parseInt(id);

    if (isNaN(attachmentId)) {
      return new NextResponse("Invalid attachment ID", { status: 400 });
    }

    const body = await req.json();
    const { codes } = body; // inputType is ignored/auto

    if (!codes || !Array.isArray(codes) || codes.length === 0) {
      return new NextResponse("No codes provided", { status: 400 });
    }

    // 1. Fetch Slave details to check Type
    const slave = await db.attachment2.findUnique({
      where: { id: attachmentId },
      select: { type: true, nomor: true }
    });

    if (!slave) {
      return new NextResponse("Slave PL not found", { status: 404 });
    }

    // 2. Auto-detect and find matching products
    // We need to find all products associated with these codes
    // Parallel queries to find all matching items
    const [products, boxes, pallets] = await Promise.all([
      db.product.findMany({ 
        where: { serial: { in: codes } },
        select: { id: true } 
      }),
      db.box.findMany({ 
        where: { serial: { in: codes } },
        select: { id: true } 
      }),
      db.pallete.findMany({ 
        where: { serial: { in: codes } },
        select: { id: true } 
      }),
    ]);

    let productIdsToUpdate: number[] = [];

    // Add direct products
    products.forEach(p => productIdsToUpdate.push(p.id));

    // Add box products
    if (boxes.length > 0) {
      const boxIds = boxes.map(b => b.id);
      const boxProducts = await db.product.findMany({
        where: { box_id: { in: boxIds } },
        select: { id: true }
      });
      boxProducts.forEach(p => productIdsToUpdate.push(p.id));
    }

    // Add pallet products
    if (pallets.length > 0) {
      const palletIds = pallets.map(p => p.id);
      const palletBoxes = await db.box.findMany({
        where: { pallete_id: { in: palletIds } },
        select: { id: true }
      });
      const palletBoxIds = palletBoxes.map(b => b.id);
      
      if (palletBoxIds.length > 0) {
        const palletProducts = await db.product.findMany({
            where: { box_id: { in: palletBoxIds } },
            select: { id: true }
        });
        palletProducts.forEach(p => productIdsToUpdate.push(p.id));
      }
    }

    // Deduplicate IDs
    productIdsToUpdate = [...new Set(productIdsToUpdate)];

    if (productIdsToUpdate.length === 0) {
        return new NextResponse("No matching products found in database.", { status: 400 });
    }

    // 3. Perform Update with strict validation
    // Find ALL products matching the IDs to check their status
    const allProducts = await db.product.findMany({
      where: { id: { in: productIdsToUpdate } },
      select: { 
        id: true, 
        serial: true,
        type: true,
        attachment_id: true, 
        attachment2_id: true 
      }
    });

    const orphanItems = [];
    const wrongTypeItems = [];
    const alreadyAssignedItems = [];
    const validItems = [];

    for (const p of allProducts) {
      if (!p.attachment_id) {
        orphanItems.push(p.serial);
      } else if (p.type !== slave.type) {
        wrongTypeItems.push(p.serial);
      } else if (p.attachment2_id) {
        // If already assigned to THIS slave, we can ignore (idempotent) or warn
        // If assigned to OTHER slave, it's an error
        if (p.attachment2_id !== attachmentId) {
          alreadyAssignedItems.push(p.serial);
        }
      } else {
        validItems.push(p);
      }
    }

    if (orphanItems.length > 0) {
      return new NextResponse(
        `Error: ${orphanItems.length} items are not assigned to any Master PL yet (e.g., ${orphanItems.slice(0, 3).join(", ")}...). Please input them to a Master PL first.`,
        { status: 400 }
      );
    }

    if (wrongTypeItems.length > 0) {
      return new NextResponse(
        `Error: ${wrongTypeItems.length} items have mismatched Type (Expected: ${slave.type}).`,
        { status: 400 }
      );
    }
    
    if (alreadyAssignedItems.length > 0) {
      return new NextResponse(
        `Error: ${alreadyAssignedItems.length} items are already assigned to another Slave PL.`,
        { status: 400 }
      );
    }

    if (validItems.length === 0) {
       return new NextResponse("No valid items to add (all items might already be in this Slave).", { status: 400 });
    }

    // Group by attachment_id to update counts and check capacity
    const countByMaster = validItems.reduce((acc, p) => {
      const masterId = p.attachment_id as number;
      acc[masterId] = (acc[masterId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Validation: Check if adding these items exceeds available qty for any master
    const masterIds = Object.keys(countByMaster).map(id => parseInt(id));
    const masters = await db.attachment.findMany({
      where: { id: { in: masterIds } },
      select: { id: true, nomor: true, qty: true, used_qty: true }
    });

    for (const master of masters) {
      const requested = countByMaster[master.id];
      const available = master.qty - master.used_qty;
      
      if (requested > available) {
        return new NextResponse(
          `Error: Adding ${requested} items exceeds available capacity (${available}) for Master PL: ${master.nomor}`, 
          { status: 400 }
        );
      }
    }

    // Perform the update in a transaction
    const validIds = validItems.map(p => p.id);

    await db.$transaction(async (tx) => {
      // Update products
      await tx.product.updateMany({
        where: { id: { in: validIds } },
        data: { attachment2_id: attachmentId },
      });

      // Update used_qty in Master PLs
      for (const [masterId, count] of Object.entries(countByMaster)) {
        await tx.attachment.update({
          where: { id: parseInt(masterId) },
          data: {
            used_qty: { increment: count }
          }
        });
      }
    });

    await createInventoryLog("UPDATE", "PL Slave", String(attachmentId), `Added ${validIds.length} items to Slave PL: ${slave.nomor}`);

    return NextResponse.json({ success: true, count: validIds.length });

  } catch (error: any) {
    console.error("[ADD_SLAVE_ITEMS]", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}
