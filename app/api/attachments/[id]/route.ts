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

    // Transaction to ensure data consistency
    await db.$transaction([
      // Reset attachment_id in products
      db.product.updateMany({
        where: { attachment_id: attachmentId },
        data: { attachment_id: null }
      }),
      // Delete the attachment
      db.attachment.delete({
        where: { id: attachmentId },
      })
    ]);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[ATTACHMENT_DELETE]", error);
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
    const { nomor, timestamp, type, tgl_order, area } = body;

    if (isNaN(attachmentId)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // Convert dates
    const parsedTglOrder = tgl_order ? new Date(tgl_order) : undefined;
    const parsedTimestamp = timestamp ? new Date(timestamp) : undefined;
    
    if ((tgl_order && isNaN(parsedTglOrder!.getTime())) || (timestamp && isNaN(parsedTimestamp!.getTime()))) {
      return new NextResponse("Invalid date format", { status: 400 });
    }

    const attachment = await db.attachment.update({
      where: { id: attachmentId },
      data: {
        nomor,
        timestamp: parsedTimestamp,
        type,
        tgl_order: parsedTglOrder,
        area
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[ATTACHMENT_UPDATE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
