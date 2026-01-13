import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export const exportRequestToExcel = async (doc: any, items: any[]) => {
    const docItems = items.filter(i => i.document_number === doc.document_number);
    if (docItems.length === 0) throw new Error("No items found for this document");

    const ExcelJS = (await import("exceljs")).default;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Request Form");

    sheet.pageSetup = { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, paperSize: 9 };

    try {
        const logoRes = await fetch('/HEXING LOGO.png');
        if (logoRes.ok) {
            const logoBlob = await logoRes.arrayBuffer();
            const logoId = workbook.addImage({ buffer: logoBlob, extension: 'png' });
            sheet.addImage(logoId, { tl: { col: 0.5, row: 0.2 }, ext: { width: 100, height: 35 } });
        }
    } catch (e) { console.warn("Could not add logo", e); }

    sheet.mergeCells('A1:I2'); 
    sheet.getCell('A1').value = "FORMULIR PERMOHONAN PENYEDIAAN BARANG / JASA";
    sheet.getCell('A1').font = { size: 14, bold: true };
    sheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };

    sheet.mergeCells('A4:B4');
    const docNoLabelCell = sheet.getCell('A4');
    docNoLabelCell.value = "Doc No";
    docNoLabelCell.font = { bold: true };
    docNoLabelCell.alignment = { vertical: 'middle', horizontal: 'left' };
    docNoLabelCell.numFmt = '@ * ":"'; 
    
    sheet.mergeCells('C4:E4');
    sheet.getCell('C4').value = doc.document_number;
    sheet.getCell('C4').alignment = { vertical: 'middle', horizontal: 'left' };

    sheet.mergeCells('A5:B5');
    const dateLabelCell = sheet.getCell('A5');
    dateLabelCell.value = "Tanggal";
    dateLabelCell.font = { bold: true };
    dateLabelCell.alignment = { vertical: 'middle', horizontal: 'left' };
    dateLabelCell.numFmt = '@ * ":"';

    sheet.mergeCells('C5:E5');
    sheet.getCell('C5').value = format(new Date(doc.request_date), "dd MMMM yyyy");
    sheet.getCell('C5').alignment = { vertical: 'middle', horizontal: 'left' };

    const headerRowIdx = 8;
    const headerRow = sheet.getRow(headerRowIdx);
    // Header Row: Subtotal at index 8 (Column I)
    headerRow.values = ["No", "Nama Barang", "Merk/Tipe", "Qty", "Satuan", "Harga Satuan (Est)", "Foto", "Keterangan", "Subtotal"];
    headerRow.font = { bold: true };
    headerRow.height = 25;
    headerRow.eachCell(cell => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E5E7EB' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    let totalSubtotal = 0;
    for (let index = 0; index < docItems.length; index++) {
        const item = docItems[index];
        const qty = item.qty_estimated;
        const price = parseFloat(item.price_estimated);
        const subtotal = qty * price;
        totalSubtotal += subtotal;

        const row = sheet.addRow([
            index + 1, 
            item.item_name, 
            item.brand_type, 
            qty, 
            "Unit", 
            price, 
            "", // Foto
            item.remarks || "-",
            subtotal // Subtotal at index 8
        ]);
        row.height = 55;
        row.eachCell(cell => {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.alignment = { vertical: 'middle' };
        });
        row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' }; 
        row.getCell(2).alignment = { wrapText: true, vertical: 'middle', horizontal: 'left' }; 
        row.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' }; 
        row.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' }; 
        row.getCell(9).alignment = { horizontal: 'right', vertical: 'middle' }; // Subtotal cell

        if (item.item_image) {
            try {
                const imgRes = await fetch(item.item_image);
                if (imgRes.ok) {
                    const imgBuffer = await imgRes.arrayBuffer();
                    const imageId = workbook.addImage({ buffer: imgBuffer, extension: 'png' });
                    // Foto is column 7 (index 6)
                    sheet.addImage(imageId, { tl: { col: 6.20, row: row.number - 1 + 0.1 }, ext: { width: 60, height: 60 }, editAs: 'oneCell' });
                }
            } catch (e) { console.warn("Failed to add image", e); }
        }
    }

    const totalShipping = totalSubtotal * 0.03;
    const totalGrand = totalSubtotal + totalShipping;
    const summaryStartRow = docItems.length + 9;
    
    const subRow = (idx: number, label: string, val: number, fill?: string) => {
        const r = sheet.getRow(idx);
        // Label across 0-7 (A-H), Value in 8 (I)
        sheet.mergeCells(`A${idx}:H${idx}`);
        r.getCell(1).value = label; r.getCell(1).font = { bold: true }; r.getCell(1).alignment = { horizontal: 'right' };
        r.getCell(9).value = val; r.getCell(9).numFmt = '#,##0';
        if (fill) { 
            r.eachCell(c => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } }; });
        }
    };
    subRow(summaryStartRow, "Subtotal", totalSubtotal);
    subRow(summaryStartRow + 1, "Fee (3%)", totalShipping);
    subRow(summaryStartRow + 2, "GRAND TOTAL", totalGrand, 'DCFCE7');

    const signRowIdx = summaryStartRow + 5;
    sheet.getCell(`B${signRowIdx}`).value = "Prepared By,";
    sheet.getCell(`E${signRowIdx}`).value = "Checked By,";
    sheet.getCell(`H${signRowIdx}`).value = "Approved By,";
    [`B${signRowIdx}`, `E${signRowIdx}`, `H${signRowIdx}`].forEach(c => {
        sheet.getCell(c).alignment = { horizontal: 'center' }; sheet.getCell(c).font = { bold: true };
    });
    
    sheet.columns = [
        { width: 5 },  // No
        { width: 35 }, // Item Name
        { width: 20 }, // Brand
        { width: 8 },  // Qty
        { width: 8 },  // Unit
        { width: 17 }, // Harga Satuan (Increased from 14)
        { width: 12 }, // Foto 
        { width: 35 }, // Keterangan 
        { width: 18 }  // Subtotal 
    ];
    ['F', 'I'].forEach(col => sheet.getColumn(col).numFmt = '#,##0');

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `Request_${doc.document_number.replace(/[\/\\]/g, '-')}.xlsx`; a.click(); a.remove();
};

export const exportMonthlyReport = async (items: any[], dateRange?: DateRange) => {
    if (!dateRange?.from || !dateRange?.to) throw new Error("Please select a date range first.");
    const ExcelJS = (await import("exceljs")).default;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Monthly Report");

    // A4 Landscape, fit to 1 page width
    sheet.pageSetup = { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, paperSize: 9 };

    // Add Hexing Logo
    try {
        const logoRes = await fetch('/HEXING LOGO.png');
        if (logoRes.ok) {
            const logoBlob = await logoRes.arrayBuffer();
            const logoId = workbook.addImage({ buffer: logoBlob, extension: 'png' });
            sheet.addImage(logoId, { tl: { col: 0.2, row: 0.2 }, ext: { width: 100, height: 35 } });
        }
    } catch (e) { console.warn("Could not add logo", e); }

    // Title - 10 columns (A-J) without Bukti
    sheet.mergeCells('A1:J2');
    sheet.getCell('A1').value = "PURCHASE REPORT (NON-SAP)";
    sheet.getCell('A1').font = { size: 16, bold: true };
    sheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };

    // Periode
    sheet.mergeCells('A3:J3');
    sheet.getCell('A3').value = `Periode: ${format(dateRange.from, "dd MMM yyyy")} - ${format(dateRange.to, "dd MMM yyyy")}`;
    sheet.getCell('A3').alignment = { horizontal: 'center' };

    // Header Row (without Bukti)
    const headerRowIdx = 5;
    const headerRow = sheet.getRow(headerRowIdx);
    headerRow.values = ["No", "Tgl Beli", "Item Name", "Brand/Type", "Qty", "Unit", "Harga Satuan (Real)", "Subtotal Barang", "Shipping & Handling (3%)", "GRAND TOTAL (IDR)"];
    headerRow.font = { bold: true };
    headerRow.height = 25;
    headerRow.eachCell((cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
        cell.font = { bold: true };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    });

    // Column widths (without Bukti)
    sheet.columns = [
        { key: 'no', width: 5 },
        { key: 'date', width: 12 },
        { key: 'item', width: 30 },
        { key: 'brand', width: 20 },
        { key: 'qty', width: 8 },
        { key: 'unit', width: 8 },
        { key: 'price', width: 18 },
        { key: 'subtotal', width: 18 },
        { key: 'shipping', width: 18 },
        { key: 'total', width: 18 },
    ];

    const completedItems = items.filter(d => {
        if (d.status !== "COMPLETED" || !d.settlement_date) return false;
        const date = new Date(d.settlement_date);
        return date >= dateRange.from! && date <= dateRange.to!;
    });

    let totalMonthly = 0, totalShipping = 0, totalGrand = 0;
    completedItems.forEach((d, index) => {
        const subtotal = parseFloat(d.subtotal_item || 0);
        const shipping = parseFloat(d.shipping_fee || 0);
        const grand = parseFloat(d.grand_total || 0);
        totalMonthly += subtotal;
        totalShipping += shipping;
        totalGrand += grand;

        const row = sheet.addRow([
            index + 1,
            d.settlement_date ? format(new Date(d.settlement_date), "dd-MMM") : "-",
            d.item_name,
            d.brand_type,
            d.qty_actual,
            "Unit",
            parseFloat(d.unit_price_real || 0),
            subtotal,
            shipping,
            grand
        ]);
        row.eachCell((cell) => {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.alignment = { vertical: 'middle' };
        });
        // Green background for calculated columns
        ['H', 'I', 'J'].forEach(col => {
            row.getCell(col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '90EE90' } };
        });
    });

    // Total Row with merge
    const totalRowIdx = headerRowIdx + completedItems.length + 1;
    sheet.mergeCells(`A${totalRowIdx}:G${totalRowIdx}`);
    const totalRowRef = sheet.getRow(totalRowIdx);
    totalRowRef.getCell(1).value = "TOTAL";
    totalRowRef.getCell(1).font = { bold: true };
    totalRowRef.getCell(1).alignment = { horizontal: 'right', vertical: 'middle' };
    totalRowRef.getCell(8).value = totalMonthly;
    totalRowRef.getCell(9).value = totalShipping;
    totalRowRef.getCell(10).value = totalGrand;
    totalRowRef.eachCell((cell) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle' };
    });
    totalRowRef.getCell(8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };
    totalRowRef.getCell(9).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };
    totalRowRef.getCell(10).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };

    // Number format for currency columns
    ['G', 'H', 'I', 'J'].forEach(col => sheet.getColumn(col).numFmt = '#,##0');

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Consumables_Report_${format(dateRange.from, "yyyyMMdd")}-${format(dateRange.to, "yyyyMMdd")}.xlsx`;
    a.click();
    a.remove();
};
