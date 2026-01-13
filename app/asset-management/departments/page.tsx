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
  Users,
  Building
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
import { useRole } from "@/hooks/use-role";
import { format } from "date-fns";
import { DepartmentFormDialog } from "./components/department-form-dialog";
import { AlertModal } from "@/components/ui/alert-modal";

interface Department {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  _count?: {
    employees: number;
  };
}

export default function DepartmentsPage() {
  const { role } = useRole();
  const [data, setData] = useState<Department[]>([]);
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
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete Alert states
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: debouncedSearch,
      });
      const res = await fetch(`/api/assets/departments?${params}`);
      if (!res.ok) throw new Error("Failed to fetch departments");
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

  const handleSaveDepartment = async (formData: any) => {
    setFormLoading(true);
    try {
      const url = selectedDepartment ? `/api/assets/departments/${selectedDepartment.id}` : '/api/assets/departments';
      const method = selectedDepartment ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save department");
      
      setFormDialogOpen(false);
      setSelectedDepartment(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteDepartment = (department: Department) => {
    setDepartmentToDelete(department);
    setDeleteAlertOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!departmentToDelete) return;
    
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/assets/departments/${departmentToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete department");
      
      setDeleteAlertOpen(false);
      setDepartmentToDelete(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setFormDialogOpen(true);
  };

  const columns: DataTableColumn<Department>[] = [
    {
      id: "no",
      header: "No",
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { accessorKey: "name", header: "Department Name" },
    {
      id: "employees_count",
      header: "Employees Count",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row._count?.employees || 0} employees
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
                <DropdownMenuItem onClick={() => handleEditDepartment(row)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => handleDeleteDepartment(row)}
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
            <Building className="h-8 w-8 text-primary" /> Department Management
          </h1>
          <p className="text-muted-foreground">Manage asset departments.</p>
        </div>
        {(role === "super_admin" || role === "admin") && (
          <Button onClick={() => {
            setSelectedDepartment(null);
            setFormDialogOpen(true);
          }}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Department
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
                placeholder="Search department name..."
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

      {/* Department Form Dialog */}
      <DepartmentFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        department={selectedDepartment}
        onSave={handleSaveDepartment}
        loading={formLoading}
      />
      
      {/* Delete Alert Modal */}
      <AlertModal
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={onConfirmDelete}
        loading={deleteLoading}
        title="Are you sure?"
        description={`This action cannot be undone. This will permanently delete the department "${departmentToDelete?.name}".`}
      />
    </div>
  );
}