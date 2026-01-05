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
) {
  console.log(`Generating Serial Excel for ${products.length} products.`);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Serial List");

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

  // Helper for full code generation
  const year = new Date(attachment.tgl_order).getFullYear();
  const yearSuffix = year.toString().slice(-3);
  const topText = prefix || "";

  // --- DATA ROWS ---
  products.forEach((p) => {
    const fullCode = `${topText}${yearSuffix}${p.serial}`;
    
    // Format timestamp
    const date = new Date(p.timestamp);
    const formattedDate = isNaN(date.getTime()) 
      ? "-" 
      : date.toLocaleString("id-ID", { 
          day: "2-digit", month: "2-digit", year: "numeric", 
          hour: "2-digit", minute: "2-digit", second: "2-digit" 
        });

    sheet.addRow([
      fullCode,
      p.serial,
      p.box_serial || "-",
      p.pallet_serial || "-",
      formattedDate
    ]);
  });

  // --- EXPORT ---
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
  const safeName = attachment.nomor.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `Serial_Export_${safeName}.xlsx`;

  saveAs(blob, fileName);
}
