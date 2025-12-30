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
  { params }: { params: { id: string } }
) {
  try {
    const department = await dbAsset.departments.findUnique({
      where: { id: BigInt(params.id) },
      include: {
        _count: {
          select: {
            employees: true,
          },
        },
      },
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    const department = await dbAsset.departments.update({
      where: { id: BigInt(params.id) },
      data: {
        name: body.name,
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
  { params }: { params: { id: string } }
) {
  try {
    await dbAsset.departments.delete({
      where: { id: BigInt(params.id) },
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