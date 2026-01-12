import { NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';
import ExcelJS from 'exceljs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(Buffer.from(buffer));
    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) {
      return NextResponse.json({ message: 'Invalid excel file' }, { status: 400 });
    }

    // Generate Document Number for this batch
    const now = new Date();
    const docNumber = `REQ/${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${Date.now().toString().slice(-6)}`;

    const consumablesToCreate: any[] = [];
    
    // Header check (Optional but good)
    // Row 1 is usually headers
    
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header

      // Column mapping:
      // 1: No
      // 2: Item Name
      // 3: Brand/Type
      // 4: Qty
      // 5: Price
      // 6: Link
      // 7: Remarks

      const itemName = row.getCell(2).value?.toString()?.trim();
      if (!itemName) return; // Skip empty rows

      const brandType = row.getCell(3).value?.toString()?.trim() || '';
      
      const qtyRaw = row.getCell(4).value;
      const qty = parseInt(qtyRaw?.toString() || '1') || 1;
      
      const priceRaw = row.getCell(5).value;
      const price = parseFloat(priceRaw?.toString() || '0') || 0;
      
      const remark = row.getCell(6).value?.toString()?.trim() || '';

      // Link Handling (Now at the end - Column 7)
      const linkCell = row.getCell(7).value;
      let link = '';
      if (linkCell) {
          if (typeof linkCell === 'object') {
              if ('hyperlink' in linkCell) link = (linkCell as any).hyperlink;
              else if ('text' in linkCell) link = (linkCell as any).text;
              else if ('result' in linkCell) link = (linkCell as any).result?.toString() || '';
              else link = JSON.stringify(linkCell);
          } else {
              link = String(linkCell);
          }
      }
      if (link === '[object Object]' || link.includes('{"')) link = '';

      consumablesToCreate.push({
        item_name: itemName,
        brand_type: brandType,
        qty_estimated: qty,
        price_estimated: price,
        purchase_link: link,
        remarks: remark,
        document_number: docNumber,
        status: 'PENDING',
        request_date: new Date(),
      });
    });

    if (consumablesToCreate.length === 0) {
      return NextResponse.json({ message: 'No valid data found in Excel. Ensure "Item Name" is provided.' }, { status: 400 });
    }

    // Bulk create
    await dbAsset.consumables.createMany({
      data: consumablesToCreate,
    });

    return NextResponse.json({ 
      message: `Successfully imported ${consumablesToCreate.length} items under Document ${docNumber}`,
      count: consumablesToCreate.length,
      document_number: docNumber
    });

  } catch (error: any) {
    console.error("Import Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}