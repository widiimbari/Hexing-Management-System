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

// GET - Get single employee by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await dbAsset.employees.findUnique({
      where: { id: BigInt(params.id) },
      include: {
        department: {
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

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(employee),
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update employee by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    const employee = await dbAsset.employees.update({
      where: { id: BigInt(params.id) },
      data: {
        nik: body.nik,
        nama: body.nama,
        gender: body.gender,
        department_id: body.department_id ? BigInt(body.department_id) : null,
      },
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: serializeBigInt(employee),
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete employee by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbAsset.employees.delete({
      where: { id: BigInt(params.id) },
    });

    return NextResponse.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}