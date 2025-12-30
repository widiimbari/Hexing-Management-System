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

// GET - Fetch all assets with pagination and search
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
        { type: { contains: search } },
        { serial_number: { contains: search } },
        { sap_id: { contains: search } },
        { supplier: { contains: search } },
        { category: { name: { contains: search } } },
        { brand: { name: { contains: search } } },
        { area: { name: { contains: search } } },
        { location: { name: { contains: search } } },
        { employee: { nama: { contains: search } } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.assets.findMany({
        where,
        take: limit,
        skip,
        include: {
          category: true,
          brand: true,
          area: true,
          location: true,
          employee: {
            include: {
              department: true
            }
          },
          supplier_rec: true,
        },
        orderBy: {
          created_at: "desc",
        },
      }),
      dbAsset.assets.count({ where }),
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
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new asset
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const asset = await dbAsset.assets.create({
      data: {
        type: body.type,
        serial_number: body.serial_number,
        sap_id: body.sap_id || null,
        supplier: body.supplier_name || null,
        image: body.image || null,
        purchase_date: body.purchase_date ? new Date(body.purchase_date) : null,
        category_id: body.category_id ? BigInt(body.category_id) : undefined,
        brand_id: body.brand_id ? BigInt(body.brand_id) : undefined,
        area_id: body.area_id ? BigInt(body.area_id) : undefined,
        location_id: body.location_id ? BigInt(body.location_id) : undefined,
        employee_id: body.employee_id ? BigInt(body.employee_id) : undefined,
        supplier_id: body.supplier_id ? BigInt(body.supplier_id) : undefined,
      },
      include: {
        category: true,
        brand: true,
        area: true,
        location: true,
        employee: {
          include: {
            department: true
          }
        },
        supplier_rec: true,
      },
    });

    return NextResponse.json({
      data: serializeBigInt(asset),
      message: "Asset created successfully",
    });
  } catch (error) {
    console.error("Error creating asset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
