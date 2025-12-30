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

// GET - Get single brand by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const brand = await dbAsset.brands.findUnique({
      where: { id: BigInt(params.id) },
    });

    if (!brand) {
      return NextResponse.json(
        { message: "Brand not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(brand),
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update brand by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    const brand = await dbAsset.brands.update({
      where: { id: BigInt(params.id) },
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

// DELETE - Delete brand by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbAsset.brands.delete({
      where: { id: BigInt(params.id) },
    });

    return NextResponse.json({
      message: "Brand deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}