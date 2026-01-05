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
    const take = limit > 0 ? limit : undefined;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
      ];
    }
    
    const [data, total] = await Promise.all([
      dbAsset.areas.findMany({
        where,
        take,
        skip,
        include: {
          _count: {
            select: {
              locations: true,
              assets: true,
            },
          },
        },
        orderBy: {
          name: "asc",
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
      { message: "Error creating area" },
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
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(area),
      message: "Area created successfully",
    });
  } catch (error) {
    console.error("Error creating area:", error);
    return NextResponse.json(
      { message: "Error creating area" },
      { status: 500 }
    );
  }
}

// PUT - Update existing area
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: "Area ID is required" }, { status: 400 });
    }
    
    const body = await req.json();
    
    const area = await dbAsset.areas.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(area),
      message: "Area updated successfully",
    });
  } catch (error) {
    console.error("Error updating area:", error);
    return NextResponse.json(
      { message: "Error updating area" },
      { status: 500 }
    );
  }
}