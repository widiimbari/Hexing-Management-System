import { NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    
    // Build filter
    const where: any = {};
    if (search) {
      where.OR = [
        { item_name: { contains: search, mode: 'insensitive' } },
        { brand_type: { contains: search, mode: 'insensitive' } },
      ];
    }

    const data = await dbAsset.consumables.findMany({
      where,
      orderBy: { request_date: 'desc' },
    });
    
    // Serialize BigInt
    const serializedData = JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json({ data: serializedData });
  } catch (error: any) {
    console.error("Error fetching consumables:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let data: any = {};
    
    const now = new Date();
    const docNumber = `REQ/${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${Date.now().toString().slice(-6)}`;

    if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        data = {
            item_name: formData.get('item_name') as string,
            brand_type: formData.get('brand_type') as string,
            qty_estimated: parseInt(formData.get('qty_estimated') as string),
            price_estimated: parseFloat(formData.get('price_estimated') as string),
            purchase_link: formData.get('purchase_link') as string,
            document_number: docNumber,
            status: 'PENDING',
            request_date: new Date(),
        };

        const file = formData.get('item_image') as File | null;
        if (file) {
            const { writeFile } = await import('fs/promises');
            const { join } = await import('path');
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `req-${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const path = join(process.cwd(), 'public/uploads', filename);
            await writeFile(path, buffer);
            data.item_image = `/uploads/${filename}`;
        }
    } else {
        const body = await request.json();
        data = {
            ...body,
            qty_estimated: parseInt(body.qty_estimated),
            price_estimated: parseFloat(body.price_estimated),
            document_number: docNumber,
            status: 'PENDING',
            request_date: new Date(),
        };
    }

    if (!data.item_name) {
      return NextResponse.json({ message: 'Item name is required' }, { status: 400 });
    }

    const newItem = await dbAsset.consumables.create({
      data
    });

    return NextResponse.json(newItem);
  } catch (error: any) {
    console.error("Error creating consumable:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
