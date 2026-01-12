"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  Search, 
  Eye, 
  Edit, 
  Trash, 
  MoreHorizontal, 
  Package,
  Image as ImageIcon,
  Download,
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
import { AssetFormDialog } from "./components/asset-form-dialog";
import { AssetViewDialog } from "./components/asset-view-dialog";
import { AssetImageGallery } from "./components/asset-image-gallery";
import { AssetImportExportDialog } from "./components/asset-import-export-dialog";
import { AlertModal } from "@/components/ui/alert-modal";
import { History } from "lucide-react";
import { useRole } from "@/hooks/use-role";

// Types for Assets
interface Asset {
  id: string;
  serial_number: string;
  sap_id: string;
  model?: string;
  purchase_date: string;
  created_at: string;
  updated_at: string;
  category_id: string;
  brand_id: string;
  area_id: string;
  location_id: string;
  price?: string | number;
  employee_id: string;
  supplier_id: string;
  condition?: string;
  category?: { name: string };
  brand?: { name: string };
  area?: { name: string };
  location?: { name: string };
  employee?: { nik: string; nama: string; gender: string };
  supplier_rec?: { name: string; contact_person?: string; phone?: string; email?: string };
  main_image?: { url: string; name: string };
  asset_images?: Array<{
    id: string;
    name: string;
    url?: string;
    created_at: string;
  }>;
}

export default function AssetsPage() {
  const { role } = useRole();
  const [data, setData] = useState<Asset[]>([]);
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
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [importExportDialogOpen, setImportExportDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete Alert states
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: debouncedSearch,
      });
      const res = await fetch(`/api/assets?${params}`);
      if (!res.ok) throw new Error("Failed to fetch assets");
      const result = await res.json();
      setData(result.data);
      setRowCount(result.metadata.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, debouncedSearch]);

  const handleSaveAsset = async (formData: any) => {
    setFormLoading(true);
    try {
      const url = selectedAsset ? `/api/assets/${selectedAsset.id}` : '/api/assets';
      const method = selectedAsset ? 'PUT' : 'POST';
      
      const formPayload = new FormData();
      
      // Handle image files
      if (formData.imageFiles && formData.imageFiles.length > 0) {
        formData.imageFiles.forEach((file: File) => {
          formPayload.append('images', file);
        });
      }

      Object.keys(formData).forEach(key => {
        if (key === 'imageFiles' || key === 'image' || key === 'imageFile') return;
        
        if (key === 'purchase_date' && formData[key]) {
          formPayload.append(key, formData[key].toISOString());
        } else if (formData[key] !== null && formData[key] !== undefined) {
           formPayload.append(key, formData[key]);
        }
      });

      const res = await fetch(url, {
        method,
        body: formPayload,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save asset");
      }
      
      setFormDialogOpen(false);
      setSelectedAsset(null);
      fetchData();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred while saving the asset");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAsset = (asset: Asset) => {
    setAssetToDelete(asset);
    setTimeout(() => setDeleteAlertOpen(true), 0);
  };

  const onConfirmDelete = async () => {
    if (!assetToDelete) return;
    
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/assets/${assetToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete asset");
      
      setDeleteAlertOpen(false);
      setAssetToDelete(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setViewDialogOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setFormDialogOpen(true);
  };

  const handleViewGallery = (asset: Asset) => {
    setSelectedAsset(asset);
    setGalleryDialogOpen(true);
  };

  const handleImageUpload = async (files: File[]) => {
    if (!selectedAsset) return;
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const res = await fetch(`/api/assets/${selectedAsset.id}/images`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to upload images");
      }
      
      fetchData();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred while uploading images");
    }
  };

  const handleImageDelete = async (imageId: string) => {
    try {
      const res = await fetch(`/api/assets/images/${imageId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete image");
      
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImport = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/assets/import', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: result.message || "Failed to import assets",
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
        message: err.message || "Failed to import assets"
      };
    }
  };

  const handleExport = async () => {
    try {
      const res = await fetch('/api/assets/export');
      if (!res.ok) throw new Error("Failed to export assets");
      
      const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "");
      const filename = `LAPORAN_ASET_${dateStr}.xlsx`;
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      throw new Error("Failed to export assets");
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const res = await fetch('/api/assets/template');
      if (!res.ok) throw new Error("Failed to download template");
      
      const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "");
      const filename = `TEMPLATE_IMPORT_ASET_${dateStr}.xlsx`;
      
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: DataTableColumn<Asset>[] = [
    {
      id: "no",
      header: "No",
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { 
      accessorKey: "sap_id",
      header: "SAP ID",
      cell: ({ value }) => value || "-"
    },
    { accessorKey: "serial_number", header: "Serial Number" },
    { 
      id: "category",
      header: "Category",
      cell: ({ row }) => row.category?.name || "-"
    },
    { 
      id: "brand",
      header: "Brand",
      cell: ({ row }) => row.brand?.name || "-"
    },
    // { 
    //   id: "area",
    //   header: "Area",
    //   cell: ({ row }) => row.area?.name || "-"
    // },
    { 
      id: "location",
      header: "Location",
      cell: ({ row }) => row.location?.name || "-"
    },
    // {
    //   id: "price",
    //   header: "Price",
    //   cell: ({ row }) => {
    //     if (!row.price) return "-";
    //     const numValue = typeof row.price === "string" ? parseFloat(row.price) : row.price;
    //     if (isNaN(numValue)) return "-";
    //     return new Intl.NumberFormat("id-ID", {
    //       style: "currency",
    //       currency: "IDR",
    //       minimumFractionDigits: 0,
    //       maximumFractionDigits: 0,
    //     }).format(numValue);
    //   }
    // },
        {
          id: "employee",
          header: "Assigned To",
          cell: ({ row }) => row.employee ? row.employee.nama : "-"
        },
    {
      id: "condition",
      accessorKey: "condition",
      header: "Condition",
      cell: ({ value }) => {
        const getConditionClass = (cond: string) => {
          switch (cond) {
            case 'GOOD': return 'bg-emerald-600 hover:bg-emerald-700 border-transparent text-white';
            case 'SLIGHTLY_DAMAGED': return 'bg-yellow-600 hover:bg-yellow-700 border-transparent text-white';
            case 'DAMAGED': return 'bg-orange-600 hover:bg-orange-700 border-transparent text-white';
            case 'BROKEN': return 'bg-red-600 hover:bg-red-700 border-transparent text-white';
            case 'DISPOSED': return 'bg-slate-600 hover:bg-slate-700 border-transparent text-white';
            case 'MAINTENANCE': return 'bg-blue-600 hover:bg-blue-700 border-transparent text-white';
            case 'LOST': return 'bg-purple-600 hover:bg-purple-700 border-transparent text-white';
            default: return 'bg-slate-500 hover:bg-slate-600 border-transparent text-white';
          }
        };

        return (
          <Badge className={getConditionClass(value)}>
            {value ? value.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'Unknown'}
          </Badge>
        );
      }
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
          id: "actions",      header: "Actions",
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
            <DropdownMenuItem onClick={() => handleViewAsset(row)}>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            
            {role === "super_admin" && (
              <>
                <DropdownMenuItem onClick={() => handleEditAsset(row)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => handleDeleteAsset(row)}
                >
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </>
            )}

            {(role === "super_admin" || role === "admin") && (
                <DropdownMenuItem onClick={() => handleViewGallery(row)}>
                <ImageIcon className="mr-2 h-4 w-4" /> Images
                </DropdownMenuItem>
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
            <Package className="h-8 w-8 text-primary" /> Asset Management
          </h1>
          <p className="text-muted-foreground">Manage and track company assets.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setImportExportDialogOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" /> Import/Export
          </Button>
          {(role === "super_admin" || role === "admin") && (
            <Button onClick={() => {
                setSelectedAsset(null);
                setFormDialogOpen(true);
            }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Asset
            </Button>
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
                placeholder="Search serial number, type, SAP ID, or employee..."
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

      {/* Dialogs */}
      <AssetFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        asset={selectedAsset}
        onSave={handleSaveAsset}
        loading={formLoading}
      />

      <AssetViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        asset={selectedAsset}
        onAssetUpdated={fetchData}
      />

      <AssetImageGallery
        open={galleryDialogOpen}
        onOpenChange={setGalleryDialogOpen}
        assetId={selectedAsset?.id || ""}
        images={selectedAsset?.asset_images || []}
        onImageUpload={handleImageUpload}
        onImageDelete={handleImageDelete}
        loading={formLoading}
      />

      <AssetImportExportDialog
        isOpen={importExportDialogOpen}
        onClose={() => setImportExportDialogOpen(false)}
        onImport={handleImport}
        onExport={handleExport}
        onDownloadTemplate={handleDownloadTemplate}
        loading={formLoading}
        canImport={role === "super_admin" || role === "admin"}
      />

      {/* Delete Alert Modal */}
      <AlertModal
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={onConfirmDelete}
        loading={deleteLoading}
        title="Are you sure?"
        description={`This action cannot be undone. This will permanently delete the asset "${assetToDelete?.serial_number}".`}
      />
    </div>
  );
}