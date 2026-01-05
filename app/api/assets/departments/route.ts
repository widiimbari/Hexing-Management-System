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

// GET - Fetch all departments with pagination and search
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
      dbAsset.departments.findMany({
        where,
        take: limit,
        skip,
        orderBy: {
          name: "asc",
        },
        include: {
          _count: {
            select: {
              employees: true,
            },
          },
        },
      }),
      dbAsset.departments.count({ where }),
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
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new department
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const department = await dbAsset.departments.create({
      data: {
        name: body.name,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(department),
      message: "Department created successfully",
    });
  } catch (error) {
    console.error("Error creating department:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update existing department
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: "Department ID is required" }, { status: 400 });
    }
    
    const body = await req.json();
    
    const department = await dbAsset.departments.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(department),
      message: "Department updated successfully",
    });
  } catch (error) {
    console.error("Error updating department:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}