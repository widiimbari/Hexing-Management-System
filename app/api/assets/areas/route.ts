import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";

// Helper to serialize BigInt
function serializeBigInt(data: any): any {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

// GET - Fetch all areas with pagination and search
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.areas.findMany({
        where,
        take: limit,
        skip,
        orderBy: {
          name: "asc",
        },
        include: {
          _count: {
            select: {
              locations: true,
            },
          },
        },
      }),
      dbAsset.areas.count({ where }),
    ]);

    return NextResponse.json({
      data: serializeBigInt(data),
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching areas:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new area
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const area = await dbAsset.areas.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json({
      data: serializeBigInt(area),
      message: "Area created successfully",
    });
  } catch (error) {
    console.error("Error creating area:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}