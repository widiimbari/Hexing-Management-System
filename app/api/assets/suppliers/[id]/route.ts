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

// GET - Get single supplier by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supplier = await dbAsset.suppliers.findUnique({
      where: { id: BigInt(params.id) },
      include: {
        _count: {
          select: {
            assets: true,
          },
        },
      },
    });

    if (!supplier) {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(supplier),
    });
  } catch (error) {
    console.error("Error fetching supplier:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update supplier by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    const supplier = await dbAsset.suppliers.update({
      where: { id: BigInt(params.id) },
      data: {
        name: body.name,
        contact_person: body.contact_person,
        phone: body.phone,
        email: body.email,
        address: body.address,
      },
    });

    return NextResponse.json({
      data: serializeBigInt(supplier),
      message: "Supplier updated successfully",
    });
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete supplier by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbAsset.suppliers.delete({
      where: { id: BigInt(params.id) },
    });

    return NextResponse.json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}