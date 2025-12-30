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
    const formData = await req.formData();
    
    // Handle File Upload
    const imageFile = formData.get('image') as File | null;
    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fs = require('fs');
      const path = require('path');
      
      const uploadDir = path.join(process.cwd(), 'public/uploads/assets');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      imagePath = `/uploads/assets/${fileName}`;
    }

    const data = {
      type: formData.get('type') as string,
      serial_number: formData.get('serial_number') as string,
      sap_id: (formData.get('sap_id') as string) || null,
      supplier: null, // Removed usage of supplier name string as per request
      image: imagePath || (formData.get('image_url') as string) || null,
      purchase_date: formData.get('purchase_date') ? new Date(formData.get('purchase_date') as string) : null,
      category_id: formData.get('category_id') ? BigInt(formData.get('category_id') as string) : undefined,
      brand_id: formData.get('brand_id') ? BigInt(formData.get('brand_id') as string) : undefined,
      area_id: formData.get('area_id') ? BigInt(formData.get('area_id') as string) : undefined,
      location_id: formData.get('location_id') ? BigInt(formData.get('location_id') as string) : undefined,
      employee_id: formData.get('employee_id') ? BigInt(formData.get('employee_id') as string) : undefined,
      supplier_id: formData.get('supplier_id') ? BigInt(formData.get('supplier_id') as string) : undefined,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const asset = await dbAsset.assets.create({
      data,
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

    // Logging
    await dbAsset.log_crud.create({
      data: {
        table_name: 'assets',
        sap_id: asset.sap_id,
        operation: 'create',
        new_data: JSON.stringify(serializeBigInt(asset)),
        created_at: new Date(),
        // user_id: TODO: get from session
      }
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
