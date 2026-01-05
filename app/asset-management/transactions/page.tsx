"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Download, 
  History,
  Filter
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { format } from "date-fns";

// Helper to format date treating UTC as local time (to display stored DB time exactly as is)
const formatUTC = (dateStr: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const utcDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
  return format(utcDate, "dd/MM/yyyy HH:mm:ss");
};

// Helper function to format condition names for display
const formatConditionName = (condition?: string) => {
  if (!condition) return '-';
  
  return condition
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
};

interface Transaction {
  id: string;
  transaction_type: string;
  transaction_date: string;
  remarks: string;
  attachment_url?: string;
  previous_condition?: string;
  new_condition?: string;
  previous_location?: string;
  new_location?: string;
  asset: {
    serial_number: string;
    sap_id: string;
    asset_type: { name: string };
  };
  creator?: {
    name: string;
  };
  previous_holder?: { nama: string };
  new_holder?: { nama: string };
}

export default function TransactionsPage() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
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
        type: typeFilter,
      });
      const res = await fetch(`/api/transactions?${params}`);
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const result = await res.json();
      setData(result.data);
      setRowCount(result.metadata.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, debouncedSearch, typeFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        type: typeFilter,
      });
      const res = await fetch(`/api/transactions/export?${params}`);
      if (!res.ok) throw new Error("Failed to export");
      
      const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "");
      const filename = `LAPORAN_TRANSAKSI_ASET_${dateStr}.xlsx`;
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to export transactions");
    }
  };

  const columns: DataTableColumn<Transaction>[] = [
    {
      id: "date",
      header: "Date",
      cell: ({ row }) => formatUTC(row.transaction_date)
    },
    {
      id: "asset",
      header: "Asset",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.asset.serial_number}</span>
          <span className="text-xs text-muted-foreground">{row.asset.asset_type?.name}</span>
        </div>
      )
    },
    {
      accessorKey: "transaction_type",
      header: "Type",
      cell: ({ value }) => (
        <span className="capitalize font-medium">
          {value.replace(/_/g, ' ').toLowerCase()}
        </span>
      )
    },
    {
      id: "previous",
      header: "Previous",
      cell: ({ row }) => {
        if (row.transaction_type === 'CONDITION_CHANGE') {
          return (
            <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
              {formatConditionName(row.previous_condition)}
            </span>
          );
        }
        if (row.transaction_type === 'ASSIGNMENT') {
          return row.previous_holder?.nama || '-';
        }
        if (row.transaction_type === 'RELOCATION') {
          return row.previous_location || '-';
        }
        return '-';
      }
    },
    {
      id: "new",
      header: "New",
      cell: ({ row }) => {
        if (row.transaction_type === 'CONDITION_CHANGE') {
          return (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              {formatConditionName(row.new_condition)}
            </span>
          );
        }
        if (row.transaction_type === 'ASSIGNMENT') {
          return row.new_holder?.nama || '-';
        }
        if (row.transaction_type === 'RELOCATION') {
          return row.new_location || '-';
        }
        return '-';
      }
    },
    {
      id: "attachment",
      header: "Attachment",
      cell: ({ row }) => {
        if (!row.attachment_url) return "-";
        
        return (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => window.open(row.attachment_url, '_blank')}
            title="Download Attachment"
          >
            <Download className="h-4 w-4 text-blue-600" />
          </Button>
        );
      }
    },
    {
      id: "details",
      header: "Details",
      cell: ({ row }) => {
        return row.remarks || '-';
      }
    },
    {
      id: "by",
      header: "By",
      cell: ({ row }) => row.creator?.name || "System"
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <History className="h-8 w-8 text-primary" /> Asset Transactions
          </h1>
          <p className="text-muted-foreground">Audit log of all asset movements and changes.</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Export Excel
        </Button>
      </div>

      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search asset, remarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="PURCHASE">Purchase</SelectItem>
                  <SelectItem value="CONDITION_CHANGE">Condition Change</SelectItem>
                  <SelectItem value="RELOCATION">Relocation</SelectItem>
                  <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  <SelectItem value="DISPOSE">Dispose</SelectItem>
                </SelectContent>
              </Select>
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
