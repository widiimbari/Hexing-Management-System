"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, FileText, CheckCircle, Clock, Download, Upload, ExternalLink, ImageIcon, ShoppingCart, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";
import { format } from "date-fns";
import { RequestDialog } from "./components/request-dialog";
import { SettlementDialog } from "./components/settlement-dialog";
import { ConsumableImportDialog } from "./components/import-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ConsumablesPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [requestOpen, setRequestOpen] = useState(false);
  const [settleOpen, setSettleOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/assets/consumables?search=${debouncedSearch}`);
      const result = await res.json();
      setData(result.data || []);
    } catch (err) {
      console.error(err);
      setData([]);
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

  const pendingData = data.filter(d => d.status === "PENDING");
  const completedData = data.filter(d => d.status === "COMPLETED");

  const handleExportRequestForm = () => {
    if (pendingData.length === 0) {
        alert("No pending requests to export.");
        return;
    }

    const doc = new jsPDF();
    
    const img = new Image();
    img.src = "/HEXING LOGO.png";
    img.onload = () => {
        doc.addImage(img, "PNG", 14, 10, 30, 10);
        generatePDF(doc);
    };
    img.onerror = () => {
        generatePDF(doc);
    };

    const generatePDF = (doc: jsPDF) => {
        // Title
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("FORMULIR PERMOHONAN PENYEDIAAN BARANG / JASA", 105, 20, { align: "center" });
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Tanggal: ${format(new Date(), "dd MMMM yyyy")}`, 14, 35);
        doc.text(`Department: IT / Umum`, 14, 40); 

        // Table Data
        const tableBody = pendingData.map((item, index) => {
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

        // Calculate Totals
        const totalSubtotal = pendingData.reduce((acc, item) => acc + (item.qty_estimated * parseFloat(item.price_estimated)), 0);
        const totalShipping = totalSubtotal * 0.03;
        const totalGrand = totalSubtotal + totalShipping;

        autoTable(doc, {
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
            headStyles: { fillColor: [22, 163, 74] }, // Green-600
            styles: { fontSize: 8 },
        });

        // Signatures
        const finalY = (doc as any).lastAutoTable.finalY + 20;
        
        doc.setFontSize(10);
        doc.text("Prepared By,", 30, finalY);
        doc.text("Checked By,", 90, finalY);
        doc.text("Approved By,", 150, finalY);

        doc.line(20, finalY + 25, 60, finalY + 25);
        doc.line(80, finalY + 25, 120, finalY + 25);
        doc.line(140, finalY + 25, 180, finalY + 25);

        doc.text("( .................... )", 27, finalY + 30);
        doc.text("( .................... )", 87, finalY + 30);
        doc.text("( .................... )", 147, finalY + 30);

        doc.save(`Request_Form_${format(new Date(), "yyyyMMdd")}.pdf`);
    };
  };

  const handleExport = async () => {
    try {
      // Dynamic import to avoid SSR issues with some libs if any
      const ExcelJS = (await import("exceljs")).default;
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Monthly Report");

      // Add Title
      sheet.mergeCells('A1:K1');
      sheet.getCell('A1').value = "MONTHLY PURCHASE REPORT (NON-SAP)";
      sheet.getCell('A1').font = { size: 16, bold: true };
      sheet.getCell('A1').alignment = { horizontal: 'center' };

      sheet.mergeCells('A2:K2');
      sheet.getCell('A2').value = `Periode: ${format(new Date(), "MMMM yyyy")}`;
      sheet.getCell('A2').alignment = { horizontal: 'center' };

      // Set columns (Row 4)
      const headerRow = sheet.getRow(4);
      headerRow.values = [
        "No", "Tgl Beli", "Item Name", "Brand/Type", "Qty", "Unit", 
        "Harga Satuan (Real)", "Subtotal Barang", "Shipping & Handling (3%)", "GRAND TOTAL (IDR)", "Bukti"
      ];

      // Style header
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFF00' } // Yellow
        };
        cell.font = { bold: true };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        cell.alignment = { horizontal: 'center' };
      });

      // Columns Width
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
        { key: 'proof', width: 15 },
      ];

      // Add Data starting Row 5
      let totalMonthly = 0;
      let totalShipping = 0;
      let totalGrand = 0;

      data.filter(d => d.status === "COMPLETED").forEach((d, index) => {
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

        // Green background for calculation columns
        ['H', 'I', 'J'].forEach(col => {
            row.getCell(col).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '90EE90' } // Light Green
            };
        });
      });

      // Total Row
      const totalRow = sheet.addRow([
        "TOTAL BULANAN", "", "", "", "", "", "", 
        totalMonthly, totalShipping, totalGrand, ""
      ]);
      totalRow.font = { bold: true };
      
      // Formatting numbers
      sheet.getColumn('price').numFmt = '#,##0';
      sheet.getColumn('subtotal').numFmt = '#,##0';
      sheet.getColumn('shipping').numFmt = '#,##0';
      sheet.getColumn('total').numFmt = '#,##0';

      // Write Buffer
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

  const requestColumns: DataTableColumn<any>[] = [
    { 
        id: "request_date",
        header: "Req Date",
        cell: ({ row }) => format(new Date(row.request_date), "dd/MM/yyyy")
    },
    { 
        id: "item",
        header: "Item Name (Plan)",
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
        header: "Est. Qty",
        cell: ({ row }) => row.qty_estimated
    },
    { 
        id: "price",
        header: "Est. Price",
        cell: ({ row }) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(parseFloat(row.price_estimated))
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
            {row.item_image && (
                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                    <a href={row.item_image} target="_blank">
                        <ImageIcon className="h-4 w-4" />
                    </a>
                </Button>
            )}
            <Button size="sm" onClick={() => handleSettle(row)} className="bg-blue-600 hover:bg-blue-700">
                Purchase / Settle
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
                    <ShoppingCart className="h-4 w-4" /> Purchase Requests ({pendingData.length})
                </TabsTrigger>
                <TabsTrigger value="inventory" className="flex gap-2">
                    <Archive className="h-4 w-4" /> Consumables Inventory ({completedData.length})
                </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportRequestForm}>
                    <FileText className="mr-2 h-4 w-4" /> Export Request Form
                </Button>
                <Button variant="outline" onClick={handleExport}>
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
                     <span className="text-sm font-medium">Pending Requests - Waiting for Purchase/Settlement</span>
                     
                     <div className="relative max-w-xs w-full ml-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 bg-white"
                        />
                    </div>
                </div>
                <DataTable
                    columns={requestColumns}
                    data={pendingData}
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
    </div>
  );
}