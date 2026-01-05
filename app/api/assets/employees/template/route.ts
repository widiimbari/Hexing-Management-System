import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import ExcelJS from "exceljs";

export async function GET() {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Template Import Employee");
    
    // Fetch departments for dropdown validation
    const departments = await dbAsset.departments.findMany({
      orderBy: { name: 'asc' },
      select: { name: true }
    });
    
    // --- SETUP TABLE HEADER ---
    const headers = [
      "NIK*", "Nama*", "Gender* (L/P)", "Department"
    ];
    
    const headerRowIdx = 1;
    const headerRow = worksheet.getRow(headerRowIdx);
    headerRow.values = headers;

    // Column widths
    const columnWidths = [20, 30, 15, 30];
    columnWidths.forEach((width, index) => {
      worksheet.getColumn(index + 1).width = width;
    });

    // Style Header
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2F75B5" }, // Blue
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
      nik: "12345678",
      name: "John Doe",
      gender: "L",
      department: departments.length > 0 ? departments[0].name : "IT"
    });

    worksheet.addRow({
      nik: "87654321",
      name: "Jane Smith", 
      gender: "P",
      department: departments.length > 1 ? departments[1].name : "HR"
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

    // Add Data Validation for Gender
    worksheet.getColumn(3).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"L,P"'],
      showErrorMessage: true,
      errorTitle: 'Invalid Gender',
      error: 'Please select L or P'
    };

    // Add Data Validation for Department if departments exist
    if (departments.length > 0) {
      // Create hidden sheet for department list (to support > 255 chars list)
      const deptSheet = workbook.addWorksheet('Departments');
      deptSheet.state = 'hidden';
      departments.forEach((dept, idx) => {
        deptSheet.getCell(`A${idx + 1}`).value = dept.name;
      });
      
      const deptCount = departments.length;
      worksheet.getColumn(4).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`Departments!$A$1:$A$${deptCount}`],
        showErrorMessage: true,
        errorTitle: 'Invalid Department',
        error: 'Please select a valid department from the list'
      };
    }

    // Add instructions sheet
    const instructionSheet = workbook.addWorksheet("Petunjuk");
    
    instructionSheet.getCell('A1').value = 'PETUNJUK IMPORT EMPLOYEE';
    instructionSheet.getCell('A1').font = { bold: true, size: 16 };
    instructionSheet.getCell('A1').alignment = { wrapText: true, vertical: 'top' };
    
    const instructions = [
      '1. Isi data employee pada sheet "Template Import Employee"',
      '2. Field wajib ditandai dengan * (NIK, Nama, Gender)',
      '3. NIK harus unik (tidak boleh sama dengan yang sudah ada)',
      '4. Gender: Isi dengan L (Laki-laki) atau P (Perempuan)',
      '5. Department: Pilih dari dropdown (jika tersedia) atau ketik nama department yang sudah ada',
      '6. Simpan file dalam format Excel (.xlsx)',
      '7. Upload file menggunakan fungsi Import',
      '',
      'Format Data:',
      '• NIK*: Nomor Induk Karyawan (WAJIB, Unik)',
      '• Nama*: Nama lengkap karyawan (WAJIB)',
      '• Gender*: L atau P (WAJIB)',
      '• Department: Nama departemen karyawan (Opsional, harus sesuai master department)',
      '',
      'Catatan Penting:',
      '- NIK harus unik, jika duplikat akan gagal import',
      '- Department akan dicocokkan berdasarkan Nama Department',
      '- Jika Department tidak ditemukan, field akan dikosongkan (tidak error)',
      '- Pastikan data valid sebelum import'
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
        "Content-Disposition": `attachment; filename="TEMPLATE_IMPORT_EMPLOYEE-${Date.now()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating employee template:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}