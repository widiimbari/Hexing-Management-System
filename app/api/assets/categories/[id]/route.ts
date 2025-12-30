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

// GET - Get single category by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await dbAsset.categories.findUnique({
      where: { id: BigInt(params.id) },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(category),
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update category by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    const category = await dbAsset.categories.update({
      where: { id: BigInt(params.id) },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json({
      data: serializeBigInt(category),
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete category by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbAsset.categories.delete({
      where: { id: BigInt(params.id) },
    });

    return NextResponse.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}