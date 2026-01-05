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

// GET - Get single department by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const department = await dbAsset.departments.findUnique({
      where: { id: BigInt(id) },
    });

    if (!department) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(department),
    });
  } catch (error) {
    console.error("Error fetching department:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update department by ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

// DELETE - Delete department by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbAsset.departments.delete({
      where: { id: BigInt(id) },
    });

    return NextResponse.json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}