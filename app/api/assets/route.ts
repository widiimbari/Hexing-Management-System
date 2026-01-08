import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import { logActivity } from "@/lib/activity-logger";
import { getCurrentUser } from "@/lib/auth";
import { AssetCondition } from "@/generated/asset-client-v9";

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

    const fs = require('fs');
    const path = require('path');

    // Prepare file data structures
    const imageFiles = formData.getAll('images') as File[];
    const documentFile = formData.get('document') as File | null;
    const uploadedFiles: string[] = []; // Track for cleanup on error

    let asset;

    try {
      // Use $transaction to ensure atomicity
      asset = await dbAsset.$transaction(async (tx) => {
        // 1. Create asset
        const newAsset = await tx.assets.create({
          data,
        });

        // Determine folder name for file uploads
        const namingId = newAsset.sap_id || newAsset.serial_number || String(newAsset.id);
        const folderName = newAsset.sap_id || newAsset.serial_number || String(newAsset.id);
        const safeFolderName = folderName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const uploadDir = path.join(process.cwd(), 'public/uploads/assets', safeFolderName);

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // 2. Handle Multiple Images
        let firstImageId: bigint | null = null;

        if (imageFiles && imageFiles.length > 0) {
          for (let i = 0; i < imageFiles.length; i++) {
            const file = imageFiles[i];
            if (file.size === 0) continue;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const extension = file.name.split('.').pop() || 'jpg';
            const sequence = String(i + 1).padStart(3, '0');
            const safeNamingId = namingId.replace(/[^a-z0-9]/gi, '_');
            const fileName = `${safeNamingId}_${sequence}.${extension}`;

            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, buffer);
            uploadedFiles.push(filePath);

            const imageUrl = `/uploads/assets/${safeFolderName}/${fileName}`;

            const newImage = await tx.asset_images.create({
              data: {
                asset_id: newAsset.id,
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

        // 3. Handle Document
        if (documentFile && documentFile.size > 0) {
          const bytes = await documentFile.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const extension = documentFile.name.split('.').pop() || 'pdf';
          const safeNamingId = namingId.replace(/[^a-z0-9]/gi, '_');
          const fileName = `${safeNamingId}_DOC.${extension}`;

          const filePath = path.join(uploadDir, fileName);
          fs.writeFileSync(filePath, buffer);
          uploadedFiles.push(filePath);

          const docUrl = `/uploads/assets/${safeFolderName}/${fileName}`;

          await tx.asset_images.create({
            data: {
              asset_id: newAsset.id,
              name: fileName,
              url: docUrl,
              created_at: new Date(),
            },
          });
        }

        // 4. Update asset with main image if any
        if (firstImageId) {
          await tx.assets.update({
            where: { id: newAsset.id },
            data: {
              image_id: firstImageId,
            },
          });
        }

        // 5. Create Transaction: PURCHASE
        const userId = currentUser?.id ? BigInt(currentUser.id) : null;
        const userName = currentUser?.username || "System";

        await tx.asset_transactions.create({
          data: {
            asset_id: newAsset.id,
            transaction_type: 'PURCHASE',
            new_holder_id: newAsset.employee_id,
            new_location: data.location_id ? (await tx.locations.findUnique({ where: { id: data.location_id! } }))?.name : null,
            new_condition: newAsset.condition,
            transaction_date: newAsset.purchase_date || new Date(),
            created_by: userId,
            creator_name: userName,
            remarks: 'Asset purchased/created'
          }
        });

        // 6. Log activity
        await tx.activity_log.create({
          data: {
            action: 'CREATE',
            entity_type: 'Asset',
            entity_id: String(newAsset.id),
            details: `Created asset ${newAsset.serial_number}`,
            user_id: userId ? String(userId) : null,
            username: userName,
            created_at: new Date(),
          }
        });

        // Return asset with full relations
        return await tx.assets.findUnique({
          where: { id: newAsset.id },
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
      });

      return NextResponse.json({
        data: serializeBigInt(asset),
        message: "Asset created successfully",
      });
    } catch (error) {
      // Cleanup uploaded files on transaction failure
      for (const filePath of uploadedFiles) {
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (cleanupError) {
          console.error('Failed to cleanup file:', filePath, cleanupError);
        }
      }

      throw error; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error("Error creating asset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
