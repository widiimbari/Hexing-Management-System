"use client";

import { useEffect, useState, useCallback } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserForm } from "./components/user-form";
import { CellAction } from "./components/cell-action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // For Create Dialog

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const users = await res.json();
      setData(users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: DataTableColumn<any>[] = [
    {
      id: "no",
      header: "No",
      width: 50,
      cell: ({ row }) => {
        return data.indexOf(row) + 1;
      },
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      header: "Actions",
      width: 100,
      cell: ({ row }) => <CellAction data={row} onSuccess={fetchData} />,
    },
  ];

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <UserForm
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchData}
      />

      <Card>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={data}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
