"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash, 
  MoreHorizontal,
  Truck,
  Phone,
  Mail,
  Upload
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";
import { format } from "date-fns";
import { SupplierFormDialog } from "./components/supplier-form-dialog";
import { EmployeeSupplierImportExportDialog } from "../components/employee-supplier-import-export-dialog";
import { AlertModal } from "@/components/ui/alert-modal";
import { useRole } from "@/hooks/use-role";

interface Supplier {
  id: string;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  created_at: string;
  updated_at: string;
  _count?: {
    assets: number;
  };
}

export default function SuppliersPage() {
  const { role } = useRole();
  const [data, setData] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 800);
  
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  // Delete Alert states
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: debouncedSearch,
      });
      const res = await fetch(`/api/assets/suppliers?${params}`);
      if (!res.ok) throw new Error("Failed to fetch suppliers");
      const result = await res.json();
      setData(result.data);
      setRowCount(result.metadata.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveSupplier = async (formData: any) => {
    setFormLoading(true);
    try {
      const url = selectedSupplier ? `/api/assets/suppliers/${selectedSupplier.id}` : '/api/assets/suppliers';
      const method = selectedSupplier ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save supplier");
      
      setFormDialogOpen(false);
      setSelectedSupplier(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    setSupplierToDelete(supplier);
    setDeleteAlertOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!supplierToDelete) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/assets/suppliers/${supplierToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete supplier");
      
      setDeleteAlertOpen(false);
      setSupplierToDelete(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleImportSuppliers = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/assets/suppliers/import', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: result.message || "Failed to import suppliers",
          errors: result.errors || []
        };
      }

      fetchData();
      return {
        success: true,
        message: result.message,
        errors: result.errors
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Failed to import suppliers"
      };
    }
  };

  const handleDownloadSupplierTemplate = async () => {
    try {
      const res = await fetch('/api/assets/suppliers/template');
      if (!res.ok) throw new Error("Failed to download template");
      
      const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "");
      const filename = `TEMPLATE_IMPORT_SUPPLIER_${dateStr}.xlsx`;
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      throw new Error("Failed to download template");
    }
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setFormDialogOpen(true);
  };

  const columns: DataTableColumn<Supplier>[] = [
    {
      id: "no",
      header: "No",
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { accessorKey: "name", header: "Supplier Name" },
    { 
      accessorKey: "contact_person", 
      header: "Contact Person",
      cell: ({ value }) => value || "-"
    },
    {
      id: "contact_info",
      header: "Contact Info",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.phone && (
            <div className="flex items-center gap-1 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              {row.phone}
            </div>
          )}
          {row.email && (
            <div className="flex items-center gap-1 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="truncate">{row.email}</span>
            </div>
          )}
          {!row.phone && !row.email && "-"}
        </div>
      ),
    },
    {
      id: "assets_count",
      header: "Assets Count",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row._count?.assets || 0} assets
        </Badge>
      ),
    },
    {
      id: "created_at",
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ value }) => value ? format(new Date(value), "dd/MM/yyyy") : "-"
    },
    {
      id: "updated_at", 
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ value }) => value ? format(new Date(value), "dd/MM/yyyy") : "-"
    },
    {
      id: "actions",
      header: "Actions",
      width: "80px",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {role === "super_admin" && (
              <>
                <DropdownMenuItem onClick={() => handleEditSupplier(row)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => handleDeleteSupplier(row)}
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
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Truck className="h-8 w-8 text-primary" /> Supplier Management
          </h1>
          <p className="text-muted-foreground">Manage supplier information and contacts.</p>
        </div>
        <div className="flex gap-2">
          {(role === "super_admin" || role === "admin") && (
            <>
              <Button 
                variant="outline"
                onClick={() => setImportDialogOpen(true)}
              >
                <Upload className="mr-2 h-4 w-4" /> Import
              </Button>
              <Button onClick={() => {
                setSelectedSupplier(null);
                setFormDialogOpen(true);
              }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Supplier
              </Button>
            </>
          )}
        </div>
      </div>

      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search name, contact, phone, or email..."
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
            pagination={{
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
              rowCount: rowCount,
              onPageChange: (index) => setPagination(p => ({ ...p, pageIndex: index })),
              onPageSizeChange: (size) => setPagination({ pageIndex: 0, pageSize: size }),
            }}
          />
        </CardContent>
      </Card>

      {/* Supplier Form Dialog */}
      <SupplierFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        supplier={selectedSupplier}
        onSave={handleSaveSupplier}
        loading={formLoading}
      />

      {/* Import Export Dialog */}
      <EmployeeSupplierImportExportDialog
        isOpen={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImportSuppliers}
        onDownloadTemplate={handleDownloadSupplierTemplate}
        type="supplier"
        loading={formLoading}
      />

      {/* Delete Alert Modal */}
      <AlertModal
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={onConfirmDelete}
        loading={deleteLoading}
        title="Are you sure?"
        description={`This action cannot be undone. This will permanently delete the supplier "${supplierToDelete?.name}".`}
      />
    </div>
  );
}