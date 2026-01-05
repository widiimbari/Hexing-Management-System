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
  Building,
  MapPin
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
import { LocationFormDialog } from "./components/location-form-dialog";
import { AlertModal } from "@/components/ui/alert-modal";

interface Location {
  id: string;
  name: string;
  area_id: string;
  created_at: string;
  updated_at: string;
  area?: {
    id: string;
    name: string;
  };
  _count?: {
    assets: number;
  };
}

interface Area {
  id: string;
  name: string;
}

export default function LocationsPage() {
  const [data, setData] = useState<Location[]>([]);
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
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [areas, setAreas] = useState<Area[]>([]);

  // Delete Alert states
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAreas = async () => {
    try {
      const res = await fetch("/api/assets/areas");
      if (res.ok) {
        const result = await res.json();
        setAreas(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: debouncedSearch,
      });
      const res = await fetch(`/api/assets/locations?${params}`);
      if (!res.ok) throw new Error("Failed to fetch locations");
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
    fetchAreas();
  }, [fetchData]);

  const handleSaveLocation = async (formData: any) => {
    setFormLoading(true);
    try {
      const url = selectedLocation ? `/api/assets/locations/${selectedLocation.id}` : '/api/assets/locations';
      const method = selectedLocation ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save location");
      
      setFormDialogOpen(false);
      setSelectedLocation(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteLocation = (location: Location) => {
    setLocationToDelete(location);
    setDeleteAlertOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!locationToDelete) return;
    
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/assets/locations/${locationToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete location");
      
      setDeleteAlertOpen(false);
      setLocationToDelete(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditLocation = (location: Location) => {
    setSelectedLocation(location);
    setFormDialogOpen(true);
  };

  const columns: DataTableColumn<Location>[] = [
    {
      id: "no",
      header: "No",
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { accessorKey: "name", header: "Location Name" },
    {
      id: "area",
      header: "Area",
      cell: ({ row }) => row.area?.name || "-"
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
        },    {
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
            <DropdownMenuItem onClick={() => handleEditLocation(row)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600"
              onClick={() => handleDeleteLocation(row)}
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
            <Building className="h-8 w-8 text-primary" /> Location Management
          </h1>
          <p className="text-muted-foreground">Manage locations within areas.</p>
        </div>
        <Button onClick={() => {
          setSelectedLocation(null);
          setFormDialogOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Location
        </Button>
      </div>

      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search location name or area..."
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

      {/* Location Form Dialog */}
      <LocationFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        location={selectedLocation}
        areas={areas}
        onSave={handleSaveLocation}
        loading={formLoading}
      />
      
      {/* Delete Alert Modal */}
      <AlertModal
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={onConfirmDelete}
        loading={deleteLoading}
        title="Are you sure?"
        description={`This action cannot be undone. This will permanently delete the location "${locationToDelete?.name}".`}
      />
    </div>
  );
}