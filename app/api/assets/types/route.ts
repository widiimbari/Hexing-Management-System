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

// GET - Fetch all asset types with pagination and search
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = limit > 0 ? (page - 1) * limit : undefined;
    const take = limit > 0 ? limit : undefined;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.asset_types.findMany({
        where,
        take,
        skip,
        include: {
          _count: {
            select: { assets: true }
          }
        },
        orderBy: {
          name: "asc",
        },
      }),
      dbAsset.asset_types.count({ where }),
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
    console.error("Error fetching asset types:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new asset type
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const assetType = await dbAsset.asset_types.create({
      data: {
        name: body.name,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(assetType),
      message: "Asset Type created successfully",
    });
  } catch (error) {
    console.error("Error creating asset type:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update existing asset type
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: "Asset Type ID is required" }, { status: 400 });
    }
    
    const body = await req.json();
    
    const assetType = await dbAsset.asset_types.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(assetType),
      message: "Asset Type updated successfully",
    });
  } catch (error) {
    console.error("Error updating asset type:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
