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

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { contact_person: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.suppliers.findMany({
        where,
        take: limit,
        skip,
        orderBy: {
          name: "asc",
        },
        include: {
          _count: {
            select: {
              assets: true,
            },
          },
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