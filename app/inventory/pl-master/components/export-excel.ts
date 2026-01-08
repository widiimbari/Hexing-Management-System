import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import QRCode from "qrcode";

interface ProductData {
  serial: string;
  orderno: string;
  no?: number;
}

interface AttachmentData {
  nomor: string;
  type: string;
  timestamp: string;
  tgl_order: string;
  area: string;
  no_do: string;
  no_order: string;
  no_stiker?: string;
  total_unit?: number;
}

export async function generateExcel(
  attachment: AttachmentData,
  products: ProductData[],
  prefix: string,
  filenameSuffix?: string,
  useApi: boolean = false,
  highlightSerials: string[] = []
) {
  console.log(`Generating Excel for ${products.length} products. useApi: ${useApi}`);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Packing List", {
    pageSetup: {
      paperSize: 9, // A4
      orientation: "landscape", // Changed from portrait
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0, // Auto height
      margins: {
        left: 0.3, right: 0.3, top: 0.3, bottom: 0.3, header: 0, footer: 0,
      },
    },
  });

  // ---  SETUP KOLOM ---
  const columns = [];
  const lebarAwalNo = 5; // Lebar dasar untuk kolom No ditingkatkan dari 4 ke 5

  for (let i = 0; i < 5; i++) {
    
    const lebarNoDinamis = lebarAwalNo + i;

    columns.push({ width: lebarNoDinamis }); // 1. Kolom No (Makin ke kanan makin lebar)
    columns.push({ width: 19 });             // 2. Kolom Serial (Tetap)
    columns.push({ width: 8 });              // 3. Kolom QR (Tetap)
  }
  
  sheet.columns = columns;

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
        tl: { col: 0.9, row: 0.5 }, 
        ext: { width: 195, height: 75 }, 
        editAs: "oneCell"
      });
    }
  } catch (e) { console.error(e); }

  sheet.mergeCells("D1:H1");
  const cellPt = sheet.getCell("D1");
  cellPt.value = "PT. HEXING TECHNOLOGY";
  cellPt.font = { name: "Arial", size: 11, bold: true };
  cellPt.alignment = { vertical: "middle", horizontal: "left" };

  sheet.mergeCells("D2:H2"); sheet.getCell("D2").value = "Kawasan Industri Mitrakarawang,"; sheet.getCell("D2").font = fontRegular;
  sheet.mergeCells("D3:H3"); sheet.getCell("D3").value = "Jl. Mitra Timur II Blok D-24 Karawang-Indonesia"; sheet.getCell("D3").font = fontRegular;
  sheet.mergeCells("D4:H4"); sheet.getCell("D4").value = "Phone: (0267) 8610077, Fax: (0267) 8610078"; sheet.getCell("D4").font = fontRegular;

  // Tanda Tangan
  const setBorder = (c: string) => sheet.getCell(c).border = borderThin;
  sheet.mergeCells("J1:L1"); const cellSiap = sheet.getCell("J1"); cellSiap.value = "Disiapkan"; cellSiap.style = { font: fontRegular, alignment: alignCenter }; setBorder("J1");
  sheet.mergeCells("J2:L4"); setBorder("J2"); 
  sheet.mergeCells("M1:O1"); const cellPeriksa = sheet.getCell("M1"); cellPeriksa.value = "Diperiksa"; cellPeriksa.style = { font: fontRegular, alignment: alignCenter }; setBorder("M1");
  sheet.mergeCells("M2:O4"); setBorder("M2"); 

  // --- 3. INFO PENGIRIMAN ---
  const setInfoRow = (row: number, labelLeft: string, valLeft: string, labelRight?: string, valRight?: string) => {
    // Kiri: Label A-B
    sheet.mergeCells(`A${row}:B${row}`);
    const cellLabelLeft = sheet.getCell(`A${row}`);
    cellLabelLeft.value = labelLeft; cellLabelLeft.font = fontRegular; cellLabelLeft.numFmt = formatLabelColon; cellLabelLeft.alignment = { horizontal: "left", vertical: "middle" };

    // Kiri: Value C-H (Start from C)
    sheet.mergeCells(`C${row}:H${row}`); 
    const cellValLeft = sheet.getCell(`C${row}`);
    cellValLeft.value = valLeft; cellValLeft.font = fontRegular; cellValLeft.alignment = { horizontal: "left", vertical: "middle", indent: 1 };

    // Kanan
    if (labelRight) {
      sheet.mergeCells(`J${row}:K${row}`);
      const cellLabelRight = sheet.getCell(`J${row}`);
      cellLabelRight.value = labelRight; cellLabelRight.font = fontRegular; cellLabelRight.numFmt = formatLabelColon; cellLabelRight.alignment = { horizontal: "left", vertical: "middle" };

      // Kanan: Value L-O (Start from L)
      sheet.mergeCells(`L${row}:O${row}`);
      const cellValRight = sheet.getCell(`L${row}`);
      cellValRight.value = valRight; cellValRight.font = fontRegular; cellValRight.alignment = { horizontal: "left", vertical: "middle", indent: 1 };
    }
  };

  const startMeta = 6;
  const tglOrder = attachment.tgl_order ? new Date(attachment.tgl_order).toLocaleDateString('en-GB') : "-";
  setInfoRow(startMeta, "Tanggal Pengiriman", "", "No. Order", attachment.no_order || "-");
  setInfoRow(startMeta + 1, "No. Packing List", attachment.nomor, "Tanggal order", tglOrder);
  setInfoRow(startMeta + 2, "No. DO", attachment.no_do || "-", "No. Stiker", attachment.no_stiker || "-");
  setInfoRow(startMeta + 3, "Tipe Meter", attachment.type); 

  // Area Info
  const areaRow = startMeta + 3;
  sheet.mergeCells(`J${areaRow}:O${areaRow}`);
  const cellArea = sheet.getCell(`J${areaRow}`);
  const totalUnit = attachment.total_unit || products.length || 0;
  
  // Clean up area name for display if it contains part suffix
  const suffixForArea = filenameSuffix ? filenameSuffix.replace(/_/g, " ") : "";
  cellArea.value = `AREA : ${attachment.area}${suffixForArea}     ${totalUnit} UNIT`;
  
  cellArea.font = { name: "Arial", size: 10, bold: true };
  cellArea.alignment = { horizontal: "left", vertical: "middle" };

  sheet.addRow([]);

  // --- 4. HEADER TABEL ---
  const headerRow = sheet.getRow(11); headerRow.height = 20;
  for (let i = 0; i < 5; i++) {
    const base = i * 3 + 1;
    const c1 = headerRow.getCell(base);     c1.value = "No";
    const c2 = headerRow.getCell(base + 1); c2.value = "PLN Serial";
    const c3 = headerRow.getCell(base + 2); c3.value = "QR Code";
    [c1, c2, c3].forEach(cell => cell.style = { border: borderThin, alignment: alignCenter, font: fontBold });
  }

  // --- 5. ISI DATA (QR PRESISI & KECIL) ---
  const totalItems = products.length;
  const itemsPerLane = Math.ceil(totalItems / 5);
  const dataStartRow = 12;

  // Debugging logs for matching
  console.log("Highlighting Debug - First 5 external serials:", highlightSerials.slice(0, 5));
  
  // Pre-check matches
  let matchCount = 0;
  products.forEach(p => {
    if (highlightSerials.includes(String(p.serial).trim())) matchCount++;
  });
  console.log(`Highlighting Summary: Found ${matchCount} matches in ${products.length} products.`);

  for (let r = 0; r < itemsPerLane; r++) {
    // Non-blocking trick to avoid browser freeze
    if (r % 20 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    const currentRow = sheet.getRow(dataStartRow + r);
    currentRow.height = 45; 

    for (let lane = 0; lane < 5; lane++) {
      const dataIndex = r + (lane * itemsPerLane);
      if (dataIndex >= totalItems) continue;

      const item = products[dataIndex];
      const colBase = (lane * 3) + 1; 

      // Data Text
      const cellNo = currentRow.getCell(colBase);
      cellNo.value = item.no || (dataIndex + 1);
      cellNo.style = { border: borderThin, alignment: alignCenter, font: fontRegular };

      const topText = prefix || ""; 
      
      // Get year from product's orderno (e.g., "2025" -> "025")
      const orderYearMatch = item.orderno?.match(/20\d{2}/);
      const orderYear = orderYearMatch ? orderYearMatch[0] : new Date(attachment.tgl_order).getFullYear().toString();
      const yearSuffix = "0" + orderYear.slice(-2);
      
      const fullCode = `${topText}${yearSuffix}${item.serial}`;
      const cleanSerial = String(item.serial).trim();

      // Debug first few items
      if (dataIndex < 3) {
        console.log(`Checking Item ${dataIndex}: FullCode='${fullCode}', Serial='${cleanSerial}'`);
        console.log(`Match found? FullCode: ${highlightSerials.includes(fullCode)}, Serial: ${highlightSerials.includes(cleanSerial)}`);
      }
      
      const cellText = currentRow.getCell(colBase + 1);
      cellText.value = fullCode; // No newline, continuous text
      cellText.style = { border: borderThin, alignment: alignCenter, font: fontRegular };

      // Check for highlighting (Match either Full Code OR Raw Serial)
      if (highlightSerials.includes(fullCode) || highlightSerials.includes(cleanSerial)) {
        cellText.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF00" }, // Yellow
        };
      }

      const cellQR = currentRow.getCell(colBase + 2);
      cellQR.style = { border: borderThin, alignment: alignCenter };

      if (useApi) {
        // --- API Mode (Formula) ---
        // Uses Excel IMAGE function for better performance with large datasets
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(fullCode)}`;
        cellQR.value = { formula: `_xlfn.IMAGE("${qrUrl}")` }; 
      } else {
        // --- Local Mode (Embedded Image) ---
        try {
          const qrDataUrl = await QRCode.toDataURL(fullCode, {
            width: 60, margin: 0, errorCorrectionLevel: 'L',
          });

          const imageId = workbook.addImage({ base64: qrDataUrl, extension: "png" });

          // --- PERBAIKAN POSISI (CENTERING) ---
          sheet.addImage(imageId, {
            tl: { 
              col: (colBase + 2) - 1 + 0.8,  
              row: currentRow.number - 1 + 0.15 
            }, 
            ext: { width: 45, height: 45 }, 
            editAs: "oneCell"
          });
        } catch (err) {
          cellQR.value = "Err";
        }
      }
    }
  }

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    const safeName = attachment.area.replace(/[^a-zA-Z0-9]/g, "_");

    const fileName = `PL ${safeName}${filenameSuffix || ""}.xlsx`;

    // Use file-saver's saveAs which handles browser quirks better
    saveAs(blob, fileName);
  }

  