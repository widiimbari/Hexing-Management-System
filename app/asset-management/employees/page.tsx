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
  UserCheck,
  Users,
  Building,
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
import { useRole } from "@/hooks/use-role";
import { EmployeeFormDialog } from "./components/employee-form-dialog";
import { EmployeeSupplierImportExportDialog } from "../components/employee-supplier-import-export-dialog";

interface Employee {
  id: string;
  nik: string;
  nama: string;
  gender: string;
  department_id: string;
  created_at: string;
  updated_at: string;
  department?: {
    id: string;
    name: string;
  };
  _count?: {
    assets: number;
  };
}

interface Department {
  id: string;
  name: string;
}

export default function EmployeesPage() {
  const { role } = useRole();
  const [data, setData] = useState<Employee[]>([]);
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
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/assets/departments");
      if (res.ok) {
        const result = await res.json();
        setDepartments(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
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
      const res = await fetch(`/api/assets/employees?${params}`);
      if (!res.ok) throw new Error("Failed to fetch employees");
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
    fetchDepartments();
  }, [fetchData]);

  const handleSaveEmployee = async (formData: any) => {
    setFormLoading(true);
    try {
      const url = selectedEmployee ? `/api/assets/employees/${selectedEmployee.id}` : '/api/assets/employees';
      const method = selectedEmployee ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save employee");
      
      setFormDialogOpen(false);
      setSelectedEmployee(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteEmployee = async (employee: Employee) => {
    if (!confirm(`Are you sure you want to delete employee "${employee.nama}" (${employee.nik})?`)) return;
    
    try {
      const res = await fetch(`/api/assets/employees/${employee.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete employee");
      
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImportEmployees = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/assets/employees/import', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: result.message || "Failed to import employees",
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
        message: err.message || "Failed to import employees"
      };
    }
  };

  const handleDownloadEmployeeTemplate = async () => {
    try {
      const res = await fetch('/api/assets/employees/template');
      if (!res.ok) throw new Error("Failed to download template");
      
      const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "");
      const filename = `TEMPLATE_IMPORT_EMPLOYEE_${dateStr}.xlsx`;
      
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

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormDialogOpen(true);
  };

  const columns: DataTableColumn<Employee>[] = [
    {
      id: "no",
      header: "No",
      width: "50px",
      cell: ({ row }) => data.indexOf(row) + 1 + (pagination.pageIndex * pagination.pageSize)
    },
    { accessorKey: "nik", header: "NIK" },
    { accessorKey: "nama", header: "Name" },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ value }) => value === "L" ? "Male" : value === "P" ? "Female" : "-"
    },
    {
      id: "department",
      header: "Department",
      cell: ({ row }) => row.department?.name || "-"
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
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ value }) => value ? new Date(value).toLocaleDateString() : "-"
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
                <DropdownMenuItem onClick={() => handleEditEmployee(row)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => handleDeleteEmployee(row)}
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
            <UserCheck className="h-8 w-8 text-primary" /> Employee Management
          </h1>
          <p className="text-muted-foreground">Manage employees and their assignments.</p>
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
                setSelectedEmployee(null);
                setFormDialogOpen(true);
              }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Employee
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
                placeholder="Search NIK, name, or department..."
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

      {/* Employee Form Dialog */}
      <EmployeeFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        employee={selectedEmployee}
        departments={departments}
        onSave={handleSaveEmployee}
        loading={formLoading}
      />

      {/* Import Export Dialog */}
      <EmployeeSupplierImportExportDialog
        isOpen={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImportEmployees}
        onDownloadTemplate={handleDownloadEmployeeTemplate}
        type="employee"
        loading={formLoading}
      />
    </div>
  );
}