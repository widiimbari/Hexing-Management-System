import { NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';
import { writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { AssetLog } from '@/lib/system-logger';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = BigInt(params.id);
    const item = await dbAsset.consumables.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    
    // Handle BigInt serialization
    const serialized = JSON.parse(JSON.stringify(item, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json(serialized);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const id = BigInt(params.id);

        // Fetch item before delete for logging
        const item = await dbAsset.consumables.findUnique({ where: { id } });

        await dbAsset.consumables.delete({
            where: { id },
        });

        // Delete image folder if exists
        const uploadDir = join(process.cwd(), 'public/uploads/consumables', id.toString());
        if (existsSync(uploadDir)) {
            try {
                await rm(uploadDir, { recursive: true, force: true });
            } catch (e) {
                console.error(`Failed to delete consumable image folder: ${uploadDir}`, e);
            }
        }

        if (item) {
            await AssetLog.delete('ConsumableRequest', id.toString(), `Deleted request for ${item.item_name} (Doc: ${item.document_number})`, {
                item_name: item.item_name,
                document_number: item.document_number
            });
        }

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = BigInt(params.id);
    
    // Check if it's a multipart form (for file upload)
    const contentType = request.headers.get("content-type") || "";
    
    let updateData: any = {};

    if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        const file = formData.get('receipt_image') as File | null;
        
        // Handle other fields
        if (formData.has('qty_actual')) {
            const val = parseInt(formData.get('qty_actual') as string);
            if (!isNaN(val)) updateData.qty_actual = val;
        }
        if (formData.has('unit_price_real')) {
            const val = parseFloat(formData.get('unit_price_real') as string);
            if (!isNaN(val)) updateData.unit_price_real = val;
        }
        if (formData.has('settlement_date')) {
            const dateStr = formData.get('settlement_date') as string;
            if (dateStr) {
                const date = new Date(dateStr);
                if (!isNaN(date.getTime())) updateData.settlement_date = date;
            }
        }
        if (formData.has('status')) {
            const status = formData.get('status') as string;
            if (status === 'COMPLETED' || status === 'PENDING') {
                updateData.status = status;
            }
        }

        // Handle Receipt Image Upload
        if (file && file.size > 0) {
            try {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
                const filename = `receipt-${Date.now()}-${safeFilename}`;
                const uploadDir = join(process.cwd(), 'public/uploads/consumables', id.toString());
                const filePath = join(uploadDir, filename);

                await mkdir(uploadDir, { recursive: true });
                await writeFile(filePath, buffer);
                updateData.receipt_image = `/uploads/consumables/${id}/${filename}`;
            } catch (err) {
                console.error("Receipt image upload error:", err);
                throw new Error("Receipt image upload failed");
            }
        }

        // Handle Item Image Upload
        const itemImageFile = formData.get('item_image') as File | null;
        if (itemImageFile && itemImageFile.size > 0) {
            try {
                const bytes = await itemImageFile.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const safeFilename = itemImageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
                const filename = `item-${Date.now()}-${safeFilename}`;
                const uploadDir = join(process.cwd(), 'public/uploads/consumables', id.toString());
                const filePath = join(uploadDir, filename);

                await mkdir(uploadDir, { recursive: true });
                await writeFile(filePath, buffer);
                updateData.item_image = `/uploads/consumables/${id}/${filename}`;
            } catch (err) {
                console.error("Item image upload error:", err);
                throw new Error("Item image upload failed");
            }
        }
    } else {
        updateData = await request.json();
    }

    // Auto Calculate logic if settlement fields are present
    if (updateData.qty_actual !== undefined && updateData.unit_price_real !== undefined) {
        const qty = Number(updateData.qty_actual);
        const price = Number(updateData.unit_price_real);
        const subtotal = qty * price;
        const shipping = subtotal * 0.03;
        const total = subtotal + shipping;

        updateData.subtotal_item = subtotal;
        updateData.shipping_fee = shipping;
        updateData.grand_total = total;
    }

    console.log("Updating ID:", id.toString());
    console.log("Update Data:", JSON.stringify(updateData, (key, value) => typeof value === 'bigint' ? value.toString() : value));

    const oldItem = await dbAsset.consumables.findUnique({ where: { id } });

    const updatedItem = await dbAsset.consumables.update({
      where: { id },
      data: updateData,
    });
    
    if (oldItem) {
        let actionDesc = `Updated request for ${updatedItem.item_name}`;
        if (updateData.status === 'COMPLETED' && oldItem.status !== 'COMPLETED') {
            actionDesc = `Settled request for ${updatedItem.item_name} (Stock In: ${updatedItem.qty_actual})`;
        }
        
        await AssetLog.update('ConsumableRequest', id.toString(), actionDesc, 
            JSON.parse(JSON.stringify(oldItem, (k, v) => typeof v === 'bigint' ? v.toString() : v)), 
            JSON.parse(JSON.stringify(updateData, (k, v) => typeof v === 'bigint' ? v.toString() : v))
        );
    }

    const serialized = JSON.parse(JSON.stringify(updatedItem, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
    
    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Error updating consumable (PATCH):", error); // Improved error logging
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
