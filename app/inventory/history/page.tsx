"use client";

import { useEffect, useState, useCallback } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";

interface AuditLog {
  id: number;
  timestamp: string;
  action: string;
  entity: string;
  entity_id: string;
  details: string;
  user: string;
}

export default function HistoryPage() {
  const [data, setData] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: debouncedSearch,
      });
      const res = await fetch(`/api/audit-logs?${params}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch logs");
      }
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

  const columns: DataTableColumn<AuditLog>[] = [
    {
      id: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => new Date(row.timestamp).toLocaleString("id-ID"),
      width: "180px"
    },
    {
      accessorKey: "user",
      header: "User",
      width: "120px",
      cell: ({ value }) => (
        <span className="font-medium text-slate-700">{value || "System"}</span>
      )
    },
    {
      accessorKey: "action",
      header: "Action",
      width: "100px",
      cell: ({ value }) => {
        let color = "bg-slate-100 text-slate-700";
        if (value === "CREATE") color = "bg-green-100 text-green-700";
        if (value === "UPDATE") color = "bg-blue-100 text-blue-700";
        if (value === "DELETE") color = "bg-red-100 text-red-700";
        return <Badge variant="outline" className={`${color} border-none`}>{value}</Badge>;
      }
    },
    {
      accessorKey: "entity",
      header: "Entity",
      width: "120px"
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ value }) => (
        <span className="text-sm text-slate-600 truncate max-w-[400px] block" title={value}>
            {value}
        </span>
      )
    }
  ];

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <History className="h-8 w-8 text-primary" /> System Logs
        </h1>
      </div>

      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search logs..."
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
    </div>
  );
}
