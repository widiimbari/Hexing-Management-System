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

// GET - Get single asset by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const asset = await dbAsset.assets.findUnique({
      where: { id: BigInt(params.id) },
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

    if (!asset) {
      return NextResponse.json(
        { message: "Asset not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(asset),
    });
  } catch (error) {
    console.error("Error fetching asset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update asset by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const currentAsset = await dbAsset.assets.findUnique({
      where: { id: BigInt(params.id) },
    });

    const updateData: any = {
      type: formData.get('type') as string,
      serial_number: formData.get('serial_number') as string,
      sap_id: (formData.get('sap_id') as string) || null,
      supplier: null, // Removed usage of supplier name string
      purchase_date: formData.get('purchase_date') ? new Date(formData.get('purchase_date') as string) : null,
      category_id: formData.get('category_id') ? BigInt(formData.get('category_id') as string) : undefined,
      brand_id: formData.get('brand_id') ? BigInt(formData.get('brand_id') as string) : undefined,
      area_id: formData.get('area_id') ? BigInt(formData.get('area_id') as string) : undefined,
      location_id: formData.get('location_id') ? BigInt(formData.get('location_id') as string) : undefined,
      employee_id: formData.get('employee_id') ? BigInt(formData.get('employee_id') as string) : undefined,
      supplier_id: formData.get('supplier_id') ? BigInt(formData.get('supplier_id') as string) : undefined,
      updated_at: new Date(),
    };

    if (imagePath) {
      updateData.image = imagePath;
    }

    const asset = await dbAsset.assets.update({
      where: { id: BigInt(params.id) },
      data: updateData,
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
        operation: 'update',
        old_data: JSON.stringify(serializeBigInt(currentAsset)),
        new_data: JSON.stringify(serializeBigInt(asset)),
        created_at: new Date(),
      }
    });

    return NextResponse.json({
      data: serializeBigInt(asset),
      message: "Asset updated successfully",
    });
  } catch (error) {
    console.error("Error updating asset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete asset by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentAsset = await dbAsset.assets.findUnique({
      where: { id: BigInt(params.id) },
    });

    await dbAsset.assets.delete({
      where: { id: BigInt(params.id) },
    });

    if (currentAsset) {
      // Logging
      await dbAsset.log_crud.create({
        data: {
          table_name: 'assets',
          sap_id: currentAsset.sap_id,
          operation: 'delete',
          old_data: JSON.stringify(serializeBigInt(currentAsset)),
          created_at: new Date(),
        }
      });
    }

    return NextResponse.json({
      message: "Asset deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting asset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}