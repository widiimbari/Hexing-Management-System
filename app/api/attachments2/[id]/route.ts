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

    // Transaction to release products
    await db.$transaction([
      // Reset attachment2_id in products
      db.product.updateMany({
        where: { attachment2_id: attachmentId },
        data: { attachment2_id: null }
      }),
      // Delete the attachment
      db.attachment2.delete({
        where: { id: attachmentId },
      })
    ]);

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