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

// GET - Fetch all locations with pagination and search
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
        { area: { name: { contains: search } } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.locations.findMany({
        where,
        take: limit,
        skip,
        include: {
          area: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              assets: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      }),
      dbAsset.locations.count({ where }),
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
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new location
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const location = await dbAsset.locations.create({
      data: {
        name: body.name,
        area_id: BigInt(body.area_id),
        created_at: new Date(),
        updated_at: new Date(),
      },
      include: {
        area: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: serializeBigInt(location),
      message: "Location created successfully",
    });
  } catch (error) {
    console.error("Error creating location:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}