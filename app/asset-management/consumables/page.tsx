"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, FileText, CheckCircle, Clock, Download, Upload, Eye, Archive, ShoppingCart, Printer, FileSpreadsheet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";
import { format } from "date-fns";
import { RequestDialog } from "./components/request-dialog";
import { SettlementDialog } from "./components/settlement-dialog";
import { ConsumableImportDialog } from "./components/import-dialog";
import { DocumentSheet } from "./components/document-sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ConsumablesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [requestOpen, setRequestOpen] = useState(false);
  const [settleOpen, setSettleOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [selectedDocNumber, setSelectedDocNumber] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [itemsRes, docsRes] = await Promise.all([
        fetch(`/api/assets/consumables?search=${debouncedSearch}`),
        fetch(`/api/assets/consumables/documents`)
      ]);

      const itemsResult = await itemsRes.json();
      const docsResult = await docsRes.json();

      setItems(itemsResult.data || []);
      setDocuments(docsResult.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSettle = (item: any) => {
    setSelectedRequest(item);
    setSettleOpen(true);
  };

  const handleViewDocument = (docNumber: string) => {
    setSelectedDocNumber(docNumber);
    setSheetOpen(true);
  };

  const handlePrintDocument = (doc: any) => {
    const docItems = items.filter(i => i.document_number === doc.document_number);
    if (docItems.length === 0) return;

    const pdf = new jsPDF({ orientation: "landscape", format: "a4" });
    const img = new Image();
    img.src = "/HEXING LOGO.png";

    const generate = () => {
        const pageWidth = pdf.internal.pageSize.getWidth();

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("FORMULIR PERMOHONAN PENYEDIAAN BARANG / JASA", pageWidth / 2, 20, { align: "center" });
        
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.text(`Doc No: ${doc.document_number}`, 14, 40);
        pdf.text(`Tanggal: ${format(new Date(doc.request_date), "dd MMMM yyyy")}`, 14, 45);

        const tableBody = docItems.map((item: any, index: number) => {
            const qty = item.qty_estimated;
            const price = parseFloat(item.price_estimated);
            const subtotal = qty * price;
            const shipping = subtotal * 0.03; 
            const total = subtotal + shipping;

            return [
                index + 1,
                item.item_name,
                item.brand_type || "-",
                qty,
                "Unit",
                new Intl.NumberFormat("id-ID").format(price),
                new Intl.NumberFormat("id-ID").format(subtotal),
                new Intl.NumberFormat("id-ID").format(shipping),
                new Intl.NumberFormat("id-ID").format(total),
                item.remarks || "-"
            ];
        });

        const totalSubtotal = docItems.reduce((acc: number, item: any) => acc + (item.qty_estimated * parseFloat(item.price_estimated)), 0);
        const totalShipping = totalSubtotal * 0.03;
        const totalGrand = totalSubtotal + totalShipping;

        autoTable(pdf, {
            startY: 55,
            head: [["No", "Nama Barang", "Merk/Tipe", "Qty", "Satuan", "Harga Satuan (Est)", "Subtotal", "Fee 3%", "Total", "Keterangan"]],
            body: tableBody,
            foot: [[ 
                { content: "TOTAL ESTIMASI", colSpan: 6, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: new Intl.NumberFormat("id-ID").format(totalSubtotal), styles: { fontStyle: 'bold' } },
                { content: new Intl.NumberFormat("id-ID").format(totalShipping), styles: { fontStyle: 'bold' } },
                { content: new Intl.NumberFormat("id-ID").format(totalGrand), colSpan: 2, styles: { fontStyle: 'bold' } }, // Span 2 to cover remarks
            ]],
            theme: 'grid',
            headStyles: { fillColor: [220, 220, 220], textColor: [0,0,0] },
            styles: { fontSize: 9, textColor: [0,0,0] },
            columnStyles: {
                0: { cellWidth: 10 }, 
                1: { cellWidth: 70 }, 
                9: { cellWidth: 40 }
            }
        });

        const finalY = (pdf as any).lastAutoTable.finalY + 20;
        
        const colWidth = pageWidth / 3;
        pdf.setFontSize(10);
        pdf.text("Prepared By,", colWidth * 0.5, finalY, { align: "center" });
        pdf.text("Checked By,", colWidth * 1.5, finalY, { align: "center" });
        pdf.text("Approved By,", colWidth * 2.5, finalY, { align: "center" });

        pdf.line(colWidth * 0.2, finalY + 25, colWidth * 0.8, finalY + 25);
        pdf.line(colWidth * 1.2, finalY + 25, colWidth * 1.8, finalY + 25);
        pdf.line(colWidth * 2.2, finalY + 25, colWidth * 2.8, finalY + 25);

        pdf.text("( .................... )", colWidth * 0.5, finalY + 30, { align: "center" });
        pdf.text("( .................... )", colWidth * 1.5, finalY + 30, { align: "center" });
        pdf.text("( .................... )", colWidth * 2.5, finalY + 30, { align: "center" });

        pdf.save(`Request_${doc.document_number.replace(/[\/\\]/g, '-')}.pdf`);
    };

    img.onload = () => {
        pdf.addImage(img, "PNG", 14, 10, 30, 10);
        generate();
    };
    img.onerror = () => generate();
  };

  const handlePrintDocumentExcel = async (doc: any) => {
    const docItems = items.filter(i => i.document_number === doc.document_number);
    if (docItems.length === 0) return;

    try {
      const ExcelJS = (await import("exceljs")).default;
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Request Form");

      // Fetch and Add Logo
      try {
        const logoRes = await fetch('/HEXING LOGO.png');
        if (logoRes.ok) {
            const logoBlob = await logoRes.arrayBuffer();
            const logoId = workbook.addImage({
                buffer: logoBlob,
                extension: 'png',
            });
            // Position logo at top-left
            sheet.addImage(logoId, {
                tl: { col: 0.2, row: 0.2 },
                ext: { width: 100, height: 35 }
            });
        }
      } catch (e) {
        console.warn("Could not add logo to excel", e);
      }

      // Title
      sheet.mergeCells('C1:I2'); 
      sheet.getCell('C1').value = "FORMULIR PERMOHONAN PENYEDIAAN BARANG / JASA";
      sheet.getCell('C1').font = { size: 14, bold: true };
      sheet.getCell('C1').alignment = { horizontal: 'center', vertical: 'middle' };

      // Info Section
      sheet.getCell('A4').value = "Doc No:";
      sheet.getCell('A4').font = { bold: true };
      sheet.mergeCells('B4:E4');
      sheet.getCell('B4').value = doc.document_number;
      sheet.getCell('B4').alignment = { horizontal: 'left' };

      sheet.getCell('A5').value = "Tanggal:";
      sheet.getCell('A5').font = { bold: true };
      sheet.mergeCells('B5:E5');
      sheet.getCell('B5').value = format(new Date(doc.request_date), "dd MMMM yyyy");

      // Header
      const headerRowIdx = 8;
      const headerRow = sheet.getRow(headerRowIdx);
      headerRow.values = ["No", "Nama Barang", "Merk/Tipe", "Qty", "Satuan", "Harga Satuan (Est)", "Subtotal", "Fee 3%", "Total", "Keterangan", "Link Pembelian"];
      headerRow.font = { bold: true };
      headerRow.height = 25;
      headerRow.eachCell(cell => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E5E7EB' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });

      let totalSubtotal = 0;
      let totalShipping = 0;
      let totalGrand = 0;

      docItems.forEach((item, index) => {
        const qty = item.qty_estimated;
        const price = parseFloat(item.price_estimated);
        const subtotal = qty * price;
        const shipping = subtotal * 0.03;
        const total = subtotal + shipping;

        totalSubtotal += subtotal;
        totalShipping += shipping;
        totalGrand += total;

        const row = sheet.addRow([
            index + 1,
            item.item_name,
            item.brand_type,
            qty,
            "Unit",
            price,
            subtotal,
            shipping,
            total,
            item.remarks || "-",
            item.purchase_link ? { text: "Link", hyperlink: item.purchase_link } : "-"
        ]);
        row.eachCell(cell => {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.alignment = { vertical: 'middle' };
        });
        row.getCell(1).alignment = { horizontal: 'center' }; // No
        row.getCell(4).alignment = { horizontal: 'center' }; // Qty
        row.getCell(5).alignment = { horizontal: 'center' }; // Unit
      });

      const totalRow = sheet.addRow(["TOTAL ESTIMASI", "", "", "", "", "", totalSubtotal, totalShipping, totalGrand, "", ""]);
      const totalRowIdx = totalRow.number;
      
      // Merge "TOTAL ESTIMASI" spanning A to F
      sheet.mergeCells(`A${totalRowIdx}:F${totalRowIdx}`);
      sheet.getCell(`A${totalRowIdx}`).alignment = { horizontal: 'right', vertical: 'middle' };
      
      totalRow.font = { bold: true };
      totalRow.eachCell(cell => {
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };
      });

      // Signatures
      const signRowIdx = docItems.length + 13;
      sheet.getCell(`B${signRowIdx}`).value = "Prepared By,";
      sheet.getCell(`E${signRowIdx}`).value = "Checked By,";
      sheet.getCell(`I${signRowIdx}`).value = "Approved By,"; // Adjusted column for spacing
      
      [`B${signRowIdx}`, `E${signRowIdx}`, `I${signRowIdx}`].forEach(cellAddr => {
          sheet.getCell(cellAddr).alignment = { horizontal: 'center' };
          sheet.getCell(cellAddr).font = { bold: true };
      });
      
      const nameRowIdx = docItems.length + 18;
      sheet.getCell(`B${nameRowIdx}`).value = "(....................)";
      sheet.getCell(`E${nameRowIdx}`).value = "(....................)";
      sheet.getCell(`I${nameRowIdx}`).value = "(....................)";
      
      [`B${nameRowIdx}`, `E${nameRowIdx}`, `I${nameRowIdx}`].forEach(cellAddr => {
          sheet.getCell(cellAddr).alignment = { horizontal: 'center' };
      });

      sheet.columns = [
          { width: 5 }, { width: 35 }, { width: 20 }, { width: 8 }, { width: 8 }, 
          { width: 18 }, { width: 18 }, { width: 15 }, { width: 18 }, { width: 25 }, { width: 15 }
      ];
      ['F', 'G', 'H', 'I'].forEach(col => sheet.getColumn(col).numFmt = '#,##0');

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Request_${doc.document_number.replace(/[\/\\]/g, '-')}.xlsx`;
      a.click();
      a.remove();

    } catch (err) {
        console.error(err);
        alert("Failed to export Excel");
    }
  };

  const handleExportReport = async () => {
    // ... (Keep existing report logic, minimal changes)
    // Just ensuring imports are correct
    try {
      const ExcelJS = (await import("exceljs")).default;
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Monthly Report");
      // ... (Rest of logic is fine)
      sheet.mergeCells('A1:K1');
      sheet.getCell('A1').value = "MONTHLY PURCHASE REPORT (NON-SAP)";
      // ...
      sheet.mergeCells('A2:K2');
      // ...
      const headerRow = sheet.getRow(4);
      headerRow.values = ["No", "Tgl Beli", "Item Name", "Brand/Type", "Qty", "Unit", "Harga Satuan (Real)", "Subtotal Barang", "Shipping & Handling (3%)", "GRAND TOTAL (IDR)", "Bukti"];
      // ...
      sheet.columns = [
        { key: 'no', width: 5 }, { key: 'date', width: 12 }, { key: 'item', width: 30 }, { key: 'brand', width: 20 },
        { key: 'qty', width: 8 }, { key: 'unit', width: 8 }, { key: 'price', width: 18 }, { key: 'subtotal', width: 18 },
        { key: 'shipping', width: 18 }, { key: 'total', width: 18 }, { key: 'proof', width: 15 },
      ];
      // ...
      const completedItems = items.filter(d => d.status === "COMPLETED");
      // ...
      completedItems.forEach((d, index) => {
         // ...
         const row = sheet.addRow([
            index + 1,
            d.settlement_date ? format(new Date(d.settlement_date), "dd-MMM") : "-",
            d.item_name,
            d.brand_type,
            d.qty_actual,
            "Unit",
            parseFloat(d.unit_price_real || 0),
            parseFloat(d.subtotal_item || 0),
            parseFloat(d.shipping_fee || 0),
            parseFloat(d.grand_total || 0),
            d.receipt_image ? { text: "Link", hyperlink: d.receipt_image } : "-"
         ]);
         // ...
      });
      // ...
      const buffer = await workbook.xlsx.writeBuffer();
      // ...
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Consumables_Report_${format(new Date(), "yyyy_MM")}.xlsx`;
      a.click();
      a.remove();
    } catch (err) {
        console.error(err);
        alert("Failed to export report");
    }
  };

  const documentColumns: DataTableColumn<any>[] = [
    {
        id: "doc_no",
        header: "Document No",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 font-medium text-slate-700">
                <FileText className="h-4 w-4 text-blue-600" />
                {row.document_number}
            </div>
        )
    },
    {
        id: "date",
        header: "Req Date",
        cell: ({ row }) => format(new Date(row.request_date), "dd MMMM yyyy")
    },
    {
        id: "stats",
        header: "Item Progress",
        width: "200px",
        cell: ({ row }) => {
            const percent = Math.round((row.completed_items / row.total_items) * 100) || 0;
            return (
                <div className="w-full">
                    <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                        <span>{row.completed_items} of {row.total_items} Items Bought</span>
                        <span>{percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full transition-all ${percent === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${percent}%` }} />
                    </div>
                </div>
            );
        }
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
            if (row.pending_items === 0 && row.total_items > 0) return <Badge className="bg-emerald-600 hover:bg-emerald-700">Completed</Badge>;
            if (row.completed_items > 0) return <Badge className="bg-blue-600 hover:bg-blue-700">Partial</Badge>;
            return <Badge variant="outline" className="text-amber-600 border-amber-600">Pending</Badge>;
        }
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleViewDocument(row.document_number)}>
                    <Eye className="mr-2 h-4 w-4" /> View
                </Button>
                <Button size="sm" variant="outline" onClick={() => handlePrintDocument(row)}>
                    <Printer className="mr-2 h-4 w-4" /> PDF
                </Button>
                <Button size="sm" variant="outline" onClick={() => handlePrintDocumentExcel(row)}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
                </Button>
            </div>
        )
    }
  ];

  const inventoryColumns: DataTableColumn<any>[] = [
    {
        id: "settle_date",
        header: "Purchase Date",
        cell: ({ row }) => row.settlement_date ? format(new Date(row.settlement_date), "dd/MM/yyyy") : "-"
    },
    { 
        id: "item",
        header: "Item Name",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.item_name}</span>
                {row.purchase_link && (
                    <a href={row.purchase_link} target="_blank" className="text-[10px] text-blue-500 flex items-center gap-1 hover:underline">
                        <ExternalLink className="w-2 h-2" /> Link Pembelian
                    </a>
                )}
            </div>
        )
    },
    { accessorKey: "brand_type", header: "Brand/Type" },
    {
        id: "qty",
        header: "Real Qty",
        cell: ({ row }) => row.qty_actual
    },
    {
        id: "unit_price",
        header: "Real Price",
        cell: ({ row }) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(parseFloat(row.unit_price_real))
    },
    {
        id: "total",
        header: "Grand Total",
        cell: ({ row }) => row.grand_total ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(parseFloat(row.grand_total)) : "-"
    },
    {
      id: "proof",
      header: "Proof",
      cell: ({ row }) => row.receipt_image ? (
          <Button size="sm" variant="outline" asChild>
            <a href={row.receipt_image} target="_blank">View Receipt</a>
          </Button>
      ) : <span className="text-muted-foreground">-</span>
    }
  ];

  const completedData = items.filter(d => d.status === "COMPLETED");

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" /> Non-SAP Assets
          </h1>
          <p className="text-muted-foreground">Manage purchase requests and monthly reporting.</p>
        </div>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <div className="flex justify-between items-center mb-4">
            <TabsList>
                <TabsTrigger value="requests" className="flex gap-2">
                    <ShoppingCart className="h-4 w-4" /> Purchase Requests
                </TabsTrigger>
                <TabsTrigger value="inventory" className="flex gap-2">
                    <Archive className="h-4 w-4" /> Consumables Inventory
                </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportReport}>
                    <Download className="mr-2 h-4 w-4" /> Export Report
                </Button>
                <Button variant="outline" onClick={() => setImportOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" /> Import Excel
                </Button>
                <Button onClick={() => setRequestOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Request
                </Button>
            </div>
        </div>

        <TabsContent value="requests">
            <Card className="shadow-md border-none overflow-hidden">
                <CardContent className="p-0">
                <div className="p-4 border-b bg-amber-50/50 flex items-center gap-2 text-amber-700">
                     <Clock className="h-4 w-4" />
                     <span className="text-sm font-medium">Request Documents Overview</span>
                     
                     <div className="relative max-w-xs w-full ml-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search documents..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 bg-white"
                        />
                    </div>
                </div>
                <DataTable
                    columns={documentColumns}
                    data={documents}
                    loading={loading}
                />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="inventory">
            <Card className="shadow-md border-none overflow-hidden">
                <CardContent className="p-0">
                <div className="p-4 border-b bg-slate-50/50 flex items-center gap-2 text-slate-700">
                     <CheckCircle className="h-4 w-4" />
                     <span className="text-sm font-medium">Realized Inventory - Completed Transactions</span>

                     <div className="relative max-w-xs w-full ml-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 bg-white"
                        />
                    </div>
                </div>
                <DataTable
                    columns={inventoryColumns}
                    data={completedData}
                    loading={loading}
                />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

      <RequestDialog 
        open={requestOpen} 
        onOpenChange={setRequestOpen} 
        onSave={fetchData} 
      />
      
      <SettlementDialog 
        open={settleOpen} 
        onOpenChange={setSettleOpen} 
        request={selectedRequest}
        onSave={fetchData} 
      />

      <ConsumableImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onImportSuccess={fetchData}
      />

      <DocumentSheet 
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        documentNumber={selectedDocNumber}
        data={items}
        onSettle={(item) => {
            setSheetOpen(false);
            handleSettle(item);
        }}
      />
    </div>
  );
}