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
import { AreaFormDialog } from "./components/area-form-dialog";
import { AlertModal } from "@/components/ui/alert-modal";
import { useRole } from "@/hooks/use-role";

interface Area {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  _count?: {
    locations: number;
  };
}

export default function AreasPage() {
  const { role } = useRole();
  const [data, setData] = useState<Area[]>([]);
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
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete Alert states
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState<Area | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: debouncedSearch,
      });
      const res = await fetch(`/api/assets/areas?${params}`);
      if (!res.ok) throw new Error("Failed to fetch areas");
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

  const handleSaveArea = async (formData: any) => {
    setFormLoading(true);
    try {
      const url = selectedArea ? `/api/assets/areas/${selectedArea.id}` : '/api/assets/areas';
      const method = selectedArea ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save area");
      
      setFormDialogOpen(false);
      setSelectedArea(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteArea = (area: Area) => {
    setAreaToDelete(area);
    setDeleteAlertOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!areaToDelete) return;
    
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/assets/areas/${areaToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete area");
      
      setDeleteAlertOpen(false);
      setAreaToDelete(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditArea = (area: Area) => {
    setSelectedArea(area);
    setFormDialogOpen(true);
  };

  const columns: DataTableColumn<Area>[] = [
    {
      id: "no",
      header: "No",
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { accessorKey: "name", header: "Area Name" },
    {
      id: "locations_count",
      header: "Locations Count",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row._count?.locations || 0} locations
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
                <DropdownMenuItem onClick={() => handleEditArea(row)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => handleDeleteArea(row)}
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
            <MapPin className="h-8 w-8 text-primary" /> Area Management
          </h1>
          <p className="text-muted-foreground">Manage geographical areas for locations.</p>
        </div>
        {(role === "super_admin" || role === "admin") && (
          <Button onClick={() => {
            setSelectedArea(null);
            setFormDialogOpen(true);
          }}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Area
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
                placeholder="Search area name..."
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

      {/* Area Form Dialog */}
      <AreaFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        area={selectedArea}
        onSave={handleSaveArea}
        loading={formLoading}
      />

      {/* Delete Alert Modal */}
      <AlertModal
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={onConfirmDelete}
        loading={deleteLoading}
        title="Are you sure?"
        description={`This action cannot be undone. This will permanently delete the area "${areaToDelete?.name}".`}
      />
    </div>
  );
}