import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import { AssetLog } from "@/lib/system-logger";
import { getCurrentUser } from "@/lib/auth";
import { AssetCondition } from "@/generated/asset-client-v14";
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
        employee: true,
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

    const priceStr = formData.get('price') as string;
    const price = priceStr ? parseFloat(priceStr) : null;

    const updateData: any = {
      serial_number: formData.get('serial_number') as string,
      sap_id: (formData.get('sap_id') as string) || null,
      model: (formData.get('model') as string) || null,
      price: price,
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
      const oldHolderName = currentAsset.employee?.nama || 'None';
      const newHolderName = updatedAsset.employee?.nama || 'None';
      
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
          remarks: `Holder changed from ${oldHolderName} to ${newHolderName}`
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
          remarks: `Location changed from ${currentAsset.location?.name || 'None'} to ${updatedAsset.location?.name || 'None'}`
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
    // Calculate changes
    const oldValues: Record<string, any> = {};
    const newValues: Record<string, any> = {};
    
    // We compare with updateData to see what was INTENDED to change, 
    // but better to compare currentAsset vs updatedAsset for truth
    // However updatedAsset has Date objects, currentAsset has Date objects.
    // Need to handle BigInt comparison and Date comparison carefully.

    Object.keys(updateData).forEach(key => {
      // Skip updated_at
      if (key === 'updated_at') return;

      const oldVal = (currentAsset as any)[key];
      const newVal = updateData[key];

      // Simple equality check (works for primitives, BigInts if same type)
      // Dates need .getTime() or string comparison
      let isDifferent = false;

      if (oldVal instanceof Date && newVal instanceof Date) {
        isDifferent = oldVal.getTime() !== newVal.getTime();
      } else if (oldVal != newVal) { // loose equality for string/int/bigint mix
         // Check if both are falsy (null vs undefined vs "")
         if (!oldVal && !newVal) isDifferent = false;
         else isDifferent = true;
      }

      if (isDifferent) {
        oldValues[key] = serializeBigInt(oldVal);
        newValues[key] = serializeBigInt(newVal);
      }
    });

    if (Object.keys(oldValues).length > 0) {
      await AssetLog.update(
        'Asset',
        String(assetId),
        `Updated asset ${updatedAsset.serial_number}`,
        oldValues,
        newValues
      );
    }

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
    await AssetLog.delete(
      'Asset',
      String(assetId),
      `Deleted asset ${currentAsset.serial_number}`,
      serializeBigInt(currentAsset)
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