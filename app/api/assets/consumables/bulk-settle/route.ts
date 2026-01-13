import { NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function PATCH(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
        return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const formData = await request.formData();
    
    // Parse items data (expecting a JSON string of array of objects)
    const itemsJson = formData.get('items_data') as string;
    if (!itemsJson) return NextResponse.json({ message: "No items data" }, { status: 400 });
    
    const itemsToUpdate = JSON.parse(itemsJson);
    const settlementDate = new Date(formData.get('settlement_date') as string || new Date());
    const file = formData.get('receipt_image') as File | null;

    let receiptImageUrl = "";

    // 1. Handle File Upload once if provided (shared receipt for bulk settlement)
    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `bulk-${Date.now()}-${safeFilename}`;
        const uploadDir = join(process.cwd(), 'public/uploads/consumables/bulk');
        const filePath = join(uploadDir, filename);

        await mkdir(uploadDir, { recursive: true });
        await writeFile(filePath, buffer);
        receiptImageUrl = `/uploads/consumables/bulk/${filename}`;
    }

    // 2. Perform updates in a transaction
    const results = await dbAsset.$transaction(async (tx) => {
        const updatedItems = [];
        
        for (const item of itemsToUpdate) {
            const qty = Number(item.qty_actual);
            const price = Number(item.unit_price_real);
            const subtotal = qty * price;
            const shipping = subtotal * 0.03;
            const total = subtotal + shipping;

            const updated = await tx.consumables.update({
                where: { id: BigInt(item.id) },
                data: {
                    qty_actual: qty,
                    unit_price_real: price,
                    subtotal_item: subtotal,
                    shipping_fee: shipping,
                    grand_total: total,
                    settlement_date: settlementDate,
                    status: 'COMPLETED',
                    receipt_image: receiptImageUrl || item.receipt_image // use bulk image or keep existing
                }
            });
            updatedItems.push(updated);
        }
        return updatedItems;
    });

    return NextResponse.json({ 
        message: `Successfully settled ${results.length} items`,
        count: results.length 
    });

  } catch (error: any) {
    console.error("Bulk Settlement Error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
