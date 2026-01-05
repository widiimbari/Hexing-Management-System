import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
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

    // Handle File Upload (Attachment)
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
      
      const attachmentUrl = `/uploads/assets/${safeFolderName}/${fileName}`;
      
      // Append attachment URL to remarks or create an image record?
      // User asked for "Lampiran Foto". Creating an asset_image record is better so it shows in gallery.
      await dbAsset.asset_images.create({
        data: {
          asset_id: assetId,
          name: `[${actionType}] ${attachment.name}`,
          url: attachmentUrl,
          created_at: new Date()
        }
      });

      // Save to transaction record
      transactionData.attachment_url = attachmentUrl;
      transactionData.remarks = remarks; // Keep original remarks clean
    }

    // Execute Transaction (Update Asset + Create Log)
    const result = await dbAsset.$transaction(async (tx) => {
      const updated = await tx.assets.update({
        where: { id: assetId },
        data: assetUpdateData
      });

      const log = await tx.asset_transactions.create({
        data: transactionData
      });

      return { updated, log };
    });

    return NextResponse.json({
      message: "Action processed successfully",
      data: serializeBigInt(result)
    });

  } catch (error: any) {
    console.error("Error processing asset action:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
