"use client";

import { useEffect, useState, useCallback } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import { UserForm } from "./components/user-form";
import { CellAction } from "./components/cell-action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UsersPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // For Create Dialog
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users");

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to fetch users" }));
        throw new Error(errorData.message || "Failed to fetch users");
      }

      const users = await res.json();
      setData(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch users");
      setData([]);
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
      id: "user",
      header: "User",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={row.image_url} alt={row.name} />
            <AvatarFallback>{(row.name || row.username).substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-none">{row.name || "N/A"}</span>
            <span className="text-xs text-muted-foreground mt-1">@{row.username}</span>
          </div>
        </div>
      )
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ value }) => {
        return value
          .split("_")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      },
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
        <Button onClick={() => setOpen(true)} disabled={!!error}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {error && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-red-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800">Error Loading Users</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                {error.includes("Unauthorized") && (
                  <p className="text-sm text-red-600 mt-2">
                    You need <strong>super_admin</strong> role to access this page. Please contact your administrator.
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-red-500 text-red-700 hover:bg-red-100"
                  onClick={fetchData}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <UserForm
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchData}
      />

      <Card>
        <CardContent className="p-0">
          {!error && (
            <DataTable
              columns={columns}
              data={data}
              loading={loading}
            />
          )}
          {error && !loading && (
            <div className="p-8 text-center text-gray-500">
              <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p>Unable to load users. Please check the error message above.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}