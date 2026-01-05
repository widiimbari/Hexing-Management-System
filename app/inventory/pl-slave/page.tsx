"use client";

import { useState, useEffect } from "react";
import { attachment, attachment2 } from "@prisma/client";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Attachment2Form } from "./components/attachment2-form";
import { InputMeterDialog } from "../pl-master/components/input-meter-dialog";
import { generateExcel } from "../pl-master/components/export-excel";
import { SlaveExportDialog } from "./components/slave-export-dialog";
import { generateSlaveExcel } from "./components/export-slave-excel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { PlusCircle, FilePlus, FileDown, ChevronDown, Eye, Edit, Trash, MoreHorizontal, FileSpreadsheet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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

type SlaveWithCounts = attachment2 & {
  total: number;
};

export default function PLSlavePage() {
  const { role } = useRole();
  const [viewMode, setViewMode] = useState<'masters' | 'slaves'>('masters');
  const [data, setData] = useState<any[]>([]); // Can be Master or Slave
  const [rowCount, setRowCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Search State
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedMaster, setSelectedMaster] = useState<AttachmentWithCounts | null>(null);
  const [slaveExportDialogOpen, setSlaveExportDialogOpen] = useState(false);
  const [selectedSlaveIdForExport, setSelectedSlaveIdForExport] = useState<number | null>(null);
  
  // Input Meter State
  const [inputMeterOpen, setInputMeterOpen] = useState(false);
  const [selectedSlaveForInput, setSelectedSlaveForInput] = useState<{id: number, nomor: string, type: string} | null>(null);

  // Edit/View/Delete State
  const [editingSlave, setEditingSlave] = useState<any>(null);
  const [viewingSlave, setViewingSlave] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exportingId, setExportingId] = useState<number | null>(null);
  
  // Pagination State for DataTable
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: debouncedSearchTerm,
      });

      let url = "/api/attachments2";
      if (viewMode === 'masters') {
        url = "/api/attachments";
        params.append("availableOnly", "true");
      }

      const res = await fetch(`${url}?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      
      setData(result.data || []);
      setRowCount(result.metadata?.total || 0);
    } catch (err) {
      console.error(err);
      setData([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [viewMode, pagination.pageIndex, pagination.pageSize, debouncedSearchTerm]);

  const refreshData = () => {
    fetchData();
  };

  const handleInputMeterClick = (id: number, nomor: string, type: string) => {
    setSelectedSlaveForInput({ id, nomor, type });
    setInputMeterOpen(true);
  };

  const handleCreateSlave = (master: AttachmentWithCounts) => {
      setSelectedMaster(master);
      setIsAddOpen(true);
  };

  const handleEditSlave = (row: any) => {
    setEditingSlave(row);
    setIsAddOpen(true);
  };

  const handleViewSlave = (row: any) => {
    setViewingSlave(row);
    setIsViewOpen(true);
  };

  const confirmDelete = (id: number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSlave = async () => {
    if (!itemToDelete) return;
    try {
      const response = await fetch(`/api/attachments2/${itemToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      setDeleteDialogOpen(false);
      refreshData();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Delete failed. Check console.");
    }
  };

  const fetchJimatekSerials = async () => {
    try {
      const res = await fetch("/api/qc-jimatek");
      if (!res.ok) {
         // Silently fail or log if needed, matching Master page behavior logic
         return [];
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching Jimatek serials:", error);
      return [];
    }
  };

  const handleExportSlave = (id: number) => {
    setSelectedSlaveIdForExport(id);
    setSlaveExportDialogOpen(true);
  };

  const handleSlaveExportConfirm = async (type: 'PLN' | 'MIMS') => {
    if (!selectedSlaveIdForExport) return;
    
    setSlaveExportDialogOpen(false); // Close dialog first
    setExportingId(selectedSlaveIdForExport); // Show loading on button

    try {
      const response = await fetch(`/api/attachments2/${selectedSlaveIdForExport}/export-data`);
      if (!response.ok) throw new Error("Failed to fetch export data");
      
      const { attachment, products, prefix } = await response.json();
      
      if (!products || products.length === 0) {
        alert("No products found for this slave.");
        return;
      }

      await generateSlaveExcel(type, attachment, products, prefix);
      
    } catch (error) {
      console.error("Export failed", error);
      alert("Export failed. Check console.");
    } finally {
      setExportingId(null);
      setSelectedSlaveIdForExport(null);
    }
  };

  const handlePageChange = (newPageIndex: number) => {
      setPagination(prev => ({ ...prev, pageIndex: newPageIndex }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
      setPagination({ pageIndex: 0, pageSize: newPageSize });
  };

  // Columns for Masters
  const masterColumns: DataTableColumn<AttachmentWithCounts>[] = [
    { 
      id: "no", 
      header: "No", 
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { accessorKey: "nomor", header: "Nomor Master" },
    { accessorKey: "area", header: "Area" },
    { accessorKey: "type", header: "Tipe" },
    { accessorKey: "total", header: "Total Qty" },
    { accessorKey: "tersedia", header: "Tersedia" },
    { 
      accessorKey: "timestamp", 
      header: "Tanggal Attachment", 
      cell: ({ value }) => new Date(value).toLocaleDateString("id-ID")
    },
    {
      id: "actions",
      header: "Actions",
      width: "150px",
      cell: ({ row }) => (role === "admin" || role === "spv") ? (
        <Button 
            size="sm" 
            onClick={() => handleCreateSlave(row)}
        >
          <FilePlus className="mr-2 h-4 w-4" /> Create Slave
        </Button>
      ) : null
    }
  ];

  // Columns for Slaves
  const slaveColumns: DataTableColumn<SlaveWithCounts>[] = [
    { 
      id: "no", 
      header: "No", 
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { accessorKey: "nomor", header: "Nomor Slave" },
    { accessorKey: "no_do", header: "No DO" },
    { accessorKey: "no_order", header: "No Order" },
    { accessorKey: "area", header: "Area" },
    { accessorKey: "type", header: "Tipe" },
    { accessorKey: "total", header: "Total Qty" },
    { 
      accessorKey: "timestamp", 
      header: "Tanggal Dibuat", 
      cell: ({ value }) => new Date(value).toLocaleDateString("id-ID")
    },
    {
      id: "input_meter",
      header: "Input Meter",
      cell: ({ row }) => (role === "admin" || role === "spv") ? (
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => handleInputMeterClick(row.id, row.nomor, row.type)}
        >
          Input Meter
        </Button>
      ) : null
    },
    {
      id: "export",
      header: "Export",
      width: "130px",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          disabled={exportingId === row.id}
          onClick={() => handleExportSlave(row.id)}
        >
          {exportingId === row.id ? (
            "Exporting..."
          ) : (
            <><FileDown className="mr-2 h-4 w-4" /> Export</>
          )}
        </Button>
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
            <DropdownMenuItem onClick={() => handleViewSlave(row)}>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            {role === "admin" && (
              <>
                <DropdownMenuItem onClick={() => handleEditSlave(row)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => confirmDelete(row.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
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
        <h1 className="text-3xl font-bold">PL Slave</h1>
      </div>
      
      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b flex justify-between items-center gap-4 bg-slate-50/50">
            <div className="bg-slate-200 p-1 rounded-lg inline-flex shadow-inner">
                <button 
                    onClick={() => {
                      setViewMode('masters');
                      setEditingSlave(null);
                      setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all uppercase tracking-wider ${viewMode === 'masters' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Available
                </button>
                <button 
                    onClick={() => {
                      setViewMode('slaves');
                      setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all uppercase tracking-wider ${viewMode === 'slaves' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Slaves List
                </button>
            </div>

            <Input
              type="text"
              placeholder={`Search...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs bg-white"
            />
          </div>
          
          <DataTable 
            data={data}
            loading={loading}
            columns={viewMode === 'masters' ? masterColumns : slaveColumns}
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
            <DialogTitle>{editingSlave ? "Edit PL Slave" : "Create New PL Slave"}</DialogTitle>
            <DialogDescription>
              {editingSlave ? "Update the details of the existing PL Slave." : "Fill in the form below to create a new PL Slave."}
            </DialogDescription>
          </DialogHeader>
          <Attachment2Form
            initialData={editingSlave}
            preSelectedMaster={selectedMaster}
            onSuccess={() => {
              setIsAddOpen(false);
              setSelectedMaster(null);
              setEditingSlave(null);
              refreshData(); // Refresh data on success
            }}
          />
        </DialogContent>
      </Dialog>

      <SlaveExportDialog 
        isOpen={slaveExportDialogOpen}
        onClose={() => setSlaveExportDialogOpen(false)}
        onExport={handleSlaveExportConfirm}
      />

      <InputMeterDialog 
        isOpen={inputMeterOpen}
        onClose={() => setInputMeterOpen(false)}
        attachmentId={selectedSlaveForInput?.id || null}
        nomor={selectedSlaveForInput?.nomor || ""}
        type={selectedSlaveForInput?.type || ""}
        mode="slave"
        onSuccess={() => {
            refreshData(); 
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the Slave PL and release all assigned products back to their original Master PL (if applicable) or set them to unassigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSlave} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>View PL Slave Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected PL Slave.
            </DialogDescription>
          </DialogHeader>
          {viewingSlave && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label className="font-bold">Nomor Slave</Label>
                <p>{viewingSlave.nomor}</p>
              </div>
              <div>
                <Label className="font-bold">Type</Label>
                <p>{viewingSlave.type}</p>
              </div>
              <div>
                <Label className="font-bold">Area</Label>
                <p>{viewingSlave.area}</p>
              </div>
              <div>
                <Label className="font-bold">No DO</Label>
                <p>{viewingSlave.no_do}</p>
              </div>
              <div>
                <Label className="font-bold">No Order</Label>
                <p>{viewingSlave.no_order}</p>
              </div>
              <div>
                <Label className="font-bold">Tanggal Dibuat</Label>
                <p>{new Date(viewingSlave.timestamp).toLocaleDateString("id-ID")}</p>
              </div>
              <div>
                <Label className="font-bold">Tanggal Order</Label>
                <p>{new Date(viewingSlave.tgl_order).toLocaleDateString("id-ID")}</p>
              </div>
              <div>
                <Label className="font-bold">Total Products</Label>
                <p>{viewingSlave.total}</p>
              </div>
            </div>
          )}
          <DialogFooter>
             <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}