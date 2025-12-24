import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id: idStr } = await params;
    const id = Number(idStr);
    
    if (isNaN(id)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const body = await req.json();
    // Here you might want to add validation for the body's content (e.g., with Zod)

    const product = await db.product.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(product);
  } catch (error: any) {
    // Prisma's P2025 error code means "Record to update not found."
    if (error.code === "P2025") {
      return new NextResponse("Product not found", { status: 404 });
    }
    console.error("[PATCH_PRODUCT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id:string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id: idStr } = await params;
    const id = Number(idStr);

    if (isNaN(id)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    await db.product.delete({
      where: {
        id: id,
      },
    });

    return new NextResponse(null, { status: 204 }); // 204 No Content is standard for successful DELETE
  } catch (error: any) {
    // Prisma's P2025 error code means "Record to delete not found."
    if (error.code === "P2025") {
      return new NextResponse("Product not found", { status: 404 });
    }

    console.error("[DELETE_PRODUCT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
