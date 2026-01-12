"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, FileText, CheckCircle, Clock, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";
import { format } from "date-fns";
import { RequestDialog } from "./components/request-dialog";
import { SettlementDialog } from "./components/settlement-dialog";

export default function ConsumablesPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [requestOpen, setRequestOpen] = useState(false);
  const [settleOpen, setSettleOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/assets/consumables?search=${debouncedSearch}`);
      const result = await res.json();
      setData(result.data);
    } catch (err) {
      console.error(err);
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

  const columns: DataTableColumn<any>[] = [
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.status === "COMPLETED" ? "default" : "outline"} className={row.status === "COMPLETED" ? "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent" : "text-orange-500 border-orange-500"}>
          {row.status === "COMPLETED" ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
          {row.status}
        </Badge>
      )
    },
    { 
        id: "request_date",
        header: "Req Date",
        cell: ({ row }) => format(new Date(row.request_date), "dd/MM/yyyy")
    },
    { accessorKey: "item_name", header: "Item Name" },
    { accessorKey: "brand_type", header: "Brand/Type" },
    { 
        id: "qty",
        header: "Qty",
        cell: ({ row }) => row.status === "COMPLETED" ? row.qty_actual : `${row.qty_estimated} (Est)`
    },
    { 
        id: "total",
        header: "Grand Total",
        cell: ({ row }) => row.grand_total ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(parseFloat(row.grand_total)) : "-"
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        row.status === "PENDING" ? (
            <Button size="sm" onClick={() => handleSettle(row)}>
                Complete / Settle
            </Button>
        ) : (
            <span className="text-muted-foreground text-sm">Completed</span>
        )
      )
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" /> Non-SAP Assets (Consumables)
          </h1>
          <p className="text-muted-foreground">Manage purchase requests and monthly reporting.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
            <Button onClick={() => setRequestOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> New Request
            </Button>
        </div>
      </div>

      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-slate-50/50">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>
          </div>
          <DataTable
            columns={columns}
            data={data}
            loading={loading}
          />
        </CardContent>
      </Card>

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
    </div>
  );
}
