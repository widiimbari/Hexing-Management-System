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

    // Get Products
    const products = await db.product.findMany({
      where: { attachment_id: attachmentId },
      select: {
        serial: true,
        orderno: true,
      },
      orderBy: { serial: "asc" }, // Or whatever order is preferred
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
