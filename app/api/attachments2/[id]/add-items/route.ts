import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
      select: { type: true }
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
        return new NextResponse("No matching products found.", { status: 400 });
    }

    // 3. Perform Update with strict validation
    // - Must match Slave Type
    // - Must belong to a Master (attachment_id NOT NULL)
    // - Must NOT belong to a Slave (attachment2_id NULL)
    const result = await db.product.updateMany({
      where: {
        id: { in: productIdsToUpdate },
        type: slave.type,
        attachment_id: { not: null },
        attachment2_id: null,
      },
      data: {
        attachment2_id: attachmentId,
      },
    });

    return NextResponse.json({ success: true, count: result.count });

  } catch (error: any) {
    console.error("[ADD_SLAVE_ITEMS]", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}
