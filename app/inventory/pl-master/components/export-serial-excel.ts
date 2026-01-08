import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface ProductSerialData {
  serial: string;
  orderno: string;
  timestamp: string; // ISO string
  box_serial: string | null;
  pallet_serial: string | null;
}

interface AttachmentData {
  nomor: string;
  type: string;
  tgl_order: string; // ISO string
}

export async function generateSerialExcel(
  attachment: AttachmentData,
  products: ProductSerialData[],
  prefix: string,
  highlightSerials: string[] = [] // New parameter
) {
  console.log(`Generating Serial Excel for ${products.length} products.`);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Serial List", {
    pageSetup: {
      paperSize: 9, // A4
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0
    }
  });

  // --- HEADERS ---
  const headerRow = sheet.getRow(1);
  headerRow.values = ["PLN Serial", "Serial", "Box", "Pallet", "Waktu Produksi"];
  
  // Style Header
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center" };
    cell.border = { bottom: { style: "thin" } };
  });

  // Columns Width
  sheet.columns = [
    { width: 25 }, // PLN Serial
    { width: 20 }, // Serial
    { width: 20 }, // Box
    { width: 20 }, // Pallet
    { width: 25 }, // Waktu Produksi
  ];

  const topText = prefix || "";

  // --- DATA ROWS ---
  products.forEach((p) => {
    // Get year from product's orderno
    const orderYearMatch = p.orderno?.match(/20\d{2}/);
    const orderYear = orderYearMatch ? orderYearMatch[0] : new Date(attachment.tgl_order).getFullYear().toString();
    const yearSuffix = "0" + orderYear.slice(-2);

    const fullCode = `${topText}${yearSuffix}${p.serial}`;
    const cleanSerial = String(p.serial).trim();
    
    // Format timestamp
    const date = new Date(p.timestamp);
    const formattedDate = isNaN(date.getTime()) 
      ? "-" 
      : date.toLocaleString("id-ID", { 
          day: "2-digit", month: "2-digit", year: "numeric", 
          hour: "2-digit", minute: "2-digit", second: "2-digit" 
        });

    const row = sheet.addRow([
      fullCode,
      p.serial,
      p.box_serial || "-",
      p.pallet_serial || "-",
      formattedDate
    ]);

    // Apply Marking
    if (highlightSerials.includes(fullCode) || highlightSerials.includes(cleanSerial)) {
      // Highlight Full Row or just Serial Cells? Usually users prefer specific cells or row.
      // Let's highlight PLN Serial and Serial columns to match QR export style
      row.getCell(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF00" } }; // Yellow
      row.getCell(2).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF00" } };
    }
  });

  // --- EXPORT ---
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
  const safeName = attachment.nomor.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `Serial_Export_${safeName}.xlsx`;

  saveAs(blob, fileName);
}
