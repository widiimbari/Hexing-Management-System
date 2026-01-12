import { NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
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
    { params }: { params: { id: string } }
) {
    try {
        const id = BigInt(params.id);
        await dbAsset.consumables.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
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
        if (formData.has('settlement_date')) updateData.settlement_date = new Date(formData.get('settlement_date') as string);
        if (formData.has('status')) updateData.status = formData.get('status') as string;

        // Handle File Upload
        if (file && file.size > 0) {
            const { mkdir } = await import('fs/promises');
            const { dirname } = await import('path');
            
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // Generate unique filename
            const filename = `receipt-${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const path = join(process.cwd(), 'public/uploads', filename);
            
            // Ensure dir exists
            await mkdir(dirname(path), { recursive: true });

            await writeFile(path, buffer);
            updateData.receipt_image = `/uploads/${filename}`;
        }
    } else {
        updateData = await request.json();
    }

    // Auto Calculate logic if settlement fields are present
    if (updateData.qty_actual !== undefined && updateData.unit_price_real !== undefined) {
        const qty = updateData.qty_actual;
        const price = updateData.unit_price_real;
        const subtotal = qty * price;
        const shipping = subtotal * 0.03;
        const total = subtotal + shipping;

        updateData.subtotal_item = subtotal;
        updateData.shipping_fee = shipping;
        updateData.grand_total = total;
    }

    const updatedItem = await dbAsset.consumables.update({
      where: { id },
      data: updateData,
    });
    
    // Handle BigInt serialization
    const serialized = JSON.parse(JSON.stringify(updatedItem, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Error updating consumable:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
