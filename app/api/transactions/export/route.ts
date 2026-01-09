import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import ExcelJS from 'exceljs';
import path from "path";
import fs from "fs";
import { systemLog } from "@/lib/system-logger";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "ALL"; // ALL, PURCHASE, CONDITION_CHANGE, etc.
    const assetId = searchParams.get("asset_id") || "";

    const where: any = {};

    if (search) {
      where.OR = [
        { asset: { serial_number: { contains: search } } },
        { asset: { sap_id: { contains: search } } },
        { remarks: { contains: search } }
      ];
    }

    if (type && type !== "ALL") {
      where.transaction_type = type;
    }

    if (assetId) {
      where.asset_id = BigInt(assetId);
    }

    const transactions = await dbAsset.asset_transactions.findMany({
      where,
      include: {
        asset: {
          select: {
            serial_number: true,
            sap_id: true,
            asset_type: { select: { name: true } }
          }
        },
        previous_holder: { select: { nama: true } },
        new_holder: { select: { nama: true } }
      },
      orderBy: {
        transaction_date: "desc",
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    // --- SETUP VISUAL (LOGO & ADDRESS) ---
    const logoFileName = "HEXING LOGO.png";
    const logoPath = path.join(process.cwd(), "public", logoFileName);
    
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
    worksheet.mergeCells("A6:G6");
    const titleCell = worksheet.getCell("A6");
    titleCell.value = "LAPORAN TRANSAKSI ASET";
    titleCell.font = { name: "Arial", size: 16, bold: true, underline: true };
    titleCell.alignment = { vertical: "middle", horizontal: "center" };

    // --- SETUP TABLE HEADER ---
    const headerRowIdx = 8;
    const headerRow = worksheet.getRow(headerRowIdx);
    
    const headers = [
      "Tanggal", "Nomor Serial", "Tipe Aset", "Tipe Transaksi", 
      "Detail / Keterangan", "Oleh", "Previous", "New", "Lampiran (Link)"
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
    const columnWidths = [20, 20, 20, 20, 40, 20, 25, 25];
    columnWidths.forEach((width, index) => {
      worksheet.getColumn(index + 1).width = width;
    });

    // --- SETUP DATA ROWS ---
    transactions.forEach(t => {
      let details = t.remarks || "";
      let previous = "-";
      let newValue = "-";

      if (t.transaction_type === 'ASSIGNMENT') {
        previous = t.previous_holder?.nama || '-';
        newValue = t.new_holder?.nama || '-';
      } else if (t.transaction_type === 'CONDITION_CHANGE') {
        previous = t.previous_condition || '-';
        newValue = t.new_condition || '-';
      } else if (t.transaction_type === 'RELOCATION') {
        previous = t.previous_location || '-';
        newValue = t.new_location || '-';
      }

      const rowData = [
        t.transaction_date,
        t.asset.serial_number,
        t.asset.asset_type?.name || '-',
        t.transaction_type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
        details,
        t.creator_name || 'System',
        previous,
        newValue,
        t.attachment_url || '-'
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
        
        // Date formatting
        if (colNumber === 1) {
          cell.numFmt = 'dd/mm/yyyy hh:mm';
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const filename = `LAPORAN_TRANSAKSI_ASET_${dateStr}.xlsx`;

    // Log export activity
    try {
      await systemLog({
        module: 'ASSET',
        action: 'EXPORT',
        entityType: 'Transaction',
        description: `Exported ${transactions.length} transactions to ${filename}`
      });
    } catch (logError) {
      console.error("[Transaction Export] Failed to log export:", logError);
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting transactions:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
