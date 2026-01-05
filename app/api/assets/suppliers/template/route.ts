import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Template Import Supplier");
    
    // --- SETUP TABLE HEADER ---
    const headers = [
      "Nama Supplier*", "Contact Person", "Telepon", "Email", "Alamat"
    ];
    
    const headerRowIdx = 1;
    const headerRow = worksheet.getRow(headerRowIdx);
    headerRow.values = headers;

    // Column widths
    const columnWidths = [25, 25, 20, 30, 40];
    columnWidths.forEach((width, index) => {
      worksheet.getColumn(index + 1).width = width;
    });

    // Style Header
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2F75B5" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add sample data rows
    worksheet.addRow({
      name: "PT. Supplier A",
      contact_person: "John Doe",
      phone: "021-1234567",
      email: "info@supplier-a.com",
      address: "Jl. Raya No. 123, Jakarta"
    });

    worksheet.addRow({
      name: "PT. Supplier B",
      contact_person: "Jane Smith", 
      phone: "021-7654321",
      email: "contact@supplier-b.com",
      address: "Jl. Industri No. 456, Surabaya"
    });

    // Style sample data rows
    for (let i = 2; i <= 3; i++) {
      const row = worksheet.getRow(i);
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { vertical: "middle", horizontal: "left" };
      });
    }

    // Add instructions sheet
    const instructionSheet = workbook.addWorksheet("Petunjuk");
    
    instructionSheet.getCell('A1').value = 'PETUNJUK IMPORT SUPPLIER';
    instructionSheet.getCell('A1').font = { bold: true, size: 16 };
    instructionSheet.getCell('A1').alignment = { wrapText: true, vertical: 'top' };
    
    const instructions = [
      '1. Isi data supplier pada sheet "Template Import Supplier"',
      '2. Field wajib ditandai dengan * (Nama Supplier)',
      '3. Nama Supplier harus unik (tidak boleh sama)',
      '4. Contact Person: nama kontak person supplier',
      '5. Telepon: nomor telepon yang bisa dihubungi',
      '6. Email: alamat email supplier (format: email@example.com)',
      '7. Alamat: alamat lengkap supplier',
      '8. Simpan file dalam format Excel (.xlsx)',
      '9. Upload file menggunakan fungsi Import',
      '',
      'Format Data:',
      '• Nama Supplier*: Nama perusahaan supplier (WAJIB)',
      '• Contact Person: PIC supplier (opsional)',
      '• Telepon: Nomor telepon aktif (opsional)',
      '• Email: Email valid supplier (opsional)',
      '• Alamat: Alamat lengkap supplier (opsional)',
      '',
      'Catatan Penting:',
      '- Nama Supplier harus unik, tidak boleh duplikat',
      '- Email akan divalidasi formatnya',
      '- Sel kosong untuk field opsional akan diabaikan',
      '- Pastikan data supplier valid sebelum import'
    ];

    instructions.forEach((instruction, index) => {
      instructionSheet.getCell(`A${index + 3}`).value = instruction;
      instructionSheet.getCell(`A${index + 3}`).alignment = { wrapText: true, vertical: 'top' };
    });

    instructionSheet.getColumn('A').width = 100;

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="TEMPLATE_IMPORT_SUPPLIER-${Date.now()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating supplier template:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}