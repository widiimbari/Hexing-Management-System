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

// GET - Fetch all suppliers with pagination and search
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
        { contact_person: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.suppliers.findMany({
        where,
        take,
        skip,
        orderBy: {
          name: "asc",
        },
      }),
      dbAsset.suppliers.count({ where }),
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
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new supplier
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const supplier = await dbAsset.suppliers.create({
      data: {
        name: body.name,
        contact_person: body.contact_person,
        phone: body.phone,
        email: body.email,
        address: body.address,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(supplier),
      message: "Supplier created successfully",
    });
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update existing supplier
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: "Supplier ID is required" }, { status: 400 });
    }
    
    const body = await req.json();
    
    const supplier = await dbAsset.suppliers.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        contact_person: body.contact_person,
        phone: body.phone,
        email: body.email,
        address: body.address,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(supplier),
      message: "Supplier updated successfully",
    });
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}