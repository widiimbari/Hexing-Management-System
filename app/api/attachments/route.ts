import { NextResponse } from "next/server";
import { PLMasterService } from "@/modules/inventory/pl-master/application/pl-master-service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    const result = await PLMasterService.getPLMasters({
        page: parseInt(searchParams.get("page") || "1"),
        limit: parseInt(searchParams.get("limit") || "10"),
        search: searchParams.get("search") || "",
        availableOnly: searchParams.get("availableOnly") === "true"
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[GET_ATTACHMENTS] Error:", error);
    return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nomor, type, no_do, no_order, tgl_order, area, timestamp } = body;

    if (!nomor || !type || !tgl_order || !area || !timestamp) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const parsedTglOrder = new Date(tgl_order);
    const parsedTimestamp = new Date(timestamp);
    
    if (isNaN(parsedTglOrder.getTime()) || isNaN(parsedTimestamp.getTime())) {
      return new NextResponse("Invalid date format", { status: 400 });
    }

    const newAttachment = await PLMasterService.createPLMaster({
        nomor,
        type,
        no_do,
        no_order,
        tgl_order: parsedTglOrder,
        area,
        timestamp: parsedTimestamp
    });

    return NextResponse.json(newAttachment, { status: 201 });
  } catch (error) {
    console.error("[CREATE_ATTACHMENT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}