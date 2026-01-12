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
      const link = row.getCell(6).value?.toString() || ''; // Column F: Link
      const dept = row.getCell(7).value?.toString() || ''; // Column G: Department
      const remark = row.getCell(8).value?.toString() || ''; // Column H: Remarks

      if (itemName) {
        consumablesToCreate.push({
          item_name: itemName,
          brand_type: brandType,
          qty_estimated: qty,
          price_estimated: price,
          purchase_link: link,
          department: dept,
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
