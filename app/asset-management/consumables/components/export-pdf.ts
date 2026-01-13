import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

export const exportRequestToPDF = async (doc: any, items: any[]) => {
    const docItems = items.filter(i => i.document_number === doc.document_number);
    if (docItems.length === 0) throw new Error("No items found for this document");

    const itemsWithImages = await Promise.all(docItems.map(async (item: any) => {
        let base64Img = null;
        if (item.item_image) {
            try {
                const res = await fetch(item.item_image);
                const blob = await res.blob();
                base64Img = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });
            } catch (e) {
                console.warn("Failed to load image", e);
            }
        }
        return { ...item, base64Img };
    }));

    const pdf = new jsPDF({ orientation: "landscape", format: "a4" });
    const img = new Image();
    img.src = "/HEXING LOGO.png";

    return new Promise<void>((resolve, reject) => {
        const generate = () => {
            try {
                const pageWidth = pdf.internal.pageSize.getWidth();

                if (img.complete && img.naturalHeight !== 0) {
                     pdf.addImage(img, "PNG", 14, 10, 30, 10);
                }

                pdf.setFontSize(14);
                pdf.setFont("helvetica", "bold");
                pdf.text("FORMULIR PERMOHONAN PENYEDIAAN BARANG / JASA", pageWidth / 2, 20, { align: "center" });
                
                pdf.setFontSize(10);
                pdf.setFont("helvetica", "bold");
                pdf.text("Doc No", 14, 35);
                pdf.text(":", 30, 35); 
                pdf.setFont("helvetica", "normal");
                pdf.text(doc.document_number, 32, 35);

                pdf.setFont("helvetica", "bold");
                pdf.text("Tanggal", 14, 40);
                pdf.text(":", 30, 40);
                pdf.setFont("helvetica", "normal");
                pdf.text(format(new Date(doc.request_date), "dd MMMM yyyy"), 32, 40);

                let totalSubtotal = 0;

                const tableBody = itemsWithImages.map((item: any, index: number) => {
                    const qty = item.qty_estimated;
                    const price = parseFloat(item.price_estimated);
                    const subtotal = qty * price;
                    totalSubtotal += subtotal;

                    return [
                        index + 1,
                        item.item_name,
                        item.brand_type || "-",
                        qty,
                        "Unit",
                        new Intl.NumberFormat("id-ID").format(price),
                        "", // Placeholder Foto
                        item.remarks || "-",
                        new Intl.NumberFormat("id-ID").format(subtotal), // Subtotal moved to end
                    ];
                });

                const totalShipping = totalSubtotal * 0.03;
                const totalGrand = totalSubtotal + totalShipping;

                autoTable(pdf, {
                    startY: 45,
                    head: [["No", "Nama Barang", "Merk/Tipe", "Qty", "Satuan", "Harga Satuan (Est)", "Foto", "Keterangan", "Subtotal"]],
                    body: tableBody,
                    foot: [
                        [
                            { content: "Subtotal", colSpan: 8, styles: { halign: 'right', fontStyle: 'bold' } },
                            { content: new Intl.NumberFormat("id-ID").format(totalSubtotal), styles: { fontStyle: 'bold', halign: 'right' } }
                        ],
                        [
                            { content: "Fee (3%)", colSpan: 8, styles: { halign: 'right', fontStyle: 'bold' } },
                            { content: new Intl.NumberFormat("id-ID").format(totalShipping), styles: { fontStyle: 'bold', halign: 'right' } }
                        ],
                        [
                            { content: "GRAND TOTAL", colSpan: 8, styles: { halign: 'right', fontStyle: 'bold' } },
                            { content: new Intl.NumberFormat("id-ID").format(totalGrand), styles: { fontStyle: 'bold', halign: 'right' } }
                        ]
                    ],
                    theme: 'grid',
                    headStyles: { 
                        fillColor: [255, 255, 255], 
                        textColor: [0,0,0], 
                        valign: 'middle', 
                        halign: 'center',
                        lineWidth: 0.1,
                        lineColor: [0, 0, 0]
                    },
                    footStyles: { 
                        minCellHeight: 8, 
                        fillColor: [255, 255, 255], 
                        textColor: [0,0,0],
                        lineWidth: 0.1,
                        lineColor: [0, 0, 0]
                    },
                    styles: { 
                        fontSize: 9, 
                        textColor: [0,0,0], 
                        valign: 'middle', 
                        lineWidth: 0.1,
                        lineColor: [0, 0, 0]
                    },
                    columnStyles: {
                        0: { cellWidth: 10, halign: 'center' }, 
                        1: { cellWidth: 60 }, 
                        3: { halign: 'center' },
                        4: { halign: 'center' },
                        5: { cellWidth: 30, halign: 'right' }, // Harga Satuan (Increased from 25)
                        6: { cellWidth: 20, minCellHeight: 20 }, // Foto column at index 6
                        7: { cellWidth: 55 }, // Keterangan
                        8: { halign: 'right' } // Subtotal column at index 8
                    },
                    didDrawCell: (data) => {
                        if (data.section === 'body' && data.column.index === 6) { // Foto at index 6
                            const item = itemsWithImages[data.row.index];
                            if (item && item.base64Img) {
                                try {
                                    const imgSize = 15;
                                    const x = data.cell.x + (data.cell.width - imgSize) / 2;
                                    const y = data.cell.y + (data.cell.height - imgSize) / 2;
                                    pdf.addImage(item.base64Img, 'PNG', x, y, imgSize, imgSize);
                                } catch (e) { /* ignore */ }
                            }
                        }
                    }
                });

                const finalY = (pdf as any).lastAutoTable.finalY + 20;
                const colWidth = pageWidth / 3;
                pdf.setFontSize(10);
                pdf.text("Prepared By,", colWidth * 0.5, finalY, { align: "center" });
                pdf.text("Checked By,", colWidth * 1.5, finalY, { align: "center" });
                pdf.text("Approved By,", colWidth * 2.5, finalY, { align: "center" });
                pdf.text("( .................... )", colWidth * 0.5, finalY + 30, { align: "center" });
                pdf.text("( .................... )", colWidth * 1.5, finalY + 30, { align: "center" });
                pdf.text("( .................... )", colWidth * 2.5, finalY + 30, { align: "center" });

                pdf.save(`Request_${doc.document_number.replace(/[\/\\]/g, '-')}.pdf`);
                resolve();
            } catch (err) { reject(err); }
        };
        img.onload = generate;
        img.onerror = generate;
    });
};