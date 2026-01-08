import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { saveAs } from "file-saver";

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

const waitTick = () => new Promise(resolve => setTimeout(resolve, 50));

export async function generatePdf(
  attachment: AttachmentData,
  products: ProductData[],
  prefix: string,
  filenameSuffix?: string,
  highlightSerials: string[] = [],
  onProgress?: (stage: string, percentage: number) => void
) {
  if (onProgress) onProgress("Initializing PDF", 0);
  await waitTick(); // Prevent UI freeze at start

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 5;

  // --- HEADER ---
  try {
    const img = new Image();
    img.src = "/HEXING LOGO.png";
    await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
    });
    doc.addImage(img, "PNG", margin, 7, 35, 12);
  } catch (e) {
    console.error("Logo load failed", e);
  }

  const headerTextX = margin + 40;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PT. HEXING TECHNOLOGY", headerTextX, 10);
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Kawasan Industri Mitrakarawang,", headerTextX, 14);
  doc.text("Jl. Mitra Timur II Blok D-24 Karawang-Indonesia", headerTextX, 18);
  doc.text("Phone: (0267) 8610077, Fax: (0267) 8610078", headerTextX, 22);

  // --- SIGNATURE BOX (ENLARGED) ---
  const boxWidth = 50; // Increased to 50
  const boxHeight = 20; // Reduced to 20
  const signBoxX = pageWidth - margin - (boxWidth * 2);
  const signBoxY = 7;

  doc.setLineWidth(0.1);
  doc.rect(signBoxX, signBoxY, boxWidth, 7);
  doc.rect(signBoxX, signBoxY + 7, boxWidth, boxHeight - 7);
  doc.setFontSize(10);
  doc.text("Disiapkan", signBoxX + boxWidth / 2, signBoxY + 5, { align: "center" });

  doc.rect(signBoxX + boxWidth, signBoxY, boxWidth, 7);
  doc.rect(signBoxX + boxWidth, signBoxY + 7, boxWidth, boxHeight - 7);
  doc.text("Diperiksa", signBoxX + boxWidth + boxWidth / 2, signBoxY + 5, { align: "center" });

  // --- INFO SECTION ---
  let yPos = 35; // Adjusted starting Y
  const col1 = margin;
  const col2 = 50;
  const col3 = pageWidth - 110;
  const col4 = pageWidth - 60;

  const tglOrder = attachment.tgl_order ? new Date(attachment.tgl_order).toLocaleDateString('en-GB') : "-";
  const suffixForArea = filenameSuffix ? filenameSuffix.replace(/_/g, " ") : "";
  const totalUnit = attachment.total_unit || products.length || 0;

  doc.setFontSize(9);
  doc.text("Tanggal Pengiriman", col1, yPos); doc.text(`:`, col2 - 2, yPos); 
  doc.text("No. Order", col3, yPos); doc.text(`: ${attachment.no_order || "-"}`, col4, yPos);
  yPos += 4.5;
  doc.text("No. Packing List", col1, yPos); doc.text(`: ${attachment.nomor}`, col2 - 2, yPos);
  doc.text("Tanggal Order", col3, yPos); doc.text(`: ${tglOrder}`, col4, yPos);
  yPos += 4.5;
  doc.text("No. DO", col1, yPos); doc.text(`: ${attachment.no_do || "-"}`, col2 - 2, yPos);
  doc.text("No. Stiker", col3, yPos); doc.text(`: ${attachment.no_stiker || "-"}`, col4, yPos);
  yPos += 4.5;
  doc.text("Tipe Meter", col1, yPos); doc.text(`: ${attachment.type}`, col2 - 2, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(`AREA : ${attachment.area}${suffixForArea}     ${totalUnit} UNIT`, col3, yPos);
  doc.setFont("helvetica", "normal");

  // --- DATA PROCESSING (CHUNKED) ---
  const lanes = 5;
  const itemsPerLane = Math.ceil(products.length / lanes);
  const tableRows: any[] = [];
  const processedProducts: any[] = [];

  const CHUNK_SIZE = 20; 
  for (let i = 0; i < products.length; i += CHUNK_SIZE) {
    if (onProgress) onProgress("Generating QR Codes", Math.round((i / products.length) * 100));
    await waitTick();

    const chunk = products.slice(i, i + CHUNK_SIZE);
    const chunkPromises = chunk.map(async (p) => {
        const orderYearMatch = p.orderno?.match(/20\d{2}/);
        const orderYear = orderYearMatch ? orderYearMatch[0] : new Date(attachment.tgl_order).getFullYear().toString();
        const yearSuffix = "0" + orderYear.slice(-2);
        const fullCode = `${prefix || ""}${yearSuffix}${p.serial}`;
        const qrDataUrl = await QRCode.toDataURL(fullCode, { width: 100, margin: 0, errorCorrectionLevel: 'L' });
        return { ...p, fullCode, qrDataUrl };
    });
    const results = await Promise.all(chunkPromises);
    processedProducts.push(...results);
  }

  for (let r = 0; r < itemsPerLane; r++) {
    if (r % 100 === 0) await waitTick(); // Yield to main thread
    const rowData = [];
    const rowMeta = []; 
    for (let lane = 0; lane < lanes; lane++) {
      const idx = r + (lane * itemsPerLane);
      if (idx < processedProducts.length) {
        const item = processedProducts[idx];
        rowData.push(item.no || (idx + 1), item.fullCode, ""); 
        rowMeta.push({ highlight: highlightSerials.includes(item.fullCode) || highlightSerials.includes(String(item.serial).trim()) });
      } else {
        rowData.push("", "", "");
        rowMeta.push({ highlight: false });
      }
    }
    tableRows.push({ raw: rowData, meta: rowMeta });
  }

  const head = [];
  for (let i = 0; i < lanes; i++) head.push("No", "PLN Serial", "QR Code");

  // --- RENDER TABLE ---
  autoTable(doc, {
    startY: yPos + 6,
    head: [head],
    body: tableRows.map(r => r.raw),
    theme: 'grid',
    styles: {
      fontSize: 9, // Back to 9
      cellPadding: 0.5,
      valign: 'middle',
      halign: 'center',
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0]
    },
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold', lineWidth: 0.1 },
    margin: { left: margin, right: margin },
    columnStyles: {
      0: { cellWidth: 12 }, 1: { cellWidth: 32 }, 2: { cellWidth: 13 },
      3: { cellWidth: 12 }, 4: { cellWidth: 32 }, 5: { cellWidth: 13 },
      6: { cellWidth: 12 }, 7: { cellWidth: 32 }, 8: { cellWidth: 13 },
      9: { cellWidth: 12 }, 10: { cellWidth: 32 }, 11: { cellWidth: 13 },
      12: { cellWidth: 12 }, 13: { cellWidth: 32 }, 14: { cellWidth: 13 },
    },
    rowPageBreak: 'avoid', 
    bodyStyles: { minCellHeight: 14 }, 
    didDrawCell: (data: any) => {
      const rowIndex = data.row.index;
      const colIndex = data.column.index;
      const laneIndex = Math.floor(colIndex / 3);
      const meta = tableRows[rowIndex]?.meta[laneIndex];

      if (meta?.highlight && data.section === 'body' && colIndex % 3 === 1) { 
        doc.setFillColor(255, 255, 0);
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
        doc.text(data.cell.text, data.cell.x + data.cell.width/2, data.cell.y + data.cell.height/2, { align: 'center', baseline: 'middle' });
      }

      if (data.section === 'body' && colIndex % 3 === 2) {
         const itemIndex = rowIndex + (laneIndex * itemsPerLane);
         if (itemIndex < processedProducts.length) {
            const item = processedProducts[itemIndex];
            if (item && item.qrDataUrl) {
                const imgSize = 11; // INCREASED TO 11mm
                const xPos = data.cell.x + (data.cell.width - imgSize) / 2;
                const yPos = data.cell.y + (data.cell.height - imgSize) / 2;
                doc.addImage(item.qrDataUrl, 'PNG', xPos, yPos, imgSize, imgSize);
            }
         }
      }
    }
  });

  const safeName = attachment.area.replace(/[^a-zA-Z0-9]/g, "_");
  const blob = doc.output('blob');
  saveAs(blob, `PL_${safeName}${filenameSuffix || ""}.pdf`);
}