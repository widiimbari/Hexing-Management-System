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

// POST - Upload images for an asset
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images') as File[];
    
    if (files.length === 0) {
      return NextResponse.json(
        { message: "No files provided" },
        { status: 400 }
      );
    }

    const uploadedImages = [];
    
    for (const file of files) {
      // In a real implementation, you would upload to a storage service
      // For now, we'll just create a database record
      const image = await dbAsset.asset_images.create({
        data: {
          asset_id: BigInt(params.id),
          name: file.name,
          created_at: new Date(),
        },
      });
      
      uploadedImages.push(serializeBigInt(image));
    }

    return NextResponse.json({
      data: uploadedImages,
      message: "Images uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}