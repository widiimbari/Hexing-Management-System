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
    const body = await req.json();
    
    const asset = await dbAsset.assets.update({
      where: { id: BigInt(params.id) },
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
    await dbAsset.assets.delete({
      where: { id: BigInt(params.id) },
    });

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