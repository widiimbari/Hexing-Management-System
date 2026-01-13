import { NextResponse } from "next/server";
import { AreaService } from "@/modules/master-data/areas/application/area-service";
import { getCurrentUser } from "@/lib/auth";

function serializeBigInt(data: any): any {
  return JSON.parse(JSON.stringify(data, (key, value) => typeof value === "bigint" ? value.toString() : value));
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await AreaService.getAreas({
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      search: searchParams.get("search") || "",
    });
    return NextResponse.json({ data: serializeBigInt(result.data), metadata: result.metadata });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();
    const data = await AreaService.createArea(body, currentUser);
    return NextResponse.json({ data: serializeBigInt(data), message: "Area created successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
    const body = await req.json();
    const currentUser = await getCurrentUser();
    const data = await AreaService.updateArea(id, body, currentUser);
    return NextResponse.json({ data: serializeBigInt(data), message: "Area updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
    const currentUser = await getCurrentUser();
    await AreaService.deleteArea(id, currentUser);
    return NextResponse.json({ message: "Area deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
