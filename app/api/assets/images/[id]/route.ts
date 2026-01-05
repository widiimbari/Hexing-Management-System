import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import fs from 'fs';
import path from 'path';

// DELETE - Delete an image by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const imageId = BigInt(id);

    // Fetch image to get URL
    const image = await dbAsset.asset_images.findUnique({
      where: { id: imageId },
    });

    if (!image) {
       return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    // Delete file from disk
    if (image.url) {
      const relativePath = image.url;
      if (relativePath.startsWith('/uploads/')) {
        const absolutePath = path.join(process.cwd(), 'public', relativePath);
        if (fs.existsSync(absolutePath)) {
          try {
            fs.unlinkSync(absolutePath);
          } catch (e) {
            console.error(`Failed to delete file: ${absolutePath}`, e);
          }
        }
      }
    }

    await dbAsset.asset_images.delete({
      where: { id: imageId },
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
