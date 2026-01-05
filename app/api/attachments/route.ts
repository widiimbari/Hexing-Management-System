import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "../../../generated/inventory-client";

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
      // Find master attachments that have available products (no slave assigned)
      // Original logic using distinct product query
      const productsWithNoSlave = await db.product.findMany({
        where: {
          attachment2_id: null,
          attachment_id: { not: null },
        },
        select: { attachment_id: true },
        distinct: ["attachment_id"],
      });

      const targetIds = productsWithNoSlave
        .map((p) => p.attachment_id)
        .filter((id): id is number => id !== null);

      whereClause.id = { in: targetIds };
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

    if (attachments.length === 0) {
      return NextResponse.json({
        data: [],
        metadata: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
        },
      });
    }

    const attachmentIds = attachments.map((a) => a.id);

    // 3. Optimized Aggregation (Only for current page IDs)
    const [totalCounts, tersediaCounts] = await Promise.all([
      db.product.groupBy({
        by: ["attachment_id"],
        _count: { id: true },
        where: { attachment_id: { in: attachmentIds } },
      }),
      db.product.groupBy({
        by: ["attachment_id"],
        _count: { id: true },
        where: { 
          attachment_id: { in: attachmentIds },
          attachment2_id: null 
        },
      })
    ]);

    // Create lookup maps
    const totalMap = new Map(totalCounts.map((item) => [item.attachment_id, item._count.id]));
    const tersediaMap = new Map(tersediaCounts.map((item) => [item.attachment_id, item._count.id]));

    const data = attachments.map((att) => ({
      ...att,
      total: totalMap.get(att.id) || 0,
      tersedia: tersediaMap.get(att.id) || 0,
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

    return NextResponse.json(newAttachment, { status: 201 });
  } catch (error) {
    console.error("[CREATE_ATTACHMENT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}