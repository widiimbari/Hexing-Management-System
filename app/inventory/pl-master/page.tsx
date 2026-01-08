"use client";

import { useState, useEffect } from "react";
import { attachment } from "@prisma/client";
import { PlusCircle, FileDown, ChevronDown, MoreHorizontal, Eye, Edit, Trash, ClipboardList } from "lucide-react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AttachmentForm } from "./components/attachment-form";
import { InputMeterDialog } from "./components/input-meter-dialog";
import { generateExcel } from "./components/export-excel";
import { generatePdf } from "./components/export-pdf";
import { MasterSlavesList } from "../pl-slave/components/master-slaves-list";
import { PLItemsViewer } from "../components/pl-items-viewer";
import { generateSerialExcel } from "./components/export-serial-excel";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRole } from "@/hooks/use-role";

// Helper function to fetch data on the client
type AttachmentWithCounts = attachment & {
  total: number;
  tersedia: number;
};

export default function PLMasterPage() {
  const { role } = useRole();
  const [data, setData] = useState<AttachmentWithCounts[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination State for DataTable
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Dialog States
  const [inputMeterOpen, setInputMeterOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<{id: number, nomor: string, type: string} | null>(null);
  const [exportingId, setExportingId] = useState<number | null>(null);

  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [splitAttachmentId, setSplitAttachmentId] = useState<number | null>(null);
  const [splitChunkSize, setSplitChunkSize] = useState<string>("5000");
  const [splitProgress, setSplitProgress] = useState<string>("");
  const [exportProgress, setExportProgress] = useState<{stage: string, percentage: number} | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const [editingAttachment, setEditingAttachment] = useState<AttachmentWithCounts | null>(null);
  
  const [viewingAttachment, setViewingAttachment] = useState<AttachmentWithCounts | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Items Viewer State
  const [viewingItems, setViewingItems] = useState<AttachmentWithCounts | null>(null);
  const [isItemsViewOpen, setIsItemsViewOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: searchTerm,
      });
      const res = await fetch(`/api/attachments?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      setData(result.data);
      setRowCount(result.metadata.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, searchTerm]);

  const refreshData = () => {
    fetchData();
  };

  const handleInputMeterClick = (id: number, nomor: string, type: string) => {
    setSelectedAttachment({ id, nomor, type });
    setInputMeterOpen(true);
  };

  const fetchJimatekSerials = async () => {
    try {
      const res = await fetch("/api/qc-jimatek");
      if (!res.ok) return [];
      return await res.json();
    } catch (error) {
      return [];
    }
  };

  const handleExport = async (id: number, type: 'excel' | 'pdf' = 'excel') => {
    try {
      setExportingId(id);
      const response = await fetch(`/api/attachments/${id}/export-data`);
      if (!response.ok) throw new Error("Failed to fetch export data");
      
      const { attachment, products, prefix } = await response.json();
      
      if (!products || products.length === 0) {
        alert("No products found for this attachment. Please input meters first.");
        return;
      }

      const jimatekSerials = await fetchJimatekSerials();
      
      if (type === 'pdf') {
        setExportProgress({ stage: "Starting...", percentage: 0 });
        await generatePdf(attachment, products, prefix, undefined, jimatekSerials, (stage, percentage) => {
            setExportProgress({ stage, percentage });
        });
        setExportProgress(null);
      } else {
        await generateExcel(attachment, products, prefix, undefined, false, jimatekSerials);
      }
      
    } catch (error) {
      console.error("Export failed", error);
      alert("Export failed. Check console.");
    } finally {
      setExportingId(null);
      setExportProgress(null);
    }
  };

  const handleExportSerial = async (id: number) => {
    try {
      setExportingId(id);
      const response = await fetch(`/api/attachments/${id}/export-data`);
      if (!response.ok) throw new Error("Failed to fetch export data");
      
      const { attachment, products, prefix } = await response.json();
      
      if (!products || products.length === 0) {
        alert("No products found for this attachment.");
        return;
      }

      const jimatekSerials = await fetchJimatekSerials();
      await generateSerialExcel(attachment, products, prefix, jimatekSerials);
      
    } catch (error) {
      console.error("Export Serial failed", error);
      alert("Export failed. Check console.");
    } finally {
      setExportingId(null);
    }
  };

  const handleSplitExportClick = (id: number) => {
    setSplitAttachmentId(id);
    setSplitDialogOpen(true);
    setSplitProgress("");
  };

  const handleSplitExportExecute = async () => {
    if (!splitAttachmentId) return;

    try {
      setSplitProgress("Fetching data...");
      const response = await fetch(`/api/attachments/${splitAttachmentId}/export-data`);
      if (!response.ok) throw new Error("Failed to fetch export data");
      
      const { attachment, products, prefix } = await response.json();
      
      if (!products || products.length === 0) {
        alert("No products found for this attachment.");
        setSplitDialogOpen(false);
        return;
      }
      
      const total = products.length;
      const chunkSize = parseInt(splitChunkSize);
      const chunks = Math.ceil(total / chunkSize);

      const jimatekSerials = await fetchJimatekSerials();

      for (let i = 0; i < chunks; i++) {
        setSplitProgress(`Exporting part ${i + 1} of ${chunks}...`);
        const start = i * chunkSize;
        const end = start + chunkSize;
        const chunkProducts = products.slice(start, end);
        const suffix = ` (${String(i + 1).padStart(3, '0')})`;
        await generateExcel(attachment, chunkProducts, prefix, suffix, false, jimatekSerials);
        if (i < chunks - 1) await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setSplitDialogOpen(false);
    } catch (error) {
      console.error("Split export failed", error);
    } finally {
      setSplitProgress("");
    }
  };

  const confirmDelete = (id: number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      const response = await fetch(`/api/attachments/${itemToDelete}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setDeleteDialogOpen(false);
      refreshData();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (row: AttachmentWithCounts) => {
    setEditingAttachment(row);
    setIsAddOpen(true);
  };

  const handleView = (row: AttachmentWithCounts) => {
    setViewingAttachment(row);
    setIsViewOpen(true);
  };

  const handlePageChange = (newPageIndex: number) => {
      setPagination(prev => ({ ...prev, pageIndex: newPageIndex }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
      setPagination({ pageIndex: 0, pageSize: newPageSize });
  };

  // Define Columns
  const columns: DataTableColumn<AttachmentWithCounts>[] = [
    { 
      id: "no", 
      header: "No", 
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize),
      width: "50px"
    },
    { accessorKey: "nomor", header: "Nomor Attachment Master" },
    { accessorKey: "area", header: "Area" },
    { 
      accessorKey: "timestamp", 
      header: "Tanggal Attachment", 
      cell: ({ value }) => value ? new Date(value).toLocaleDateString("id-ID") : "-"
    },
    { 
      accessorKey: "tgl_order", 
      header: "Tanggal Test", 
      cell: ({ value }) => value ? new Date(value).toLocaleDateString("id-ID") : "-"
    },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "total", header: "Total" },
    { accessorKey: "tersedia", header: "Tersedia" },
    {
      id: "input_meter",
      header: "Input Meter",
      cell: ({ row }) => (role === "super_admin" || role === "admin") ? (
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            handleInputMeterClick(row.id, row.nomor, row.type);
          }}
        >
          Input Meter
        </Button>
      ) : null
    },
    {
      id: "export",
      header: "Export",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={exportingId === row.id}>
              {exportingId === row.id ? "Exporting..." : <><FileDown className="mr-2 h-4 w-4" /> Export <ChevronDown className="ml-1 h-3 w-3" /></>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExport(row.id, 'excel')}>Export Excel (QR)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport(row.id, 'pdf')}>Export PDF (QR)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportSerial(row.id)}>Export Serial</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSplitExportClick(row.id)}>Split Export</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    {
      id: "actions",
      header: "Actions",
      width: "80px",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {
                setViewingItems(row);
                setIsItemsViewOpen(true);
            }}>
                <Eye className="mr-2 h-4 w-4" /> View Items List
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleView(row)}><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
            {role === "super_admin" && (
              <>
                <DropdownMenuItem onClick={() => handleEdit(row)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => confirmDelete(row.id)} className="text-red-600 focus:text-red-600"><Trash className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="h-8 w-8 text-primary" /> PL Master
          </h1>
          <p className="text-muted-foreground">Manage and track master packing lists and their associated products.</p>
        </div>
      </div>
      
      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
            {(role === "super_admin" || role === "admin") && (
              <Button onClick={() => {
                setEditingAttachment(null);
                setIsAddOpen(true);
              }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add PL Master
              </Button>
            )}
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs bg-white"
            />
          </div>
          <DataTable 
            data={data}
            columns={columns}
            loading={loading}
            pagination={{
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
                rowCount: rowCount,
                onPageChange: handlePageChange,
                onPageSizeChange: handlePageSizeChange
            }}
          />
        </CardContent>
      </Card>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingAttachment ? "Edit PL Master" : "Create New PL Master"}</DialogTitle>
            <DialogDescription>
              {editingAttachment ? "Update the details of the existing PL Master." : "Fill in the form below to create a new Master Packing List."}
            </DialogDescription>
          </DialogHeader>
          <AttachmentForm initialData={editingAttachment} onSuccess={() => { setIsAddOpen(false); refreshData(); }} />
        </DialogContent>
      </Dialog>

      <InputMeterDialog isOpen={inputMeterOpen} onClose={() => setInputMeterOpen(false)} attachmentId={selectedAttachment?.id || null} nomor={selectedAttachment?.nomor || ""} type={selectedAttachment?.type || ""} mode="master" onSuccess={() => { refreshData(); }} />

      <Dialog open={splitDialogOpen} onOpenChange={setSplitDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Split Export Configuration</DialogTitle>
            <DialogDescription>
              Configure how you want to split the export into multiple files.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chunk-size" className="text-right">Split Size</Label>
              <Input id="chunk-size" type="number" value={splitChunkSize} onChange={(e) => setSplitChunkSize(e.target.value)} className="col-span-3" />
            </div>
            {splitProgress && <div className="text-center text-sm text-muted-foreground animate-pulse">{splitProgress}</div>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSplitDialogOpen(false)} disabled={!!splitProgress}>Cancel</Button>
            <Button onClick={handleSplitExportExecute} disabled={!!splitProgress}>{splitProgress ? "Exporting..." : "Start Export"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the attachment and all associated products.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>View PL Master Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected PL Master.
            </DialogDescription>
          </DialogHeader>
          {viewingAttachment && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div><Label className="font-bold">Nomor</Label><p>{viewingAttachment.nomor}</p></div>
              <div><Label className="font-bold">Type</Label><p>{viewingAttachment.type}</p></div>
              <div><Label className="font-bold">Area</Label><p>{viewingAttachment.area}</p></div>
              <div><Label className="font-bold">Tanggal Attachment</Label><p>{new Date(viewingAttachment.timestamp).toLocaleDateString("id-ID")}</p></div>
              <div><Label className="font-bold">Tanggal Test</Label><p>{new Date(viewingAttachment.tgl_order).toLocaleDateString("id-ID")}</p></div>
              <div><Label className="font-bold">Total Products</Label><p>{viewingAttachment.total}</p></div>
              <div><Label className="font-bold">Status</Label><p>{viewingAttachment.active ? "Active" : "Inactive"}</p></div>
            </div>
          )}
          {viewingAttachment && (
             <div className="border-t pt-4">
                <MasterSlavesList masterId={viewingAttachment.id} />
             </div>
          )}
          <DialogFooter><Button onClick={() => setIsViewOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isItemsViewOpen} onOpenChange={setIsItemsViewOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Items List: {viewingItems?.nomor}</DialogTitle>
            <DialogDescription>
              View all products, boxes, and pallets in this Packing List.
            </DialogDescription>
          </DialogHeader>
          {viewingItems && (
            <PLItemsViewer attachmentId={viewingItems.id} mode="master" />
          )}
          <DialogFooter>
            <Button onClick={() => setIsItemsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!exportProgress} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
                <DialogTitle>Generating PDF</DialogTitle>
                <DialogDescription>
                    Please wait while we process {exportProgress?.stage}...
                </DialogDescription>
            </DialogHeader>
            <div className="py-6 flex flex-col items-center gap-4">
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div 
                        className="bg-primary h-full transition-all duration-300 ease-out"
                        style={{ width: `${exportProgress?.percentage || 0}%` }}
                    />
                </div>
                <p className="text-sm font-medium text-slate-700">{exportProgress?.percentage}%</p>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}