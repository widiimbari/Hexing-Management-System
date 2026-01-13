"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, Search, Clock, Download, Upload, 
  Archive, ShoppingCart, CalendarIcon
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { 
  format, startOfDay, endOfDay, startOfWeek, endOfWeek, 
  startOfMonth, endOfMonth, startOfYear, endOfYear
} from "date-fns";
import { RequestDialog } from "./components/request-dialog";
import { SettlementDialog } from "./components/settlement-dialog";
import { ConsumableImportExportDialog } from "./components/consumable-import-export-dialog";
import { BulkSettlementDialog } from "./components/bulk-settlement-dialog";
import { UsageDialog } from "./components/usage-dialog";
import { UsageHistoryDialog } from "./components/usage-history-dialog";
import { exportRequestToExcel } from "./components/export-excel";
import { exportRequestToPDF } from "./components/export-pdf";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { AlertModal } from "@/components/ui/alert-modal";
import { MessageDialog } from "@/components/ui/message-dialog";
import { ImageViewDialog } from "@/components/ui/image-view-dialog";
import { getRequestColumns, getInventoryColumns } from "./components/columns";
import { ExpandedRow } from "./components/expanded-row";

export default function ConsumablesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [requestOpen, setRequestOpen] = useState(false);
  const [settleOpen, setSettleOpen] = useState(false);
  const [bulkSettleOpen, setBulkSettleOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(false);
  const [importMode, setImportMode] = useState<'import' | 'export' | null>(null);
  const [usageOpen, setUsageOpen] = useState(false);
  const [usageHistoryOpen, setUsageHistoryOpen] = useState(false);
  const [imageViewOpen, setImageViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

  const [deleteAlert, setDeleteAlert] = useState<{ open: boolean, data: any }>({ open: false, data: null });
  const [msg, setMsg] = useState({ open: false, title: "", desc: "" });

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [selectedItemForUsage, setSelectedItemForUsage] = useState<any>(null);
  const [selectedItemForHistory, setSelectedItemForHistory] = useState<any>(null);
  const [selectedDocForBulk, setSelectedDocForBulk] = useState<any>(null);
  const [expandedDocNumber, setExpandedDocNumber] = useState<string | null>(null);

  const [reqPag, setReqPag] = useState({ pageIndex: 0, pageSize: 10 });
  const [invPag, setInvPag] = useState({ pageIndex: 0, pageSize: 10 });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [iRes, dRes] = await Promise.all([
        fetch(`/api/assets/consumables?search=${debouncedSearch}`),
        fetch(`/api/assets/consumables/documents`)
      ]);
      const iResult = await iRes.json(), dResult = await dRes.json();
      setItems(iResult.data || []); setDocuments(dResult.data || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  }, [debouncedSearch]);

  useEffect(() => {
    const updateSelected = (state: any, setState: any) => {
        if (!state) return;
        const updated = items.find(i => i.id === state.id);
        if (updated && JSON.stringify(updated) !== JSON.stringify(state)) setState(updated);
    };
    updateSelected(selectedItemForUsage, setSelectedItemForUsage);
    updateSelected(selectedItemForHistory, setSelectedItemForHistory);
  }, [items, selectedItemForUsage, selectedItemForHistory]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDatePreset = (p: string) => {
    const now = new Date(); let from, to;
    if (p === 'daily') { from = startOfDay(now); to = endOfDay(now); }
    else if (p === 'weekly') { from = startOfWeek(now, { weekStartsOn: 1 }); to = endOfWeek(now, { weekStartsOn: 1 }); }
    else if (p === 'monthly') { from = startOfMonth(now); to = endOfMonth(now); }
    else if (p === 'yearly') { from = startOfYear(now); to = endOfYear(now); }
    else { setDateRange(undefined); return; }
    setDateRange({ from, to });
  };

  const onConfirmDelete = async () => {
    if (!deleteAlert.data) return;
    setLoading(true);
    try {
      const res = await fetch(deleteAlert.data.type === 'document' 
        ? `/api/assets/consumables/documents?doc_no=${encodeURIComponent(deleteAlert.data.id)}`
        : `/api/assets/consumables/${deleteAlert.data.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).message || "Failed to delete");
      await fetchData(); setDeleteAlert({ open: false, data: null });
    } catch (err: any) { setMsg({ open: true, title: "Error", desc: err.message || "Failed to delete" }); }
    finally { setLoading(false); }
  };

  const handleImport = async (file: File) => {
    const formData = new FormData(); formData.append('file', file);
    try {
      const res = await fetch('/api/assets/consumables/import', { method: 'POST', body: formData });
      const result = await res.json();
      if (!res.ok) return { success: false, message: result.message || "Failed to import", errors: result.errors || [] };
      fetchData(); return { success: true, message: result.message };
    } catch (err: any) { return { success: false, message: err.message || "Failed to import" }; }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch('/api/assets/consumables/template');
      if (!response.ok) throw new Error('Failed to download template');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "Template_Import_Consumables.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading template:', error);
      throw error;
    }
  };

  const filterByDate = (d?: string) => {
      if (!dateRange?.from || !dateRange?.to || !d) return true;
      const date = new Date(d); return date >= startOfDay(dateRange.from) && date <= endOfDay(dateRange.to);
  };

  const filteredDocs = useMemo(() => documents.filter(d => filterByDate(d.request_date)), [documents, dateRange]);
  const compData = useMemo(() => items.filter(d => d.status === "COMPLETED" && filterByDate(d.settlement_date)), [items, dateRange]);

  const pDocs = useMemo(() => filteredDocs.slice(reqPag.pageIndex * reqPag.pageSize, (reqPag.pageIndex + 1) * reqPag.pageSize), [filteredDocs, reqPag]);
  const pInv = useMemo(() => compData.slice(invPag.pageIndex * invPag.pageSize, (invPag.pageIndex + 1) * invPag.pageSize), [compData, invPag]);

  const reqCols = getRequestColumns({
    expandedDocNumber, 
    handleBulkSettle: (doc) => { setSelectedDocForBulk(doc); setBulkSettleOpen(true); }, 
    handlePrintDocument: (doc) => exportRequestToPDF(doc, items).catch(e => setMsg({open: true, title: "Error", desc: e.message})), 
    handlePrintDocumentExcel: (doc) => exportRequestToExcel(doc, items).catch(e => setMsg({open: true, title: "Error", desc: e.message})), 
    handleDeleteDocument: (id) => setDeleteAlert({ open: true, data: { type: 'document', id, name: id } })
  });

  const invCols = getInventoryColumns({
    handleViewHistory: (item) => { setSelectedItemForHistory(item); setUsageHistoryOpen(true); }, 
    handleUse: (item) => { setSelectedItemForUsage(item); setUsageOpen(true); }, 
    handleDeleteItem: (id, name) => setDeleteAlert({ open: true, data: { type: 'item', id, name } }), 
    handleViewImage: (src, alt) => { setSelectedImage({ src, alt }); setImageViewOpen(true); }
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2"><Archive className="h-8 w-8 text-primary" /> Non-SAP Assets</h1>
          <p className="text-muted-foreground">Manage purchase requests and monthly reporting.</p>
        </div>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <div className="flex justify-between items-center mb-4">
            <TabsList>
                <TabsTrigger value="requests" className="flex gap-2"><ShoppingCart className="h-4 w-4" /> Purchase Requests</TabsTrigger>
                <TabsTrigger value="inventory" className="flex gap-2"><Archive className="h-4 w-4" /> Consumables Inventory</TabsTrigger>
            </TabsList>
            <div className="flex gap-2 items-center">
                <Select onValueChange={handleDatePreset}><SelectTrigger className="w-[130px]"><SelectValue placeholder="Quick Filter" /></SelectTrigger>
                    <SelectContent><SelectItem value="all_time">All Time</SelectItem><SelectItem value="daily">Daily</SelectItem><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="yearly">Yearly</SelectItem></SelectContent>
                </Select>
                <Popover><PopoverTrigger asChild><Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{dateRange?.from ? (dateRange.to ? <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</> : format(dateRange.from, "LLL dd, y")) : <span>Pick a date range</span>}</Button></PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end"><Calendar initialFocus mode="range" defaultMonth={dateRange?.from} selected={dateRange} onSelect={setDateRange} numberOfMonths={2} /></PopoverContent>
                </Popover>
            </div>
        </div>

        <TabsContent value="requests"><Card className="shadow-md border-none overflow-hidden"><CardContent className="p-0">
                <div className="p-4 border-b bg-amber-50/50 flex items-center gap-2 text-amber-700"><Clock className="h-4 w-4" /><span className="text-sm font-medium">Request Documents Overview</span>
                     <div className="ml-auto flex items-center gap-2"><div className="relative max-w-xs w-full"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-white" /></div>
                        <Button variant="outline" onClick={() => { setImportMode('import'); setImportExportOpen(true); }}><Upload className="mr-2 h-4 w-4" /> Import</Button>
                        <Button onClick={() => setRequestOpen(true)}><PlusCircle className="mr-2 h-4 w-4" /> New Request</Button>
                    </div></div>
                <DataTable columns={reqCols} data={pDocs} loading={loading} expandedRowRender={(row) => <ExpandedRow doc={row} items={items} onSettle={(item) => { setSelectedRequest(item); setSettleOpen(true); }} onDelete={(id, name) => setDeleteAlert({ open: true, data: { type: 'item', id, name } })} onViewImage={(src, alt) => { setSelectedImage({ src, alt }); setImageViewOpen(true); }} />} onRowClick={(row) => setExpandedDocNumber(expandedDocNumber === row.document_number ? null : row.document_number)} pagination={{ pageIndex: reqPag.pageIndex, pageSize: reqPag.pageSize, rowCount: filteredDocs.length, onPageChange: (i) => setReqPag(p => ({ ...p, pageIndex: i })), onPageSizeChange: (s) => setReqPag({ pageIndex: 0, pageSize: s }), }} />
        </CardContent></Card></TabsContent>

        <TabsContent value="inventory"><Card className="shadow-md border-none overflow-hidden"><CardContent className="p-0">
                <div className="p-4 border-b bg-slate-50/50 flex items-center gap-2 text-slate-700"><Archive className="h-4 w-4" /><span className="text-sm font-medium">Realized Inventory - Completed Transactions</span>
                     <div className="ml-auto flex items-center gap-2"><div className="relative max-w-xs w-full"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search inventory..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-white" /></div>
                        <Button variant="outline" onClick={() => { setImportMode('export'); setImportExportOpen(true); }}><Download className="mr-2 h-4 w-4" /> Export Report</Button>
                    </div></div>
                <DataTable columns={invCols} data={pInv} loading={loading} pagination={{ pageIndex: invPag.pageIndex, pageSize: invPag.pageSize, rowCount: compData.length, onPageChange: (i) => setInvPag(p => ({ ...p, pageIndex: i })), onPageSizeChange: (s) => setInvPag({ pageIndex: 0, pageSize: s }), }} />
        </CardContent></Card></TabsContent>
      </Tabs>

      <RequestDialog open={requestOpen} onOpenChange={setRequestOpen} onSave={fetchData} />
      <SettlementDialog open={settleOpen} onOpenChange={setSettleOpen} request={selectedRequest} onSave={fetchData} />
      <BulkSettlementDialog open={bulkSettleOpen} onOpenChange={setBulkSettleOpen} documentNumber={selectedDocForBulk?.document_number} items={items.filter(i => i.document_number === selectedDocForBulk?.document_number)} onSave={fetchData} />
      <UsageDialog open={usageOpen} onOpenChange={setUsageOpen} item={selectedItemForUsage} onSave={fetchData} />
      <UsageHistoryDialog open={usageHistoryOpen} onOpenChange={setUsageHistoryOpen} item={selectedItemForHistory} />
      <ConsumableImportExportDialog isOpen={importExportOpen} onClose={() => setImportExportOpen(false)} onImport={handleImport} onDownloadTemplate={handleDownloadTemplate} loading={loading} initialMode={importMode} items={items} dateRange={dateRange} />
      <ImageViewDialog open={imageViewOpen} onOpenChange={setImageViewOpen} src={selectedImage?.src || null} alt={selectedImage?.alt} />
      <AlertModal isOpen={deleteAlert.open} onClose={() => setDeleteAlert({ ...deleteAlert, open: false })} onConfirm={onConfirmDelete} loading={loading} title="Are you sure?" description={deleteAlert.data?.type === 'document' ? `Permanently delete document "${deleteAlert.data.id}" and its items?` : `Permanently delete item "${deleteAlert.data?.name}"?`} />
      <MessageDialog isOpen={msg.open} onClose={() => setMsg({ ...msg, open: false })} title={msg.title} description={msg.desc} />
    </div>
  );
}