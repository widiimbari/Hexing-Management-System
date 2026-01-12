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

    const now = new Date();
    const docNumber = `REQ/${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${Date.now().toString().slice(-6)}`;

    const consumablesToCreate: any[] = [];
    
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const itemName = row.getCell(2).value?.toString()?.trim();
      if (!itemName) return;

      const brandType = row.getCell(3).value?.toString()?.trim() || '';
      const qty = parseInt(row.getCell(4).value?.toString() || '1') || 1;
      const price = parseFloat(row.getCell(5).value?.toString() || '0') || 0;
      const remark = row.getCell(6).value?.toString()?.trim() || '';

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
      return NextResponse.json({ message: 'No valid data found' }, { status: 400 });
    }

    await dbAsset.consumables.createMany({
      data: consumablesToCreate,
    });

    return NextResponse.json({ 
      message: `Successfully imported ${consumablesToCreate.length} items`,
      count: consumablesToCreate.length,
      document_number: docNumber
    });

  } catch (error: any) {
    console.error("Import Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
