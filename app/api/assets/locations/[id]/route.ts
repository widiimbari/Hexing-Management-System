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

// GET - Get single location by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const location = await dbAsset.locations.findUnique({
      where: { id: BigInt(params.id) },
      include: {
        area: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            assets: true,
          },
        },
      },
    });

    if (!location) {
      return NextResponse.json(
        { message: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(location),
    });
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update location by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    const location = await dbAsset.locations.update({
      where: { id: BigInt(params.id) },
      data: {
        name: body.name,
        area_id: BigInt(body.area_id),
      },
      include: {
        area: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: serializeBigInt(location),
      message: "Location updated successfully",
    });
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete location by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbAsset.locations.delete({
      where: { id: BigInt(params.id) },
    });

    return NextResponse.json({
      message: "Location deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}