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
    const { codes, inputType } = body;

    if (!codes || !Array.isArray(codes) || codes.length === 0) {
      return new NextResponse("No codes provided", { status: 400 });
    }

    // Parallel queries to find all matching items
    const [products, boxes, pallets] = await Promise.all([
      db.product.findMany({ 
        where: { serial: { in: codes } },
        select: { serial: true } 
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

    let updatedCount = 0;
    const usedBoxIds = new Set<number>();

    // 1. Update Direct Serials
    if (products.length > 0) {
      const serials = products.map(p => p.serial);
      const result = await db.product.updateMany({
        where: { serial: { in: serials } },
        data: { attachment_id: attachmentId },
      });
      updatedCount += result.count;
    }

    // 2. Update Boxes
    if (boxes.length > 0) {
      const boxIds = boxes.map(b => b.id);
      // Track used box IDs to avoid double update if same box is in pallet
      boxIds.forEach(id => usedBoxIds.add(id));

      const result = await db.product.updateMany({
        where: { box_id: { in: boxIds } },
        data: { attachment_id: attachmentId },
      });
      updatedCount += result.count;
    }

    // 3. Update Pallets
    if (pallets.length > 0) {
      const palletIds = pallets.map(p => p.id);
      
      const palletBoxes = await db.box.findMany({
        where: { pallete_id: { in: palletIds } },
        select: { id: true }
      });
      
      // Filter out boxes that were already processed in step 2
      const uniquePalletBoxIds = palletBoxes
        .map(b => b.id)
        .filter(id => !usedBoxIds.has(id));

      if (uniquePalletBoxIds.length > 0) {
        const result = await db.product.updateMany({
          where: { box_id: { in: uniquePalletBoxIds } },
          data: { attachment_id: attachmentId },
        });
        updatedCount += result.count;
      }
    }

    return NextResponse.json({ success: true, count: updatedCount });
  } catch (error) {
    console.error("[ADD_ITEMS_TO_ATTACHMENT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
