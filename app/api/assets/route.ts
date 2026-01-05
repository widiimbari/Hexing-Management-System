import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import { logActivity } from "@/lib/activity-logger";
import { getCurrentUser } from "@/lib/auth";
import { AssetCondition } from "@/generated/asset-client-v8";

// Helper to serialize BigInt
function serializeBigInt(data: any): any {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

// GET - Fetch all assets with pagination and search
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { asset_type: { name: { contains: search } } }, // Search by type name
        { serial_number: { contains: search } },
        { sap_id: { contains: search } },
        { category: { name: { contains: search } } },
        { brand: { name: { contains: search } } },
        { area: { name: { contains: search } } },
        { location: { name: { contains: search } } },
        { employee: { nama: { contains: search } } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.assets.findMany({
        where,
        take: limit,
        skip,
        include: {
          asset_type: true,
          category: true,
          brand: true,
          area: true,
          location: true,
          employee: {
            include: {
              department: true
            }
          },
          supplier_rec: true,
          main_image: true,
          asset_images: true,
        },
        orderBy: {
          updated_at: "desc",
        },
      }),
      dbAsset.assets.count({ where }),
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
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new asset
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;
    const currentUser = await getCurrentUser();
    
    const getBigInt = (val: any) => {
      if (val === null || val === undefined || val === "") return undefined;
      try {
        return BigInt(val);
      } catch (e) {
        return undefined;
      }
    };

    const conditionStr = formData.get('condition') as string;
    // Validate condition, default to GOOD if invalid
    // Normalize input: "Good" -> "GOOD", "Slightly Damaged" -> "SLIGHTLY_DAMAGED"
    const normalizedCondition = conditionStr ? conditionStr.toUpperCase().replace(/ /g, '_') : 'GOOD';
    const condition = Object.values(AssetCondition).includes(normalizedCondition as AssetCondition)
      ? (normalizedCondition as AssetCondition)
      : AssetCondition.GOOD;

    const data = {
      type_id: getBigInt(formData.get('type_id')),
      serial_number: formData.get('serial_number') as string,
      sap_id: (formData.get('sap_id') as string) || null,
      purchase_date: formData.get('purchase_date') ? new Date(formData.get('purchase_date') as string) : null,
      category_id: getBigInt(formData.get('category_id')),
      brand_id: getBigInt(formData.get('brand_id')),
      area_id: getBigInt(formData.get('area_id')),
      location_id: getBigInt(formData.get('location_id')),
      employee_id: getBigInt(formData.get('employee_id')),
      supplier_id: getBigInt(formData.get('supplier_id')),
      condition: condition,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // 1. Create asset
    let asset = await dbAsset.assets.create({
      data,
      include: {
        asset_type: true,
        category: true,
        brand: true,
        area: true,
        location: true,
        employee: {
          include: {
            department: true
          }
        },
        supplier_rec: true,
        main_image: true,
      },
    });

    const fs = require('fs');
    const path = require('path');
    
    // Determine base folder name and ID for naming
    // Priority: SAP ID -> Serial Number -> ID
    const namingId = asset.sap_id || asset.serial_number || String(asset.id);
    // Sanitize for folder name
    const folderName = asset.sap_id || asset.serial_number || String(asset.id);
    const safeFolderName = folderName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const uploadDir = path.join(process.cwd(), 'public/uploads/assets', safeFolderName);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 2. Handle Multiple Images
    const imageFiles = formData.getAll('images') as File[];
    let firstImageId: bigint | null = null;

    if (imageFiles && imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (file.size === 0) continue;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Naming convention: SAP_ID_001, SAP_ID_002...
        const extension = file.name.split('.').pop() || 'jpg';
        const sequence = String(i + 1).padStart(3, '0');
        // Sanitize namingId for filename
        const safeNamingId = namingId.replace(/[^a-z0-9]/gi, '_');
        const fileName = `${safeNamingId}_${sequence}.${extension}`;
        
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        const imageUrl = `/uploads/assets/${safeFolderName}/${fileName}`;

        const newImage = await dbAsset.asset_images.create({
          data: {
            asset_id: asset.id,
            name: fileName,
            url: imageUrl,
            created_at: new Date(),
          },
        });

        if (i === 0) {
          firstImageId = newImage.id;
        }
      }
    }

    // 3. Handle Document (Optional)
    const documentFile = formData.get('document') as File | null;
    if (documentFile && documentFile.size > 0) {
      const bytes = await documentFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const extension = documentFile.name.split('.').pop() || 'pdf';
      const safeNamingId = namingId.replace(/[^a-z0-9]/gi, '_');
      const fileName = `${safeNamingId}_DOC.${extension}`;
      
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      const docUrl = `/uploads/assets/${safeFolderName}/${fileName}`;

      // Store document in asset_images but maybe distinct naming
      await dbAsset.asset_images.create({
        data: {
          asset_id: asset.id,
          name: fileName, // Name indicates it's a doc
          url: docUrl,
          created_at: new Date(),
        },
      });
    }

    // Update asset with main image if any
    if (firstImageId) {
      asset = await dbAsset.assets.update({
        where: { id: asset.id },
        data: {
          image_id: firstImageId,
        },
        include: {
          asset_type: true,
          category: true,
          brand: true,
          area: true,
          location: true,
          employee: {
            include: {
              department: true
            }
          },
          supplier_rec: true,
          main_image: true,
        },
      });
    }

    // 3. Create Transaction: PURCHASE
    const userId = currentUser?.id ? BigInt(currentUser.id) : null;
    const userName = currentUser?.username || "System";
    
    await dbAsset.asset_transactions.create({
      data: {
        asset_id: asset.id,
        transaction_type: 'PURCHASE',
        new_holder_id: asset.employee_id,
        new_location: asset.location?.name,
        new_condition: asset.condition,
        transaction_date: asset.purchase_date || new Date(),
        created_by: userId,
        creator_name: userName,
        remarks: 'Asset purchased/created'
      }
    });

    // Logging (Generic)
    await logActivity(
      'CREATE',
      'Asset',
      String(asset.id),
      `Created asset ${asset.serial_number}`,
      currentUser as any
    );

    return NextResponse.json({
      data: serializeBigInt(asset),
      message: "Asset created successfully",
    });
  } catch (error) {
    console.error("Error creating asset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
