import { NextResponse } from "next/server";
import { PLSlaveService } from "@/modules/inventory/pl-slave/application/pl-slave-service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    const result = await PLSlaveService.getPLSlaves({
        page: parseInt(searchParams.get("page") || "1"),
        limit: parseInt(searchParams.get("limit") || "10"),
        search: searchParams.get("search") || "",
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[GET_ATTACHMENTS2]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nomor, type, no_do, no_order, tgl_order, area, timestamp } = body;

    if (!nomor || !type || !no_do || !no_order || !tgl_order || !area) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const parsedTglOrder = new Date(tgl_order);
    const parsedTimestamp = timestamp ? new Date(timestamp) : new Date();
    
    if (isNaN(parsedTglOrder.getTime()) || isNaN(parsedTimestamp.getTime())) {
      return new NextResponse("Invalid date format", { status: 400 });
    }

    const newAttachment = await PLSlaveService.createPLSlave({
        nomor,
        type,
        no_do,
        no_order,
        tgl_order: parsedTglOrder,
        area,
        timestamp: parsedTimestamp
    });

    return NextResponse.json(newAttachment, { status: 201 });
  } catch (error: any) {
    console.error("[CREATE_ATTACHMENT2]", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}