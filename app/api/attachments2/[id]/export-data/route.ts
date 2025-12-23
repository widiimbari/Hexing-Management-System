import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const attachmentId = parseInt(id);

    if (isNaN(attachmentId)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const attachment = await db.attachment2.findUnique({
      where: { id: attachmentId },
    });

    if (!attachment) {
      return new NextResponse("Attachment Slave not found", { status: 404 });
    }

    // Get PLN Code Prefix from meter_type
    const meterType = await db.meter_type.findFirst({
      where: { value: attachment.type },
    });

    const prefix = meterType?.pln_code || "";

    // Get Products assigned to this Slave
    const products = await db.product.findMany({
      where: { attachment2_id: attachmentId },
      select: {
        serial: true,
        module_serial: true,
        orderno: true,
        box_id: true,
      },
      orderBy: { serial: "asc" }, 
    });

    // Fetch Boxes
    const boxIds = products.map(p => p.box_id).filter(id => id !== null) as number[];
    const uniqueBoxIds = [...new Set(boxIds)];
    
    const boxes = await db.box.findMany({
      where: { id: { in: uniqueBoxIds } },
      select: { id: true, serial: true, pallete_id: true }
    });
    
    // Fetch Pallets
    const palletIds = boxes.map(b => b.pallete_id).filter(id => id !== null) as number[];
    const uniquePalletIds = [...new Set(palletIds)];

    const pallets = await db.pallete.findMany({
      where: { id: { in: uniquePalletIds } },
      select: { id: true, serial: true }
    });

    // Map data
    const boxMap = new Map(boxes.map(b => [b.id, b]));
    const palletMap = new Map(pallets.map(p => [p.id, p.serial]));

    const enrichedProducts = products.map(p => {
       const box = p.box_id ? boxMap.get(p.box_id) : null;
       const palletSerial = box && box.pallete_id ? palletMap.get(box.pallete_id) : null;
       return {
         serial: p.serial,
         module_serial: p.module_serial || "-",
         orderno: p.orderno,
         box_serial: box?.serial || "-",
         pallet_serial: palletSerial || "-"
       };
    });

    return NextResponse.json({
      attachment,
      products: enrichedProducts,
      prefix,
    });
  } catch (error) {
    console.error("[EXPORT_DATA_SLAVE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
