import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import fs from 'fs';
import path from 'path';

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const assetId = BigInt(id);
    const formData = await req.formData();
    const files = formData.getAll('images') as File[];
    
    if (files.length === 0) {
      return NextResponse.json(
        { message: "No files provided" },
        { status: 400 }
      );
    }

    // Fetch asset to get folder name (SAP ID or ID)
    const asset = await dbAsset.assets.findUnique({
      where: { id: assetId }
    });

    if (!asset) {
      return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    }

    // Determine folder name: SAP ID -> Serial Number -> ID
    const folderName = asset.sap_id || asset.serial_number || id;
    // Sanitize folder name
    const safeFolderName = folderName.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    const uploadedImages = [];
    
    const uploadDir = path.join(process.cwd(), 'public/uploads/assets', safeFolderName);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const fileName = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_')}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      
      // URL should be /uploads/assets/{folder}/{file}
      const url = `/uploads/assets/${safeFolderName}/${fileName}`;

      const image = await dbAsset.asset_images.create({
        data: {
          asset_id: assetId,
          name: file.name,
          url: url,
          created_at: new Date(),
        },
      });
      
      uploadedImages.push(serializeBigInt(image));
    }

    return NextResponse.json({
      data: uploadedImages,
      message: "Images uploaded successfully",
    });
  } catch (error: any) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}