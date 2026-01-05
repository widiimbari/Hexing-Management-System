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

// GET - Fetch all brands with pagination and search
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
      dbAsset.brands.findMany({
        where,
        take,
        skip,
        orderBy: {
          name: "asc",
        },
      }),
      dbAsset.brands.count({ where }),
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
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new brand
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const brand = await dbAsset.brands.create({
      data: {
        name: body.name,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(brand),
      message: "Brand created successfully",
    });
  } catch (error) {
    console.error("Error creating brand:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update existing brand
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: "Brand ID is required" }, { status: 400 });
    }
    
    const body = await req.json();
    
    const brand = await dbAsset.brands.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(brand),
      message: "Brand updated successfully",
    });
  } catch (error) {
    console.error("Error updating brand:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}