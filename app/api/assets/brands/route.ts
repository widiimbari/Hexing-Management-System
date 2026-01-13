import { NextResponse } from "next/server";
import { BrandService } from "@/modules/master-data/brands/application/brand-service";
import { getCurrentUser } from "@/lib/auth";

// Helper to serialize BigInt
function serializeBigInt(data: any): any {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const result = await BrandService.getBrands({ page, limit, search });

    return NextResponse.json({
      data: serializeBigInt(result.data),
      metadata: result.metadata,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();
    
    const brand = await BrandService.createBrand({ name: body.name }, currentUser);

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

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: "Brand ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const currentUser = await getCurrentUser();

    const brand = await BrandService.updateBrand(id, { name: body.name }, currentUser);

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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: "Brand ID is required" }, { status: 400 });
    }

    const currentUser = await getCurrentUser();
    await BrandService.deleteBrand(id, currentUser);

    return NextResponse.json({
      message: "Brand deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting brand:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: error.message === "Brand not found" ? 404 : 500 }
    );
  }
}