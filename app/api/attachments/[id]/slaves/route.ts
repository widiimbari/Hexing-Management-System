import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const attachmentId = parseInt(id);
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    if (isNaN(attachmentId)) {
      return new NextResponse("Invalid Master ID", { status: 400 });
    }

    // Find all unique attachment2_ids for products belonging to this master
    const slaveIdsResult = await db.product.findMany({
      where: { 
        attachment_id: attachmentId,
        attachment2_id: { not: null }
      },
      select: { attachment2_id: true },
      distinct: ['attachment2_id']
    });

    const targetIds = slaveIdsResult
      .map(s => s.attachment2_id)
      .filter((id): id is number => id !== null);

    if (targetIds.length === 0) {
      return NextResponse.json({
        data: [],
        metadata: { total: 0, page, limit, totalPages: 0 }
      });
    }

    // Filter Logic for Slaves
    const where: any = {
      id: { in: targetIds },
      active: true,
    };

    if (search) {
      where.OR = [
        { nomor: { contains: search } },
        { area: { contains: search } },
      ];
    }

    // Fetch details of those slaves with pagination
    const slaves = await db.attachment2.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      skip,
      take: limit
    });

    const total = await db.attachment2.count({ where });

    // Also get product counts per slave for this master
    const pageSlaveIds = slaves.map(s => s.id);
    const counts = await db.product.groupBy({
      by: ['attachment2_id'],
      where: { 
        attachment_id: attachmentId,
        attachment2_id: { in: pageSlaveIds }
      },
      _count: { id: true }
    });

    const countMap = new Map(counts.map(c => [c.attachment2_id, c._count.id]));

    const data = slaves.map(s => ({
      ...s,
      productCount: countMap.get(s.id) || 0
    }));

    return NextResponse.json({
      data,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("[GET_MASTER_SLAVES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
