import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import { logActivity } from "@/lib/activity-logger";
import { getCurrentUser } from "@/lib/auth";
import { AssetCondition } from "@/generated/asset-client-v8";
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

// GET - Get single asset by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const asset = await dbAsset.assets.findUnique({
      where: { id: BigInt(id) },
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

    if (!asset) {
      return NextResponse.json(
        { message: "Asset not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(asset),
    });
  } catch (error) {
    console.error("Error fetching asset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update asset by ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const assetId = BigInt(id);
    const formData = await req.formData();
    const currentUser = await getCurrentUser();
    
    // Handle File Upload
    const imageFile = formData.get('image') as File | null;
    let newImageId = undefined;

    // Fetch current asset first to get info for folder name if needed
    const currentAsset = await dbAsset.assets.findUnique({
      where: { id: assetId },
      include: {
        location: true,
      }
    });

    if (!currentAsset) {
      return NextResponse.json(
        { message: "Asset not found" },
        { status: 404 }
      );
    }

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Determine folder name: SAP ID -> Serial Number -> ID
      const folderName = currentAsset.sap_id || currentAsset.serial_number || String(assetId);
      const safeFolderName = folderName.replace(/[^a-z0-9]/gi, '_').toLowerCase();

      const uploadDir = path.join(process.cwd(), 'public/uploads/assets', safeFolderName);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-z0-9.]/gi, '_')}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      const imageUrl = `/uploads/assets/${safeFolderName}/${fileName}`;

      // Create asset_image record
      const newImage = await dbAsset.asset_images.create({
        data: {
          asset_id: assetId,
          name: imageFile.name,
          url: imageUrl,
          created_at: new Date(),
        },
      });
      
      newImageId = newImage.id;
    }

    const getBigInt = (val: any) => {
      if (val === null || val === undefined || val === "") return undefined;
      try {
        return BigInt(val);
      } catch (e) {
        return undefined;
      }
    };

    const conditionStr = formData.get('condition') as string;
    const normalizedCondition = conditionStr ? conditionStr.toUpperCase().replace(/ /g, '_') : '';
    const condition = Object.values(AssetCondition).includes(normalizedCondition as AssetCondition)
      ? (normalizedCondition as AssetCondition)
      : undefined;

    const updateData: any = {
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
      updated_at: new Date(),
    };

    if (condition) {
      updateData.condition = condition;
    }

    if (newImageId) {
      updateData.image_id = newImageId;
    }

    // Check changes for Transactions
    const newEmployeeId = updateData.employee_id;
    const oldEmployeeId = currentAsset.employee_id;
    const newLocationId = updateData.location_id;
    const oldLocationId = currentAsset.location_id;
    const newCondition = updateData.condition;
    const oldCondition = currentAsset.condition;

    const isHolderChanged = newEmployeeId !== oldEmployeeId && (newEmployeeId !== undefined || oldEmployeeId !== null);
    const isLocationChanged = newLocationId !== oldLocationId && (newLocationId !== undefined || oldLocationId !== null);
    const isConditionChanged = newCondition !== undefined && newCondition !== oldCondition;

    // Update the asset
    const updatedAsset = await dbAsset.assets.update({
      where: { id: assetId },
      data: updateData,
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

    const changedById = currentUser?.id ? BigInt(currentUser.id) : null;
    const changedByName = currentUser?.username || "System";

    // 1. Transaction: ASSIGNMENT (Holder Change)
    if (isHolderChanged) {
      await dbAsset.asset_transactions.create({
        data: {
          asset_id: assetId,
          transaction_type: 'ASSIGNMENT',
          previous_holder_id: oldEmployeeId,
          new_holder_id: newEmployeeId,
          // Snapshot other details
          previous_location: currentAsset.location?.name,
          new_location: updatedAsset.location?.name,
          previous_condition: oldCondition,
          new_condition: updatedAsset.condition,
          transaction_date: new Date(),
          created_by: changedById,
          creator_name: changedByName,
          remarks: `Holder changed from ${oldEmployeeId || 'None'} to ${newEmployeeId || 'None'}`
        }
      });
    }

    // 2. Transaction: RELOCATION (Location Change)
    if (isLocationChanged) {
       await dbAsset.asset_transactions.create({
        data: {
          asset_id: assetId,
          transaction_type: 'RELOCATION',
          previous_holder_id: oldEmployeeId, // Keep snapshots
          new_holder_id: updatedAsset.employee_id,
          previous_location: currentAsset.location?.name,
          new_location: updatedAsset.location?.name,
          previous_condition: oldCondition,
          new_condition: updatedAsset.condition,
          transaction_date: new Date(),
          created_by: changedById,
          creator_name: changedByName,
          remarks: `Location changed`
        }
      });
    }

    // 3. Transaction: CONDITION_CHANGE
    if (isConditionChanged) {
      await dbAsset.asset_transactions.create({
        data: {
          asset_id: assetId,
          transaction_type: 'CONDITION_CHANGE',
          previous_holder_id: oldEmployeeId,
          new_holder_id: updatedAsset.employee_id,
          previous_location: currentAsset.location?.name,
          new_location: updatedAsset.location?.name,
          previous_condition: oldCondition,
          new_condition: newCondition,
          transaction_date: new Date(),
          created_by: changedById,
          creator_name: changedByName,
          remarks: `Condition changed from ${oldCondition} to ${newCondition}`
        }
      });
    }

    // Generic Update Log (Activity Log)
    await logActivity(
      'UPDATE',
      'Asset',
      String(assetId),
      {
        changes: Object.keys(updateData).filter(k => updateData[k] !== (currentAsset as any)[k]),
      },
      currentUser as any
    );

    return NextResponse.json({
      data: serializeBigInt(updatedAsset),
      message: "Asset updated successfully",
    });
  } catch (error) {
    console.error("Error updating asset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete asset by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const assetId = BigInt(id);
    const currentUser = await getCurrentUser();
    const currentAsset = await dbAsset.assets.findUnique({
      where: { id: assetId },
      include: {
        asset_images: true, // Fetch related images to delete files
      }
    });

    if (!currentAsset) {
      return NextResponse.json(
        { message: "Asset not found" },
        { status: 404 }
      );
    }

    // Delete files from disk and the folder
    const folderName = currentAsset.sap_id || currentAsset.serial_number || String(assetId);
    const safeFolderName = folderName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const assetDir = path.join(process.cwd(), 'public/uploads/assets', safeFolderName);

    if (fs.existsSync(assetDir)) {
      try {
        fs.rmSync(assetDir, { recursive: true, force: true });
      } catch (e) {
        console.error(`Failed to delete asset directory: ${assetDir}`, e);
      }
    }

    await dbAsset.assets.delete({
      where: { id: assetId },
    });

    // Logging
    await logActivity(
      'DELETE',
      'Asset',
      String(assetId),
      `Deleted asset ${currentAsset.serial_number}`,
      currentUser as any
    );

    return NextResponse.json({
      message: "Asset deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting asset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}