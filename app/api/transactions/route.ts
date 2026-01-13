import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";

function serializeBigInt(data: any): any {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "ALL"; // ALL, PURCHASE, CONDITION_CHANGE, etc.
    const assetId = searchParams.get("asset_id") || "";

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { asset: { serial_number: { contains: search } } },
        { asset: { sap_id: { contains: search } } },
        { remarks: { contains: search } }
      ];
    }

    if (type && type !== "ALL") {
      where.transaction_type = type;
    }

    if (assetId) {
      where.asset_id = BigInt(assetId);
    }

    const [data, total] = await Promise.all([
      dbAsset.asset_transactions.findMany({
        where,
        take: limit,
        skip,
        include: {
          asset: {
            select: {
              serial_number: true,
              sap_id: true,
              category: true
            }
          },
          previous_holder: { select: { nama: true } },
          new_holder: { select: { nama: true } }
        },
        orderBy: {
          transaction_date: "desc",
        },
      }),
      dbAsset.asset_transactions.count({ where }),
    ]);

    // Map creator_name to standard format if needed, but the frontend expects 'creator' object or just name
    // The previous frontend implementation used: row.creator?.name
    // I should map it to match that structure OR update frontend. 
    // Easier to map here.
    const mappedData = data.map(item => ({
      ...item,
      creator: { name: item.creator_name || 'System' }
    }));

    return NextResponse.json({
      data: serializeBigInt(mappedData),
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
