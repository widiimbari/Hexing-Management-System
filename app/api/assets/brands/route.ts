import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import { logActivity } from "@/lib/activity-logger";
import { getCurrentUser } from "@/lib/auth";

// Helper to serialize BigInt
function serializeBigInt(data: any): any {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

// GET - Fetch all brands with pagination and search
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
        { name: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.brands.findMany({
        where,
        take,
        skip,
        include: {
          _count: {
            select: { assets: true }
          }
        },
        orderBy: {
          name: "asc",
        },
      }),
      dbAsset.brands.count({ where }),
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
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new brand
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();

    const brand = await dbAsset.brands.create({
      data: {
        name: body.name,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Log activity
    await logActivity(
      'CREATE',
      'Brand',
      String(brand.id),
      `Created brand: ${brand.name}`,
      currentUser
    );

    return NextResponse.json({
      data: serializeBigInt(brand),
      message: "Brand created successfully",
    });
  } catch (error) {
    console.error("Error creating brand:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update existing brand
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: "Brand ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const currentUser = await getCurrentUser();

    const brand = await dbAsset.brands.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        updated_at: new Date(),
      },
    });

    // Log activity
    await logActivity(
      'UPDATE',
      'Brand',
      String(brand.id),
      `Updated brand: ${brand.name}`,
      currentUser
    );

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

// DELETE - Delete brand
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: "Brand ID is required" }, { status: 400 });
    }

    const currentUser = await getCurrentUser();

    // Get brand name before delete
    const brand = await dbAsset.brands.findUnique({
      where: { id: BigInt(id) }
    });

    if (!brand) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }

    await dbAsset.brands.delete({
      where: { id: BigInt(id) },
    });

    // Log activity
    await logActivity(
      'DELETE',
      'Brand',
      String(id),
      `Deleted brand: ${brand.name}`,
      currentUser
    );

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
