import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { AssetLog } from "@/lib/system-logger";
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

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const assetId = BigInt(id);
    const formData = await req.formData();
    const currentUser = await getCurrentUser();
    
    const actionType = formData.get('action_type') as string; // 'CONDITION_CHANGE', 'RELOCATION', 'MAINTENANCE', 'DISPOSE'
    
    console.log("Processing action:", { assetId, actionType });

    const remarks = formData.get('remarks') as string;
    const transactionDateStr = formData.get('date') as string;
    // Force UTC interpretation to ensure stored time matches input time textually
    const transactionDate = transactionDateStr 
      ? new Date(transactionDateStr.endsWith('Z') ? transactionDateStr : `${transactionDateStr}Z`) 
      : new Date();
    const attachment = formData.get('attachment') as File | null;

    const currentAsset = await dbAsset.assets.findUnique({
      where: { id: assetId },
      include: { location: true }
    });

    if (!currentAsset) {
      return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    }

    const changedById = currentUser?.id ? BigInt(currentUser.id) : null;
    const changedByName = currentUser?.username || "System";

    let transactionData: any = {
      asset_id: assetId,
      transaction_type: actionType,
      previous_holder_id: currentAsset.employee_id,
      new_holder_id: currentAsset.employee_id, // Default to no change
      previous_location: currentAsset.location?.name,
      new_location: currentAsset.location?.name, // Default to no change
      previous_condition: currentAsset.condition,
      new_condition: currentAsset.condition, // Default to no change
      transaction_date: transactionDate,
      created_by: changedById,
      creator_name: changedByName,
      remarks: remarks
    };

    // Handle updates based on action type
    const assetUpdateData: any = { updated_at: new Date() };

    if (actionType === 'CONDITION_CHANGE') {
      const newConditionStr = formData.get('new_condition') as string;
      const normalizedCondition = newConditionStr ? newConditionStr.toUpperCase().replace(/ /g, '_') : '';
      
      if (normalizedCondition && Object.values(AssetCondition).includes(normalizedCondition as AssetCondition)) {
        assetUpdateData.condition = normalizedCondition;
        transactionData.new_condition = normalizedCondition;
      }
    } else if (actionType === 'RELOCATION') {
      const newLocationIdStr = formData.get('new_location_id') as string;
      if (newLocationIdStr) {
        const newLocationId = BigInt(newLocationIdStr);
        assetUpdateData.location_id = newLocationId;
        
        // Fetch new location name for log
        const newLocation = await dbAsset.locations.findUnique({ where: { id: newLocationId } });
        transactionData.new_location = newLocation?.name;
      }
    } else if (actionType === 'ASSIGNMENT') {
      const newEmployeeIdStr = formData.get('new_employee_id') as string;
      if (newEmployeeIdStr === 'unassign') {
        assetUpdateData.employee_id = null;
        transactionData.new_holder_id = null;
      } else if (newEmployeeIdStr) {
        const newEmployeeId = BigInt(newEmployeeIdStr);
        assetUpdateData.employee_id = newEmployeeId;
        transactionData.new_holder_id = newEmployeeId;
      }
    }

    // Prepare file upload data
    let uploadedFilePath: string | null = null;
    let attachmentUrl: string | null = null;

    try {
      // Handle File Upload (Attachment) - Upload first, cleanup if transaction fails
      if (attachment && attachment.size > 0) {
        const folderName = currentAsset.sap_id || currentAsset.serial_number || String(assetId);
        const safeFolderName = folderName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const uploadDir = path.join(process.cwd(), 'public/uploads/assets', safeFolderName);

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-action-${actionType.toLowerCase()}-${attachment.name.replace(/[^a-z0-9.]/gi, '_')}`;
        const filePath = path.join(uploadDir, fileName);
        const arrayBuffer = await attachment.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

        uploadedFilePath = filePath; // Track for cleanup
        attachmentUrl = `/uploads/assets/${safeFolderName}/${fileName}`;

        transactionData.attachment_url = attachmentUrl;
        transactionData.remarks = remarks;
      }

      // Execute Transaction (Update Asset + Create Log + Image Record)
      const result = await dbAsset.$transaction(async (tx) => {
        // 1. Update asset
        const updated = await tx.assets.update({
          where: { id: assetId },
          data: assetUpdateData
        });

        // 2. Create transaction log
        const log = await tx.asset_transactions.create({
          data: transactionData
        });

        // 3. Create image record if attachment uploaded
        if (attachmentUrl) {
          await tx.asset_images.create({
            data: {
              asset_id: assetId,
              name: `[${actionType}] ${attachment!.name}`,
              url: attachmentUrl,
              created_at: new Date()
            }
          });
        }

        return { updated, log };
      });

      // 4. Log system activity (Outside of asset db transaction)
      // Convert BigInts to strings for logging
      const logDetails = {
        actionType,
        remarks,
        previous_condition: currentAsset.condition,
        new_condition: transactionData.new_condition,
        previous_location: currentAsset.location?.name,
        new_location: transactionData.new_location,
        employee_id: assetUpdateData.employee_id ? String(assetUpdateData.employee_id) : null
      };

      await AssetLog.update(
        'Asset', 
        String(assetId), 
        `${actionType} performed on Asset ${currentAsset.serial_number}`,
        serializeBigInt(currentAsset),
        serializeBigInt(result.updated)
      );

      return NextResponse.json({
        message: "Action processed successfully",
        data: serializeBigInt(result)
      });
    } catch (error) {
      // Cleanup uploaded file if transaction failed
      if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
        try {
          fs.unlinkSync(uploadedFilePath);
          console.log('Cleaned up uploaded file after transaction failure:', uploadedFilePath);
        } catch (cleanupError) {
          console.error('Failed to cleanup uploaded file:', uploadedFilePath, cleanupError);
        }
      }

      throw error; // Re-throw to outer catch
    }

  } catch (error: any) {
    console.error("Error processing asset action:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
