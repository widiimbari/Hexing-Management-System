import { NextResponse } from 'next/server';
import { ConsumableService } from '@/modules/asset-management/consumables/application/consumable-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    
    const data = await ConsumableService.getConsumables(search);
    
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
    let inputData: any = {};
    let file: File | null = null;
    let existingDocNumber: string | null = null;

    if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        existingDocNumber = formData.get('existing_document_number') as string;
        
        inputData = {
            item_name: formData.get('item_name') as string,
            brand_type: formData.get('brand_type') as string,
            qty_estimated: parseInt(formData.get('qty_estimated') as string),
            price_estimated: parseFloat(formData.get('price_estimated') as string),
            purchase_link: formData.get('purchase_link') as string,
            remarks: formData.get('remarks') as string,
            item_image: undefined
        };

        file = formData.get('item_image') as File | null;
    } else {
        const body = await request.json();
        existingDocNumber = body.existing_document_number;

        inputData = {
            item_name: body.item_name,
            brand_type: body.brand_type,
            qty_estimated: parseInt(body.qty_estimated),
            price_estimated: parseFloat(body.price_estimated),
            purchase_link: body.purchase_link,
            remarks: body.remarks,
            item_image: body.item_image
        };
    }

    if (!inputData.item_name) {
      return NextResponse.json({ message: 'Item name is required' }, { status: 400 });
    }

    const newItem = await ConsumableService.createRequest(inputData, file, existingDocNumber);

    const serializedItem = JSON.parse(JSON.stringify(newItem, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json(serializedItem);
  } catch (error: any) {
    console.error("Error creating consumable:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}