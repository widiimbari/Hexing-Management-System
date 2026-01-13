import { NextResponse } from "next/server";
import { EmployeeService } from "@/modules/master-data/employees/application/employee-service";
import { getCurrentUser } from "@/lib/auth";

function serializeBigInt(data: any): any {
  return JSON.parse(JSON.stringify(data, (key, value) => typeof value === "bigint" ? value.toString() : value));
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await EmployeeService.getEmployees({
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
    
    // Ensure department_id is BigInt if it comes as string/number
    const data = await EmployeeService.createEmployee({
        ...body,
        department_id: BigInt(body.department_id)
    }, currentUser);

    return NextResponse.json({ data: serializeBigInt(data), message: "Employee created successfully" });
  } catch (error) {
    console.error("Error creating employee:", error);
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
    
    const updateData = { ...body };
    if (body.department_id) updateData.department_id = BigInt(body.department_id);

    const data = await EmployeeService.updateEmployee(id, updateData, currentUser);
    return NextResponse.json({ data: serializeBigInt(data), message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
    const currentUser = await getCurrentUser();
    await EmployeeService.deleteEmployee(id, currentUser);
    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
