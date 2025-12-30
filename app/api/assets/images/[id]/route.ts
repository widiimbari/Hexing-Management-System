import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";

// DELETE - Delete an image by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbAsset.asset_images.delete({
      where: { id: BigInt(params.id) },
    });

    return NextResponse.json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}