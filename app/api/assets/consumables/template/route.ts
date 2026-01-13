import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

export async function GET() {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Import Template");

    // Set column widths
    sheet.columns = [
      { key: 'no', width: 5 },
      { key: 'item_name', width: 35 },
      { key: 'brand_type', width: 20 },
      { key: 'qty', width: 8 },
      { key: 'price', width: 18 },
      { key: 'remarks', width: 30 },
      { key: 'link', width: 30 },
      { key: 'image_url', width: 35 }
    ];

    // Set headers
    const headerRow = sheet.addRow([
      "No",
      "Item Name*",
      "Brand/Type",
      "Qty*",
      "Est. Unit Price*",
      "Remarks/Purpose",
      "Purchase Link",
      "Image URL"
    ]);

    headerRow.font = { bold: true };
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE5E7EB' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    // Sample data rows
    sheet.addRow([
      1,
      "SSD Internal 512GB",
      "Samsung 870 EVO",
      5,
      850000,
      "For Server Backup",
      "https://tokopedia.com/...",
      "https://example.com/ssd.jpg"
    ]);

    sheet.addRow([
      2,
      "Mouse Wireless",
      "Logitech B170",
      10,
      85000,
      "Stock for New Employees",
      "",
      ""
    ]);

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Return as downloadable file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="Template_Import_Consumables.xlsx"',
      },
    });

  } catch (error: any) {
    console.error("Template generation error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
