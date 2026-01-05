import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const assets = await dbAsset.assets.findMany({
      include: {
        asset_type: true,
        category: true,
        brand: true,
        area: true,
        location: true,
        employee: true,
        supplier_rec: true,
      },
      orderBy: { created_at: "desc" },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Assets");

    // --- SETUP VISUAL (LOGO & ADDRESS) ---
    const logoFileName = "HEXING LOGO.png";
    const logoPath = path.join(process.cwd(), "public", logoFileName);
    
    console.log("Mencari logo di:", logoPath);
    console.log("Apakah file ada?", fs.existsSync(logoPath));

    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      const logoId = workbook.addImage({
        buffer: logoBuffer as any,
        extension: 'png',
      });

      worksheet.addImage(logoId, {
        tl: { col: 0.2, row: 0.2 }, 
        ext: { width: 180, height: 65 },
        editAs: 'oneCell' 
      });
    } else {
      console.error("ERROR: Logo tidak ditemukan! Pastikan file ada di folder public.");
    }

    // --- ADDRESS TEXT ---
    const nameCell = worksheet.getCell("C1");
    nameCell.value = "PT. HEXING TECHNOLOGY";
    nameCell.font = { name: "Arial", size: 14, bold: true, color: { argb: "FF003366" } };
    nameCell.alignment = { vertical: "bottom", horizontal: "left" };

    const areaCell = worksheet.getCell("C2");
    areaCell.value = "Kawasan Industri Mitra Karawang";
    areaCell.font = { name: "Arial", size: 10 };
    areaCell.alignment = { vertical: "middle", horizontal: "left" };

    const streetCell = worksheet.getCell("C3");
    streetCell.value = "Jl. Mitra Timur II Blok D-24 Karawang-Indonesia";
    streetCell.font = { name: "Arial", size: 10 };
    streetCell.alignment = { vertical: "middle", horizontal: "left" };

    const phoneCell = worksheet.getCell("C4");
    phoneCell.value = "Phone: (0267) 8610077, Fax: (0267) 8610078";
    phoneCell.font = { name: "Arial", size: 10 };
    phoneCell.alignment = { vertical: "top", horizontal: "left" };

    // --- SETUP TITLE ---
    worksheet.mergeCells("A6:L6");
    const titleCell = worksheet.getCell("A6");
    titleCell.value = "LAPORAN ASET";
    titleCell.font = { name: "Arial", size: 16, bold: true, underline: true };
    titleCell.alignment = { vertical: "middle", horizontal: "center" };

    // --- SETUP TABLE HEADER ---
    const headerRowIdx = 8;
    const headerRow = worksheet.getRow(headerRowIdx);
    
    const headers = [
      "Nomor Serial", "SAP ID", "Tipe", "Kategori", "Merek", 
      "Area", "Lokasi", "Karyawan", "Supplier", "Tanggal Pembelian", "Tanggal Dibuat"
    ];
    
    headerRow.values = headers;

    // Styling Header
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2F75B5" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Column widths
    const columnWidths = [20, 15, 15, 15, 15, 15, 15, 20, 20, 15, 20];
    columnWidths.forEach((width, index) => {
      worksheet.getColumn(index + 1).width = width;
    });

    // --- SETUP DATA ROWS ---
    assets.forEach((asset) => {
      const rowData = [
        asset.serial_number,
        asset.sap_id || "",
        asset.asset_type?.name || "",
        asset.category?.name || "",
        asset.brand?.name || "",
        asset.area?.name || "",
        asset.location?.name || "",
        asset.employee ? `${asset.employee.nik} - ${asset.employee.nama}` : "",
        asset.supplier_rec?.name || "",
        asset.purchase_date ? asset.purchase_date.toISOString().split("T")[0] : "",
        asset.created_at ? asset.created_at.toLocaleString() : ""
      ];
      
      const row = worksheet.addRow(rowData);

      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };

        // Date formatting for purchase date and created at
        if (colNumber === 10 || colNumber === 11) { // Purchase Date and Created At columns
          if (cell.value && typeof cell.value === 'string' && cell.value.includes('/')) {
            cell.numFmt = 'dd/mm/yyyy hh:mm';
          }
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const filename = `LAPORAN_ASET_${dateStr}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting assets:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
