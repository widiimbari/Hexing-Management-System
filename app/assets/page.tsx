"use client";

import { useState, useEffect, useCallback } from "react";
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
  Image as ImageIcon
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
import { AssetFormDialog } from "./components/asset-form-dialog";
import { AssetViewDialog } from "./components/asset-view-dialog";
import { AssetImageGallery } from "./components/asset-image-gallery";

// Types for Assets
interface Asset {
  id: string;
  type: string;
  serial_number: string;
  sap_id: string;
  supplier: string;
  image: string;
  purchase_date: string;
  created_at: string;
  updated_at: string;
  category_id: string;
  brand_id: string;
  area_id: string;
  location_id: string;
  employee_id: string;
  supplier_id: string;
  category?: { name: string };
  brand?: { name: string };
  area?: { name: string };
  location?: { name: string };
  employee?: { nik: string; nama: string; gender: string };
  supplier_rec?: { name: string; contact_person?: string; phone?: string; email?: string };
  asset_images?: Array<{
    id: string;
    name: string;
    created_at: string;
  }>;
}

export default function AssetsPage() {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [formLoading, setFormLoading] = useState(false);

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
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save asset");
      
      setFormDialogOpen(false);
      setSelectedAsset(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAsset = async (asset: Asset) => {
    if (!confirm(`Are you sure you want to delete asset ${asset.uid}?`)) return;
    
    try {
      const res = await fetch(`/api/assets/${asset.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete asset");
      
      fetchData();
    } catch (err) {
      console.error(err);
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

      if (!res.ok) throw new Error("Failed to upload images");
      
      fetchData();
    } catch (err) {
      console.error(err);
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0: return <Badge variant="outline" className="bg-slate-100">Ready</Badge>;
      case 1: return <Badge variant="default" className="bg-blue-600">In Use</Badge>;
      case 2: return <Badge variant="destructive">Maintenance</Badge>;
      case 3: return <Badge variant="secondary">Retired</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const columns: DataTableColumn<Asset>[] = [
    {
      id: "no",
      header: "No",
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { accessorKey: "serial_number", header: "Serial Number" },
    { accessorKey: "type", header: "Type" },
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
    { 
      id: "area",
      header: "Area",
      cell: ({ row }) => row.area?.name || "-"
    },
    { 
      id: "location",
      header: "Location",
      cell: ({ row }) => row.location?.name || "-"
    },
    { 
      id: "employee",
      header: "Assigned To",
      cell: ({ row }) => row.employee ? row.employee.nama : "-"
    },
    { 
      accessorKey: "sap_id",
      header: "SAP ID",
      cell: ({ value }) => value || "-"
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
            <DropdownMenuItem onClick={() => handleViewAsset(row)}>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditAsset(row)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleViewGallery(row)}>
              <ImageIcon className="mr-2 h-4 w-4" /> Images
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600"
              onClick={() => handleDeleteAsset(row)}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
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
        <Button onClick={() => {
          setSelectedAsset(null);
          setFormDialogOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Asset
        </Button>
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
    </div>
  );
}