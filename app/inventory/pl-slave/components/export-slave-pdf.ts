import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";

interface SlaveProductData {
  serial: string;
  module_serial: string;
  orderno: string;
  box_serial: string;
  pallet_serial: string;
  no?: number;
}

interface SlaveAttachmentData {
  nomor: string;
  type: string;
  tgl_order: string;
  area: string;
  no_do: string;
  no_order: string;
}

export async function generateSlavePdf(
  type: 'PLN' | 'MIMS',
  attachment: SlaveAttachmentData,
  products: SlaveProductData[],
  prefix: string
) {
  if (type !== 'PLN') return;

  // Prevent UI freeze
  await new Promise(resolve => setTimeout(resolve, 100));

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
  doc.setFontSize(14); doc.setFont("helvetica", "bold");
  doc.text("PT. HEXING TECHNOLOGY", headerTextX, 10);
  doc.setFontSize(8); doc.setFont("helvetica", "normal");
  doc.text("Kawasan Industri Mitrakarawang,", headerTextX, 14);
  doc.text("Jl. Mitra Timur II Blok D-24 Karawang-Indonesia", headerTextX, 18);
  doc.text("Phone: (0267) 8610077, Fax: (0267) 8610078", headerTextX, 22);

  // --- SIGNATURE BOX (ENLARGED) ---
  const boxWidth = 50; 
  const boxHeight = 20; 
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
  let infoY = 35;
  const col1 = margin;
  const col2 = 50;
  const col3 = pageWidth - 110;
  const col4 = pageWidth - 60;
  const tglOrder = attachment.tgl_order ? new Date(attachment.tgl_order).toLocaleDateString('en-GB') : "-";
  
  doc.setFontSize(9);
  doc.text("Tanggal Pengiriman", col1, infoY); doc.text(`:`, col2 - 2, infoY); 
  doc.text("No. Order", col3, infoY); doc.text(`: ${attachment.no_order || "-"}`, col4, infoY);
  infoY += 4.5;
  doc.text("No. Packing List", col1, infoY); doc.text(`: ${attachment.nomor}`, col2 - 2, infoY);
  doc.text("Tanggal Order", col3, infoY); doc.text(`: ${tglOrder}`, col4, infoY);
  infoY += 4.5;
  doc.text("No. DO", col1, infoY); doc.text(`: ${attachment.no_do || "-"}`, col2 - 2, infoY);
  infoY += 4.5;
  doc.text("Tipe Meter", col1, infoY); doc.text(`: ${attachment.type}`, col2 - 2, infoY);
  doc.setFont("helvetica", "bold");
  doc.text(`AREA : ${attachment.area}     ${products.length} UNIT`, col3, infoY);
  
  // --- TABLE (4 Blocks Horizontal) ---
  const lanes = 4;
  const itemsPerLane = Math.ceil(products.length / lanes);
  const tableRows = [];
  const isHXM300 = attachment.type.includes("HXM300");

  const head = [];
  const blockHeaders = isHXM300 ? ["No", "Palet", "BigBox", "IMEI", "Serial"] : ["No", "Palet", "BigBox", "Serial", "PLN Serial"];
  for (let i = 0; i < lanes; i++) head.push(...blockHeaders);

  for (let r = 0; r < itemsPerLane; r++) {
    if (r % 200 === 0) await new Promise(resolve => setTimeout(resolve, 0)); // Yield to main thread
    const rowData = [];
    for (let lane = 0; lane < lanes; lane++) {
      const idx = r + (lane * itemsPerLane);
      if (idx < products.length) {
        const item = products[idx];
        const orderYearMatch = item.orderno?.match(/20\d{2}/);
        const orderYear = orderYearMatch ? orderYearMatch[0] : new Date(attachment.tgl_order).getFullYear().toString();
        const yearSuffix = "0" + orderYear.slice(-2);
        const fullCode = `${prefix}${yearSuffix}${item.serial}`;
        rowData.push(idx + 1, item.pallet_serial || "-", item.box_serial || "-", item.serial, isHXM300 ? item.module_serial : fullCode);
      } else { rowData.push("", "", "", "", ""); }
    }
    tableRows.push(rowData);
  }

  // Column Widths for 287mm content
  // 7 + 10 + 16 + 16 + 22.75 = 71.75mm per block.
  const colStyles: any = {};
  for(let i=0; i<lanes; i++) {
      const off = i * 5;
      colStyles[off] = { cellWidth: 8 };
      colStyles[off+1] = { cellWidth: 8 }; // Reduced to 8 (sacrificed)
      colStyles[off+2] = { cellWidth: 16 };
      colStyles[off+3] = { cellWidth: 16 };
      colStyles[off+4] = { cellWidth: 23.5 }; // Increased to 21.75
  }

  autoTable(doc, {
    startY: infoY + 6,
    head: [head],
    body: tableRows,
    theme: 'grid',
    styles: { fontSize: 6.5, cellPadding: 0.5, valign: 'middle', halign: 'center', lineWidth: 0.1, lineColor: [0, 0, 0] },
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold', lineWidth: 0.1 },
    margin: { left: margin, right: margin },
    columnStyles: colStyles,
    bodyStyles: { minCellHeight: 4.5 },
    rowPageBreak: 'avoid', 
  });

  const safeName = attachment.area.replace(/[^a-zA-Z0-9]/g, "_");
  const blob = doc.output('blob');
  saveAs(blob, `Lampiran_PLN_${safeName}_${attachment.nomor}.pdf`);
}
