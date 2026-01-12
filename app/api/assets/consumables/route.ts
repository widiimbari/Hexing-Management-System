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

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Error fetching consumables:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check if content-type is json
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        const body = await request.json();
        
        // Basic validation
        if (!body.item_name || !body.qty_estimated || !body.price_estimated) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newItem = await dbAsset.consumables.create({
            data: {
                item_name: body.item_name,
                brand_type: body.brand_type,
                qty_estimated: parseInt(body.qty_estimated),
                price_estimated: parseFloat(body.price_estimated),
                status: 'PENDING',
                request_date: new Date(),
            },
        });
        return NextResponse.json(newItem);
    } 
    
    return NextResponse.json({ message: "Unsupported content type" }, { status: 415 });

  } catch (error: any) {
    console.error("Error creating consumable:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
