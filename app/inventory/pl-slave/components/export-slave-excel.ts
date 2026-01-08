import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface SlaveProductData {
  serial: string;
  module_serial: string;
  orderno: string;
  box_serial: string;
  pallet_serial: string;
}

interface SlaveAttachmentData {
  nomor: string;
  type: string;
  tgl_order: string;
  area: string;
  no_do: string;
  no_order: string;
}

export async function generateSlaveExcel(
  type: 'PLN' | 'MIMS',
  attachment: SlaveAttachmentData,
  products: SlaveProductData[],
  prefix: string
) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(type === 'PLN' ? "Lampiran PLN" : "Lampiran MIMS", {
    pageSetup: {
      paperSize: 9, // A4
      orientation: "landscape", 
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: {
        left: 0.2, right: 0.2, top: 0.3, bottom: 0.3, header: 0, footer: 0,
      },
    },
  });

  const orderYearMatch = attachment.no_order?.match(/20\d{2}/);
  const orderYear = orderYearMatch ? orderYearMatch[0] : new Date(attachment.tgl_order).getFullYear().toString();
  const yearSuffix = "0" + orderYear.slice(-2);

  const getFullCode = (serial: string) => `${prefix}${yearSuffix}${serial}`;

  if (type === 'PLN') {
    // ... (Keep existing code until Data Loop) ...
    // --- LAMPIRAN PLN SERIAL (4 Blocks Horizontal) ---
    // Columns per block: No, Palet, BigBox, Serial, PLN Serial (5 cols)
    // Total cols: 20
    
    // --- Style Global ---
    const fontRegular = { name: "Arial", size: 9 };
    const fontBold = { name: "Arial", size: 9, bold: true };
    const borderThin: Partial<ExcelJS.Borders> = {
      top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" }
    };
    const alignCenter: Partial<ExcelJS.Alignment> = { vertical: "middle", horizontal: "center", wrapText: true };
    const formatLabelColon = '@* ":"'; 

    // --- 2. HEADER ---
    try {
      const response = await fetch("/HEXING LOGO.png");
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const logoId = workbook.addImage({ buffer, extension: "png" });
        sheet.addImage(logoId, {
          tl: { col: 0.8, row: 0.5 }, 
          ext: { width: 195, height: 75 }, 
          editAs: "oneCell"
        });
      }
    } catch (e) { console.error(e); }

    // Adjust merges for 20 columns (wider)
    // Title
    sheet.mergeCells("E1:M1"); // Spanning more cols
    const cellPt = sheet.getCell("E1");
    cellPt.value = "PT. HEXING TECHNOLOGY";
    cellPt.font = { name: "Arial", size: 11, bold: true };
    cellPt.alignment = { vertical: "middle", horizontal: "left" };

    sheet.mergeCells("E2:M2"); sheet.getCell("E2").value = "Kawasan Industri Mitrakarawang,"; sheet.getCell("E2").font = fontRegular;
    sheet.mergeCells("E3:M3"); sheet.getCell("E3").value = "Jl. Mitra Timur II Blok D-24 Karawang-Indonesia"; sheet.getCell("E3").font = fontRegular;
    sheet.mergeCells("E4:M4"); sheet.getCell("E4").value = "Phone: (0267) 8610077, Fax: (0267) 8610078"; sheet.getCell("E4").font = fontRegular;

    // Tanda Tangan (Shifted to right side, cols P-T)
    const setBorder = (c: string) => sheet.getCell(c).border = borderThin;
    sheet.mergeCells("O1:Q1"); const cellSiap = sheet.getCell("O1"); cellSiap.value = "Disiapkan"; cellSiap.style = { font: fontRegular, alignment: alignCenter }; setBorder("O1");
    sheet.mergeCells("O2:Q4"); setBorder("O2"); 
    sheet.mergeCells("R1:S1"); const cellPeriksa = sheet.getCell("R1"); cellPeriksa.value = "Diperiksa"; cellPeriksa.style = { font: fontRegular, alignment: alignCenter }; setBorder("R1");
    sheet.mergeCells("R2:S4"); setBorder("R2"); 

    // --- 3. INFO PENGIRIMAN ---
    const setInfoRow = (row: number, labelLeft: string, valLeft: string, labelRight?: string, valRight?: string) => {
      // Kiri: Label A-C
      sheet.mergeCells(`A${row}:C${row}`);
      const cellLabelLeft = sheet.getCell(`A${row}`);
      cellLabelLeft.value = labelLeft; cellLabelLeft.font = fontRegular; cellLabelLeft.numFmt = formatLabelColon; cellLabelLeft.alignment = { horizontal: "left", vertical: "middle" };

      // Kiri: Value D-M
      sheet.mergeCells(`D${row}:M${row}`); 
      const cellValLeft = sheet.getCell(`D${row}`);
      cellValLeft.value = valLeft; cellValLeft.font = fontRegular; cellValLeft.alignment = { horizontal: "left", vertical: "middle", indent: 1 };

      // Kanan
      if (labelRight) {
        sheet.mergeCells(`O${row}:P${row}`);
        const cellLabelRight = sheet.getCell(`O${row}`);
        cellLabelRight.value = labelRight; cellLabelRight.font = fontRegular; cellLabelRight.numFmt = formatLabelColon; cellLabelRight.alignment = { horizontal: "left", vertical: "middle" };

        // Kanan: Value Q-Q
        sheet.mergeCells(`Q${row}:Q${row}`);
        const cellValRight = sheet.getCell(`Q${row}`);
        cellValRight.value = valRight; cellValRight.font = fontRegular; cellValRight.alignment = { horizontal: "left", vertical: "middle", indent: 1 };
      }
    };

    const startMeta = 6;
    const tglOrder = attachment.tgl_order ? new Date(attachment.tgl_order).toLocaleDateString('en-GB') : "-";
    setInfoRow(startMeta, "Tanggal Pengiriman", "", "No. Order", attachment.no_order || "-");
    setInfoRow(startMeta + 1, "No. Packing List", attachment.nomor, "Tanggal order", tglOrder);
    setInfoRow(startMeta + 2, "No. DO", attachment.no_do || "-", "", "");
    setInfoRow(startMeta + 3, "Tipe Meter", attachment.type); 

    // Area Info
    const areaRow = startMeta + 3;
    sheet.mergeCells(`O${areaRow}:T${areaRow}`); 
    const cellArea = sheet.getCell(`O${areaRow}`);
    const totalUnit = products.length || 0;
    
    cellArea.value = `AREA : ${attachment.area}     ${totalUnit} UNIT`;
    cellArea.font = { name: "Arial", size: 10, bold: true };
    cellArea.alignment = { horizontal: "left", vertical: "middle" };

    sheet.addRow([]);

    // --- 4. HEADER TABEL ---
    const headerRowIdx = 11;
    const headerRow = sheet.getRow(headerRowIdx); headerRow.height = 20;
    
    const isHXM300 = attachment.type.includes("HXM300");
    const headers = isHXM300 
      ? ["No", "Palet", "BigBox", "IMEI", "Serial"]
      : ["No", "Palet", "BigBox", "Serial", "PLN Serial"];
    
    for (let b = 0; b < 4; b++) {
      const baseCol = (b * 5) + 1;
      headers.forEach((h, i) => {
        const cell = headerRow.getCell(baseCol + i);
        cell.value = h;
        cell.font = { bold: true, size: 9 }; // Re-apply font
        cell.border = borderThin;
        cell.alignment = alignCenter;
      });
    }

    const totalItems = products.length;
    const itemsPerBlock = Math.ceil(totalItems / 4);
    const dataStartRow = 12;

    for (let r = 0; r < itemsPerBlock; r++) {
      const currentRow = sheet.getRow(dataStartRow + r);
      
      for (let b = 0; b < 4; b++) {
        const index = r + (b * itemsPerBlock);
        if (index >= totalItems) continue;

        const item = products[index];
        const baseCol = (b * 5) + 1;

        // No
        const c1 = currentRow.getCell(baseCol);
        c1.value = index + 1;
        
        // Palet
        const c2 = currentRow.getCell(baseCol + 1);
        c2.value = item.pallet_serial;

        // BigBox
        const c3 = currentRow.getCell(baseCol + 2);
        c3.value = item.box_serial;

        // Serial
        const c4 = currentRow.getCell(baseCol + 3);
        c4.value = item.serial;

        // PLN Serial (becomes Serial if HXM300, and uses module_serial)
        // Derive year from item.orderno
        const orderYearMatch = item.orderno?.match(/20\d{2}/);
        const orderYear = orderYearMatch ? orderYearMatch[0] : new Date(attachment.tgl_order).getFullYear().toString();
        const yearSuffix = "0" + orderYear.slice(-2);
        const fullCode = `${prefix}${yearSuffix}${item.serial}`;

        const c5 = currentRow.getCell(baseCol + 4);
        c5.value = isHXM300 ? item.module_serial : fullCode;

        [c1, c2, c3, c4, c5].forEach(c => {
            c.border = borderThin;
            c.alignment = alignCenter;
            c.font = fontRegular;
        });
      }
    }
    
    // Adjust column widths
    // [No, Palet, BigBox, Serial, PLN Serial]
    const colWidths = [4, 5, 13, 12, 16]; 
    for (let b = 0; b < 4; b++) {
      for (let i = 0; i < 5; i++) {
        sheet.getColumn((b * 5) + 1 + i).width = colWidths[i];
      }
    }

  } else {
    // --- LAMPIRAN MIMS ---
    // Columns: Batch (Pallet), Serial Number (PLN Serial), Packaging (BigBox)
    const isHXM300 = attachment.type.includes("HXM300");
    
    const headerRow = sheet.getRow(1);
    const headers = ["Batch", "Serial Number", "Packaging"];
    headers.forEach((h, i) => {
        const cell = headerRow.getCell(i + 1);
        cell.value = h;
        cell.font = { bold: true };
        cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
        cell.alignment = { horizontal: "center" };
    });

    products.forEach((item, index) => {
        const currentRow = sheet.getRow(index + 2);
        
        // Batch (Pallet)
        const c1 = currentRow.getCell(1);
        c1.value = item.pallet_serial;

        // Derive year from item.orderno
        const orderYearMatch = item.orderno?.match(/20\d{2}/);
        const orderYear = orderYearMatch ? orderYearMatch[0] : new Date(attachment.tgl_order).getFullYear().toString();
        const yearSuffix = "0" + orderYear.slice(-2);
        const fullCode = `${prefix}${yearSuffix}${item.serial}`;

        // Serial Number (PLN Serial)
        const c2 = currentRow.getCell(2);
        c2.value = isHXM300 ? item.module_serial : fullCode;

        // Packaging (BigBox)
        const c3 = currentRow.getCell(3);
        c3.value = item.box_serial;

        [c1, c2, c3].forEach(c => {
            c.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
            c.alignment = { horizontal: "center" };
        });
    });

    sheet.getColumn(1).width = 20;
    sheet.getColumn(2).width = 30;
    sheet.getColumn(3).width = 20;
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const safeName = attachment.area.replace(/[^a-zA-Z0-9]/g, "_");
  const typeName = type === 'PLN' ? 'Lampiran_PLN' : 'Lampiran_MIMS';
  const fileName = `${typeName}_${safeName}_${attachment.nomor}.xlsx`;

  saveAs(blob, fileName);
}
