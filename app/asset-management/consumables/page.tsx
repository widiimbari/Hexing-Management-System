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

    const pdf = new jsPDF();
    const img = new Image();
    img.src = "/HEXING LOGO.png";

    const generate = () => {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("FORMULIR PERMOHONAN PENYEDIAAN BARANG / JASA", 105, 20, { align: "center" });
        
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.text(`Doc No: ${doc.document_number}`, 14, 30);
        pdf.text(`Tanggal: ${format(new Date(doc.request_date), "dd MMMM yyyy")}`, 14, 35);
        pdf.text(`Department: IT / Umum`, 14, 40); 

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
                new Intl.NumberFormat("id-ID").format(total)
            ];
        });

        const totalSubtotal = docItems.reduce((acc: number, item: any) => acc + (item.qty_estimated * parseFloat(item.price_estimated)), 0);
        const totalShipping = totalSubtotal * 0.03;
        const totalGrand = totalSubtotal + totalShipping;

        autoTable(pdf, {
            startY: 45,
            head: [["No", "Nama Barang", "Merk/Tipe", "Qty", "Satuan", "Harga Satuan (Est)", "Subtotal", "Fee 3%", "Total"]],
            body: tableBody,
            foot: [[ 
                { content: "TOTAL ESTIMASI", colSpan: 6, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: new Intl.NumberFormat("id-ID").format(totalSubtotal), styles: { fontStyle: 'bold' } },
                { content: new Intl.NumberFormat("id-ID").format(totalShipping), styles: { fontStyle: 'bold' } },
                { content: new Intl.NumberFormat("id-ID").format(totalGrand), styles: { fontStyle: 'bold' } },
            ]],
            theme: 'grid',
            headStyles: { fillColor: [22, 163, 74] },
            styles: { fontSize: 8 },
        });

        const finalY = (pdf as any).lastAutoTable.finalY + 20;
        pdf.setFontSize(10);
        pdf.text("Prepared By,", 30, finalY);
        pdf.text("Checked By,", 90, finalY);
        pdf.text("Approved By,", 150, finalY);
        pdf.line(20, finalY + 25, 60, finalY + 25);
        pdf.line(80, finalY + 25, 120, finalY + 25);
        pdf.line(140, finalY + 25, 180, finalY + 25);
        pdf.text("( .................... )", 27, finalY + 30);
        pdf.text("( .................... )", 87, finalY + 30);
        pdf.text("( .................... )", 147, finalY + 30);

        pdf.save(`Request_${doc.document_number.replace(/[\]/g, '-')}.pdf`);
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

      sheet.mergeCells('A1:I1');
      sheet.getCell('A1').value = "FORMULIR PERMOHONAN PENYEDIAAN BARANG / JASA";
      sheet.getCell('A1').font = { size: 14, bold: true };
      sheet.getCell('A1').alignment = { horizontal: 'center' };

      sheet.getCell('A3').value = "Doc No:";
      sheet.getCell('B3').value = doc.document_number;
      sheet.getCell('A4').value = "Tanggal:";
      sheet.getCell('B4').value = format(new Date(doc.request_date), "dd MMMM yyyy");
      sheet.getCell('A5').value = "Department:";
      sheet.getCell('B5').value = "IT / Umum";

      const headerRow = sheet.getRow(7);
      headerRow.values = ["No", "Nama Barang", "Merk/Tipe", "Qty", "Satuan", "Harga Satuan (Est)", "Subtotal", "Fee 3%", "Total"];
      headerRow.font = { bold: true };
      headerRow.eachCell(cell => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E5E7EB' } };
        cell.alignment = { horizontal: 'center' };
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
            total
        ]);
        row.eachCell(cell => cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } });
      });

      const totalRow = sheet.addRow(["TOTAL ESTIMASI", "", "", "", "", "", totalSubtotal, totalShipping, totalGrand]);
      totalRow.font = { bold: true };
      totalRow.eachCell(cell => {
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };
      });

      const signRowIdx = docItems.length + 12;
      sheet.getCell(`A${signRowIdx}`).value = "Prepared By,";
      sheet.getCell(`D${signRowIdx}`).value = "Checked By,";
      sheet.getCell(`G${signRowIdx}`).value = "Approved By,";
      
      const nameRowIdx = docItems.length + 17;
      sheet.getCell(`A${nameRowIdx}`).value = "(....................)";
      sheet.getCell(`D${nameRowIdx}`).value = "(....................)";
      sheet.getCell(`G${nameRowIdx}`).value = "(....................)";

      sheet.columns = [
          { width: 5 }, { width: 30 }, { width: 20 }, { width: 8 }, { width: 8 }, 
          { width: 18 }, { width: 18 }, { width: 15 }, { width: 18 }
      ];
      ['F', 'G', 'H', 'I'].forEach(col => sheet.getColumn(col).numFmt = '#,##0');

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Request_${doc.document_number.replace(/[\]/g, '-')}.xlsx`;
      a.click();
      a.remove();

    } catch (err) {
        console.error(err);
        alert("Failed to export Excel");
    }
  };

  const handleExportReport = async () => {
    try {
      const ExcelJS = (await import("exceljs")).default;
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Monthly Report");

      sheet.mergeCells('A1:K1');
      sheet.getCell('A1').value = "MONTHLY PURCHASE REPORT (NON-SAP)";
      sheet.getCell('A1').font = { size: 16, bold: true };
      sheet.getCell('A1').alignment = { horizontal: 'center' };

      sheet.mergeCells('A2:K2');
      sheet.getCell('A2').value = `Periode: ${format(new Date(), "MMMM yyyy")}`;
      sheet.getCell('A2').alignment = { horizontal: 'center' };

      const headerRow = sheet.getRow(4);
      headerRow.values = ["No", "Tgl Beli", "Item Name", "Brand/Type", "Qty", "Unit", "Harga Satuan (Real)", "Subtotal Barang", "Shipping & Handling (3%)", "GRAND TOTAL (IDR)", "Bukti"];
      
      headerRow.eachCell((cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
        cell.font = { bold: true };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.alignment = { horizontal: 'center' };
      });

      sheet.columns = [
        { key: 'no', width: 5 }, { key: 'date', width: 12 }, { key: 'item', width: 30 }, { key: 'brand', width: 20 },
        { key: 'qty', width: 8 }, { key: 'unit', width: 8 }, { key: 'price', width: 18 }, { key: 'subtotal', width: 18 },
        { key: 'shipping', width: 18 }, { key: 'total', width: 18 }, { key: 'proof', width: 15 },
      ];

      const completedItems = items.filter(d => d.status === "COMPLETED");
      let totalMonthly = 0;
      let totalShipping = 0;
      let totalGrand = 0;

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
          grand,
          d.receipt_image ? { text: "Link", hyperlink: window.location.origin + d.receipt_image } : "-"
        ]);

        ['H', 'I', 'J'].forEach(col => {
            row.getCell(col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '90EE90' } };
        });
      });

      const totalRow = sheet.addRow(["TOTAL BULANAN", "", "", "", "", "", "", totalMonthly, totalShipping, totalGrand, ""]);
      totalRow.font = { bold: true };
      
      sheet.getColumn('price').numFmt = '#,##0';
      sheet.getColumn('subtotal').numFmt = '#,##0';
      sheet.getColumn('shipping').numFmt = '#,##0';
      sheet.getColumn('total').numFmt = '#,##0';

      const buffer = await workbook.xlsx.writeBuffer();
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
    { accessorKey: "item_name", header: "Item Name" },
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