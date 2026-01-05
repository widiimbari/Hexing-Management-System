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

// GET - Get single area by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const area = await dbAsset.areas.findUnique({
      where: { id: BigInt(id) },
    });

    if (!area) {
      return NextResponse.json(
        { message: "Area not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(area),
    });
  } catch (error) {
    console.error("Error fetching area:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update area by ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    const area = await dbAsset.areas.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(area),
      message: "Area updated successfully",
    });
  } catch (error) {
    console.error("Error updating area:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete area by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbAsset.areas.delete({
      where: { id: BigInt(id) },
    });

    return NextResponse.json({
      message: "Area deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting area:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}