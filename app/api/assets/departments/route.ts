import { NextResponse } from "next/server";
import { DepartmentService } from "@/modules/master-data/departments/application/department-service";
import { getCurrentUser } from "@/lib/auth";

function serializeBigInt(data: any): any {
  return JSON.parse(JSON.stringify(data, (key, value) => typeof value === "bigint" ? value.toString() : value));
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await DepartmentService.getDepartments({
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
    const data = await DepartmentService.createDepartment(body, currentUser);
    return NextResponse.json({ data: serializeBigInt(data), message: "Department created successfully" });
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
    const data = await DepartmentService.updateDepartment(id, body, currentUser);
    return NextResponse.json({ data: serializeBigInt(data), message: "Department updated successfully" });
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
    await DepartmentService.deleteDepartment(id, currentUser);
    return NextResponse.json({ message: "Department deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
