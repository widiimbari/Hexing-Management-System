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

// GET - Get single asset type by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const assetType = await dbAsset.asset_types.findUnique({
      where: { id: BigInt(id) },
    });

    if (!assetType) {
      return NextResponse.json(
        { message: "Asset Type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(assetType),
    });
  } catch (error) {
    console.error("Error fetching asset type:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update asset type by ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    const assetType = await dbAsset.asset_types.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      data: serializeBigInt(assetType),
      message: "Asset Type updated successfully",
    });
  } catch (error) {
    console.error("Error updating asset type:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete asset type by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbAsset.asset_types.delete({
      where: { id: BigInt(id) },
    });

    return NextResponse.json({
      message: "Asset Type deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting asset type:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
