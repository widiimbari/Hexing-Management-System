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
    
    // Skip header row (row 1)
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const itemName = row.getCell(2).value?.toString(); // Column B: Item Name
      const brandType = row.getCell(3).value?.toString(); // Column C: Brand/Type
      const qty = parseInt(row.getCell(4).value?.toString() || '0'); // Column D: Qty
      const price = parseFloat(row.getCell(5).value?.toString() || '0'); // Column E: Price
      
      // Handle Link (can be text, hyperlink object, or formula)
      const linkCell = row.getCell(6).value;
      let link = '';
      
      try {
          if (linkCell) {
              if (typeof linkCell === 'object') {
                  // Hyperlink object
                  if ('hyperlink' in linkCell) {
                      link = (linkCell as any).hyperlink;
                  } 
                  // Text object
                  else if ('text' in linkCell) {
                      link = (linkCell as any).text;
                  }
                  // Formula result
                  else if ('result' in linkCell) {
                      link = (linkCell as any).result?.toString() || '';
                  }
                  // Shared string or other object
                  else {
                      link = JSON.stringify(linkCell); // Fallback to see what it is, usually plain text in rich text
                      if (link.startsWith('"') && link.endsWith('"')) link = link.slice(1, -1);
                  }
              } else {
                  link = String(linkCell);
              }
          }
      } catch (e) {
          link = '';
      }

      // Cleanup
      if (link === '[object Object]') link = '';
      if (link.includes('{"')) link = ''; // If it looks like JSON, ignore it (safer than saving garbage)

      const remark = row.getCell(7).value?.toString() || ''; // Column G: Remarks

      if (itemName) {
        consumablesToCreate.push({
          item_name: itemName,
          brand_type: brandType,
          qty_estimated: qty,
          price_estimated: price,
          purchase_link: link,
          remarks: remark,
          document_number: docNumber, // Assign Document Number
          status: 'PENDING',
          request_date: new Date(),
        });
      }
    });

    if (consumablesToCreate.length === 0) {
      return NextResponse.json({ message: 'No valid data found in Excel' }, { status: 400 });
    }

    // Bulk create
    await dbAsset.consumables.createMany({
      data: consumablesToCreate,
    });

    return NextResponse.json({ 
      message: `Successfully imported ${consumablesToCreate.length} items`,
      count: consumablesToCreate.length 
    });

  } catch (error: any) {
    console.error("Import Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
