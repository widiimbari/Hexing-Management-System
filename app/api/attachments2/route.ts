import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const whereClause: Prisma.attachment2WhereInput = {
      active: true,
      ...(search && {
        OR: [
          { nomor: { contains: search } },
          { type: { contains: search } },
          { area: { contains: search } },
        ],
      }),
    };

    // 1. Total Count
    const totalCount = await db.attachment2.count({ where: whereClause });

    // 2. Paginated Data
    const attachments = await db.attachment2.findMany({
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

    // 3. Optimized Count (Only for current page IDs)
    const counts = await db.product.groupBy({
      by: ["attachment2_id"],
      _count: { id: true },
      where: { attachment2_id: { in: attachmentIds } },
    });

    const countMap = new Map(counts.map((item) => [item.attachment2_id, item._count.id]));

    const data = attachments.map((att) => ({
      ...att,
      total: countMap.get(att.id) || 0,
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
  } catch (error) {
    console.error("[GET_ATTACHMENTS2]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Manual Input Flow: No masterId or qty needed here anymore
    const { nomor, type, no_do, no_order, tgl_order, area, timestamp } = body;

    if (!nomor || !type || !no_do || !no_order || !tgl_order || !area) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const parsedTglOrder = new Date(tgl_order);
    const parsedTimestamp = timestamp ? new Date(timestamp) : new Date();
    
    if (isNaN(parsedTglOrder.getTime()) || isNaN(parsedTimestamp.getTime())) {
      return new NextResponse("Invalid date format", { status: 400 });
    }

    const newAttachment2 = await db.attachment2.create({
      data: {
        nomor,
        type,
        no_do,
        no_order,
        tgl_order: parsedTglOrder,
        area,
        timestamp: parsedTimestamp,
        status: false,
        active: true,
      },
    });

    return NextResponse.json(newAttachment2, { status: 201 });
  } catch (error: any) {
    console.error("[CREATE_ATTACHMENT2]", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}