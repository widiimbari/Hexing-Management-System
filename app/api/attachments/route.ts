import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "../../../generated/inventory-client-v2";
import { createInventoryLog } from "@/lib/activity-logger";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const availableOnly = searchParams.get("availableOnly") === "true";

    const skip = (page - 1) * limit;

    // Filter Logic
    const whereClause: Prisma.attachmentWhereInput = {
      active: true,
      ...(search && {
        OR: [
          { nomor: { contains: search } },
          { type: { contains: search } },
          { area: { contains: search } },
        ],
      }),
    };

    if (availableOnly) {
      try {
        // Simple Raw SQL to get IDs of attachments that have remaining items
        const availableAttachments = await db.$queryRawUnsafe<{ id: number }[]>(
          "SELECT id FROM attachment WHERE active = 1 AND qty > 0 AND used_qty < qty"
        );
        
        const targetIds = availableAttachments.map(a => a.id);
        
        if (targetIds.length === 0) {
          return NextResponse.json({
            data: [],
            metadata: { total: 0, page, limit, totalPages: 0 },
          });
        }

        whereClause.id = { in: targetIds };
      } catch (rawError: any) {
        console.error("[GET_ATTACHMENTS] Raw SQL Error:", rawError);
        // Fallback to a simpler where if raw SQL fails
        whereClause.qty = { gt: 0 };
      }
    }

    // 1. Get Total Count (Fast)
    const totalCount = await db.attachment.count({ where: whereClause });

    // 2. Get Paginated Data
    const attachments = await db.attachment.findMany({
      where: whereClause,
      orderBy: { timestamp: "desc" },
      skip,
      take: limit,
    });

    // 3. Simple Mapping (No more heavy groupBy!)
    const data = attachments.map((att) => ({
      ...att,
      total: att.qty,
      tersedia: att.qty - att.used_qty,
    }));

    return NextResponse.json({
      data,
      metadata: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
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

    const newAttachment = await db.attachment.create({
      data: {
        nomor,
        type,
        no_do: no_do || "",
        no_order: no_order || "",
        tgl_order: parsedTglOrder,
        area,
        timestamp: parsedTimestamp,
        status: false, 
        active: true, 
      },
    });

    await createInventoryLog("CREATE", "PL Master", String(newAttachment.id), `Created PL Master: ${nomor} (${type})`);

    return NextResponse.json(newAttachment, { status: 201 });
  } catch (error) {
    console.error("[CREATE_ATTACHMENT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
