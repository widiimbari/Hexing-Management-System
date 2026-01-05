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

// GET - Fetch all employees with pagination and search
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = limit > 0 ? (page - 1) * limit : undefined;
    const take = limit > 0 ? limit : undefined;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { nik: { contains: search } },
        { nama: { contains: search } },
        { department: { name: { contains: search } } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.employees.findMany({
        where,
        take,
        skip,
        orderBy: {
          nama: "asc",
        },
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
      }),
      dbAsset.employees.count({ where }),
    ]);

    return NextResponse.json({
      data: serializeBigInt(data),
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new employee
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const employee = await dbAsset.employees.create({
      data: {
        nik: body.nik,
        nama: body.nama,
        gender: body.gender,
        department_id: body.department_id ? BigInt(body.department_id) : null,
        created_at: new Date(),
        updated_at: new Date(),
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
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}