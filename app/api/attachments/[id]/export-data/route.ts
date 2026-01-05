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

    const attachment = await db.attachment.findUnique({
      where: { id: attachmentId },
    });

    if (!attachment) {
      return new NextResponse("Attachment not found", { status: 404 });
    }

    // Get PLN Code Prefix from meter_type
    const meterType = await db.meter_type.findFirst({
      where: { value: attachment.type },
    });

    const prefix = meterType?.pln_code || "";

    // Get Products with basic info
    const productsRaw = await db.product.findMany({
      where: { attachment_id: attachmentId },
      select: {
        serial: true,
        orderno: true,
        timestamp: true,
        box_id: true,
      },
      orderBy: { serial: "asc" },
    });

    // Manual relation resolution for Box and Pallete (since Prisma schema lacks @relation)
    const boxIds = Array.from(new Set(productsRaw.map(p => p.box_id).filter((id): id is number => id !== null)));
    
    const boxes = await db.box.findMany({
      where: { id: { in: boxIds } },
      select: { id: true, serial: true, pallete_id: true }
    });
    
    const boxMap = new Map(boxes.map(b => [b.id, b]));
    
    const palleteIds = Array.from(new Set(boxes.map(b => b.pallete_id).filter((id): id is number => id !== null)));
    
    const palletes = await db.pallete.findMany({
      where: { id: { in: palleteIds } },
      select: { id: true, serial: true }
    });
    
    const palleteMap = new Map(palletes.map(p => [p.id, p.serial]));

    // Combine data
    const products = productsRaw.map(p => {
      const box = p.box_id ? boxMap.get(p.box_id) : null;
      const palletSerial = (box && box.pallete_id) ? palleteMap.get(box.pallete_id) : null;
      
      return {
        ...p,
        box_serial: box?.serial || null,
        pallet_serial: palletSerial || null,
      };
    });

    return NextResponse.json({
      attachment,
      products,
      prefix,
    });
  } catch (error) {
    console.error("[EXPORT_DATA]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
