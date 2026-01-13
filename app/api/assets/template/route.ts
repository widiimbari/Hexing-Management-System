import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    // Fetch all dropdown data
    const [categories, brands, areas, locations, suppliers, employees] = await Promise.all([
      dbAsset.categories.findMany({ orderBy: { name: 'asc' } }),
      dbAsset.brands.findMany({ orderBy: { name: 'asc' } }),
      dbAsset.areas.findMany({ orderBy: { name: 'asc' } }),
      dbAsset.locations.findMany({ orderBy: { name: 'asc' } }),
      dbAsset.suppliers.findMany({ orderBy: { name: 'asc' } }),
      dbAsset.employees.findMany({ orderBy: { nik: 'asc' } }),
    ]);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Asset Import Template");

    // Create dropdown data in separate sheet for validation
    const validationSheet = workbook.addWorksheet("Data Dropdown");
    // validationSheet.state = 'veryHidden'; // Make it visible so users can see the data

    // Style dropdown data sheet
    validationSheet.getCell('A1').value = 'Kategori';
    validationSheet.getCell('A1').font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
    validationSheet.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2F75B5' }
    };
    validationSheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    validationSheet.getCell('A1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    validationSheet.getCell('B1').value = 'Merek';
    validationSheet.getCell('B1').font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
    validationSheet.getCell('B1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2F75B5' }
    };
    validationSheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };
    validationSheet.getCell('B1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    validationSheet.getCell('C1').value = 'Area';
    validationSheet.getCell('C1').font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
    validationSheet.getCell('C1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2F75B5' }
    };
    validationSheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };
    validationSheet.getCell('C1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    validationSheet.getCell('D1').value = 'Lokasi';
    validationSheet.getCell('D1').font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
    validationSheet.getCell('D1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2F75B5' }
    };
    validationSheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
    validationSheet.getCell('D1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    validationSheet.getCell('E1').value = 'Supplier';
    validationSheet.getCell('E1').font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
    validationSheet.getCell('E1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2F75B5' }
    };
    validationSheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };
    validationSheet.getCell('E1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    validationSheet.getCell('F1').value = 'Karyawan (NIK - Nama)';
    validationSheet.getCell('F1').font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
    validationSheet.getCell('F1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2F75B5' }
    };
    validationSheet.getCell('F1').alignment = { vertical: 'middle', horizontal: 'center' };
    validationSheet.getCell('F1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // Add dropdown data to validation sheet
    categories.forEach((category, index) => {
      const cell = validationSheet.getCell(`A${index + 2}`);
      cell.value = category.name;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    brands.forEach((brand, index) => {
      const cell = validationSheet.getCell(`B${index + 2}`);
      cell.value = brand.name;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    areas.forEach((area, index) => {
      const cell = validationSheet.getCell(`C${index + 2}`);
      cell.value = area.name;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    locations.forEach((location, index) => {
      const cell = validationSheet.getCell(`D${index + 2}`);
      cell.value = location.name;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    suppliers.forEach((supplier, index) => {
      const cell = validationSheet.getCell(`E${index + 2}`);
      cell.value = supplier.name;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    employees.forEach((employee, index) => {
      const cell = validationSheet.getCell(`F${index + 2}`);
      cell.value = `${employee.nik} - ${employee.nama}`;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    // Set column widths for dropdown sheet
    validationSheet.getColumn('A').width = 20;
    validationSheet.getColumn('B').width = 20;
    validationSheet.getColumn('C').width = 20;
    validationSheet.getColumn('D').width = 20;
    validationSheet.getColumn('E').width = 25;
    validationSheet.getColumn('F').width = 30;



    // --- SETUP TABLE HEADER ---
    const headers = [
      "Nomor Serial*", "SAP ID", "Kategori", "Merek",
      "Area", "Lokasi", "Karyawan (NIK - Nama)", "Supplier", "Tanggal Pembelian (YYYY-MM-DD)"
    ];

    const headerRowIdx = 1;
    const headerRow = worksheet.getRow(headerRowIdx);
    headerRow.values = headers;

    // Column widths
    const columnWidths = [20, 15, 15, 15, 15, 15, 25, 20, 20];
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

    // Add sample data rows with actual data from dropdown
    const sampleCategory = categories[0]?.name || "";
    const sampleBrand = brands[0]?.name || "";
    const sampleArea = areas[0]?.name || "";
    const sampleLocation = locations[0]?.name || "";
    const sampleSupplier = suppliers[0]?.name || "";
    const sampleEmployee = employees[0] ? `${employees[0].nik} - ${employees[0].nama}` : "";

    worksheet.addRow({
      serial_number: "CONTOH001",
      sap_id: "SAP001",
      category: sampleCategory,
      brand: sampleBrand,
      area: sampleArea,
      location: sampleLocation,
      employee: sampleEmployee,
      supplier: sampleSupplier,
      purchase_date: "2024-01-15"
    });

    worksheet.addRow({
      serial_number: "CONTOH002",
      sap_id: "SAP002",
      category: sampleCategory,
      brand: sampleBrand,
      area: sampleArea,
      location: sampleLocation,
      employee: sampleEmployee,
      supplier: sampleSupplier,
      purchase_date: "2024-02-20"
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

    // Add data validation for dropdown columns
    for (let row = 2; row <= 100; row++) { // Apply to rows 2-100 for future use
      // Category dropdown
      worksheet.getCell(`C${row}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`'Data Dropdown'!$A$2:$A$${categories.length + 1}`],
        showErrorMessage: true,
        errorTitle: 'Kategori Tidak Valid',
        error: 'Silakan pilih kategori yang valid dari dropdown'
      };

      // Brand dropdown
      worksheet.getCell(`D${row}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`'Data Dropdown'!$B$2:$B$${brands.length + 1}`],
        showErrorMessage: true,
        errorTitle: 'Merek Tidak Valid',
        error: 'Silakan pilih merek yang valid dari dropdown'
      };

      // Area dropdown
      worksheet.getCell(`E${row}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`'Data Dropdown'!$C$2:$C$${areas.length + 1}`],
        showErrorMessage: true,
        errorTitle: 'Area Tidak Valid',
        error: 'Silakan pilih area yang valid dari dropdown'
      };

      // Location dropdown
      worksheet.getCell(`F${row}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`'Data Dropdown'!$D$2:$D$${locations.length + 1}`],
        showErrorMessage: true,
        errorTitle: 'Lokasi Tidak Valid',
        error: 'Silakan pilih lokasi yang valid dari dropdown'
      };

      // Employee dropdown
      worksheet.getCell(`G${row}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`'Data Dropdown'!$F$2:$F$${employees.length + 1}`],
        showErrorMessage: true,
        errorTitle: 'Karyawan Tidak Valid',
        error: 'Silakan pilih karyawan yang valid dari dropdown'
      };

      // Supplier dropdown
      worksheet.getCell(`H${row}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`'Data Dropdown'!$E$2:$E$${suppliers.length + 1}`],
        showErrorMessage: true,
        errorTitle: 'Supplier Tidak Valid',
        error: 'Silakan pilih supplier yang valid dari dropdown'
      };
    }

    // Add instructions at the top
    const instructionSheet = workbook.addWorksheet("Petunjuk");
    
    // Instructions content
    instructionSheet.getCell('A1').value = 'PETUNJUK IMPORT ASSET';
    instructionSheet.getCell('A1').font = { bold: true, size: 16 };
    instructionSheet.getCell('A1').alignment = { wrapText: true, vertical: 'top' };
    
    const instructions = [
      '1. Isi data asset pada sheet "Template Import Asset"',
      '2. Field wajib ditandai dengan * (Nomor Serial)',
      '3. Gunakan menu dropdown untuk Kategori, Merek, Area, Lokasi, Supplier, dan Karyawan',
      '4. Data dropdown tersedia di sheet "Data Dropdown" (sheet terpisah yang bisa dilihat)',
      '5. Format tanggal harus YYYY-MM-DD (contoh: 2024-01-15)',
      '6. Format karyawan: "NIK - Nama" akan tersedia di dropdown',
      '7. Nomor Serial harus unik (tidak boleh sama)',
      '8. SAP ID opsional tapi harus unik jika diisi',
      '9. Simpan file dalam format Excel (.xlsx)',
      '10. Upload file menggunakan fungsi Import',
      '',
      'Data Referensi Dropdown:',
      '• Sheet "Data Dropdown" berisi semua pilihan yang tersedia',
      '• Setiap kolom memiliki data referensi yang sudah ada di sistem',
      '• Kategori → Kolom A pada sheet Data Dropdown',
      '• Merek → Kolom B pada sheet Data Dropdown',
      '• Area → Kolom C pada sheet Data Dropdown',
      '• Lokasi → Kolom D pada sheet Data Dropdown',
      '• Supplier → Kolom E pada sheet Data Dropdown',
      '• Karyawan → Kolom F pada sheet Data Dropdown (Format: NIK - Nama)',
      '',
      'Cara Membuat Dropdown Manual (jika dropdown tidak muncul):',
      '1. Klik cell pada kolom Kategori (kolom C, baris 2+)',
      '2. Pergi ke menu Data → Data Validation',
      '3. Pada Settings → Allow: pilih "List"',
      '4. Pada Source: ketik =Data Dropdown!$A$2:$A$100',
      '5. Klik OK → Dropdown akan muncul',
      '6. Ulangi untuk kolom lain:',
      '   • Merek: =Data Dropdown!$B$2:$B$100',
      '   • Area: =Data Dropdown!$C$2:$C$100',
      '   • Lokasi: =Data Dropdown!$D$2:$D$100',
      '   • Supplier: =Data Dropdown!$E$2:$E$100',
      '   • Karyawan: =Data Dropdown!$F$2:$F$100',
      '',
      'Catatan Penting:',
      '- Sheet "Data Dropdown" berisi data real-time dari sistem',
      '- Dropdown di Template Import Asset sudah diset otomatis',
      '- Data yang tidak ada di Data Dropdown akan menyebabkan error import',
      '- Sel kosong untuk field opsional akan diabaikan',
      '- Buka sheet "Data Dropdown" untuk melihat semua pilihan yang tersedia'
    ];

    instructions.forEach((instruction, index) => {
      instructionSheet.getCell(`A${index + 3}`).value = instruction;
      instructionSheet.getCell(`A${index + 3}`).alignment = { wrapText: true, vertical: 'top' };
      
      // Style untuk section headers
      if (instruction.includes('Sumber Data Dropdown:') || instruction.includes('Catatan Penting:')) {
        instructionSheet.getCell(`A${index + 3}`).font = { bold: true, size: 12 };
        instructionSheet.getCell(`A${index + 3}`).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF0F0F0' }
        };
      }
    });

    instructionSheet.getColumn('A').width = 120;
    instructionSheet.getRow(1).height = 30;

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="TEMPLATE_IMPORT_ASET-${Date.now()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating asset template:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}