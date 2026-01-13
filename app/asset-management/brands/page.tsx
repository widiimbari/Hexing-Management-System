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
  Package
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
import { BrandFormDialog } from "./components/brand-form-dialog";
import { AlertModal } from "@/components/ui/alert-modal";
import { useRole } from "@/hooks/use-role";

interface Brand {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  _count?: {
    assets: number;
  };
}

export default function BrandsPage() {
  const { role } = useRole();
  const [data, setData] = useState<Brand[]>([]);
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
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete Alert states
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: debouncedSearch,
      });
      const res = await fetch(`/api/assets/brands?${params}`);
      if (!res.ok) throw new Error("Failed to fetch brands");
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

  const handleSaveBrand = async (formData: any) => {
    setFormLoading(true);
    try {
      const url = selectedBrand ? `/api/assets/brands/${selectedBrand.id}` : '/api/assets/brands';
      const method = selectedBrand ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save brand");
      
      setFormDialogOpen(false);
      setSelectedBrand(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBrand = (brand: Brand) => {
    setBrandToDelete(brand);
    setDeleteAlertOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!brandToDelete) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/assets/brands/${brandToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete brand");
      
      setDeleteAlertOpen(false);
      setBrandToDelete(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setFormDialogOpen(true);
  };

  const columns: DataTableColumn<Brand>[] = [
    {
      id: "no",
      header: "No",
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { accessorKey: "name", header: "Brand Name" },
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
                <DropdownMenuItem onClick={() => handleEditBrand(row)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => handleDeleteBrand(row)}
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
            <Package className="h-8 w-8 text-primary" /> Brand Management
          </h1>
          <p className="text-muted-foreground">Manage asset brands.</p>
        </div>
        {(role === "super_admin" || role === "admin") && (
          <Button onClick={() => {
            setSelectedBrand(null);
            setFormDialogOpen(true);
          }}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Brand
          </Button>
        )}
      </div>

      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search brand name..."
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

      {/* Brand Form Dialog */}
      <BrandFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        brand={selectedBrand}
        onSave={handleSaveBrand}
        loading={formLoading}
      />
      
      {/* Delete Alert Modal */}
      <AlertModal
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={onConfirmDelete}
        loading={deleteLoading}
        title="Are you sure?"
        description={`This action cannot be undone. This will permanently delete the brand "${brandToDelete?.name}".`}
      />
    </div>
  );
}