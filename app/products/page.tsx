"use client";

import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductFilters, ProductFiltersState } from "./components/product-filters";
import { CellAction } from "./components/cell-action";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [viewType, setViewType] = useState('product');
  
  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [currentFilters, setCurrentFilters] = useState<ProductFiltersState>({
    search: "",
    type: "all",
    groupBy: "none",
    startDate: undefined,
    endDate: undefined
  });

  // Pagination State
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  
  const [hasSearched, setHasSearched] = useState(false);

  const fetchData = useCallback(async () => {
    if (!hasSearched) return; // Prevent fetch if not searched

    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        search: currentFilters.search,
      });

      if (currentFilters.type && currentFilters.type !== "all") {
        params.append("type", currentFilters.type);
      }
      if (currentFilters.startDate) {
        params.append("startDate", currentFilters.startDate);
      }
      if (currentFilters.endDate) {
        params.append("endDate", currentFilters.endDate);
      }
      if (currentFilters.groupBy && currentFilters.groupBy !== "none") {
          params.append("groupBy", currentFilters.groupBy);
      }

      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();

      setRows(result.data);
      setRowCount(result.metadata.total);
      setViewType(result.type); 
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination, currentFilters, hasSearched]);

  // Sync Debounced Search
  useEffect(() => {
    setCurrentFilters(prev => ({ ...prev, search: debouncedSearch }));
    setPagination(prev => ({ ...prev, pageIndex: 0 })); // Reset page
    
    if (debouncedSearch) {
        setHasSearched(true);
    } else {
        setHasSearched(false);
        setRows([]);
        setRowCount(0);
    }
  }, [debouncedSearch]);

  const handleFilterChange = (filters: Omit<ProductFiltersState, 'search'>) => {
    setCurrentFilters(prev => ({ ...prev, ...filters }));
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
    
    const isActive = !!(debouncedSearch || filters.type !== "all" || filters.startDate || filters.groupBy !== "none");
    setHasSearched(isActive);

    if (!isActive) {
        setRows([]);
        setRowCount(0);
    }
  };

  const handleExport = () => {
    const params = new URLSearchParams({
        search: currentFilters.search,
    });
     if (currentFilters.type && currentFilters.type !== "all") {
        params.append("type", currentFilters.type);
      }
      if (currentFilters.startDate) {
        params.append("startDate", currentFilters.startDate);
      }
      if (currentFilters.endDate) {
        params.append("endDate", currentFilters.endDate);
      }
      if (currentFilters.groupBy && currentFilters.groupBy !== "none") {
          params.append("groupBy", currentFilters.groupBy);
      }
    window.open(`/api/export?${params.toString()}`, '_blank');
  };

  const handleClearSearch = () => {
      setSearchTerm("");
  };

  const handlePageChange = (pageIndex: number) => {
      setPagination(prev => ({ ...prev, pageIndex }));
  };

  const handlePageSizeChange = (pageSize: number) => {
      setPagination({ pageIndex: 0, pageSize });
  };

  // Fetch when dependent states change
  useEffect(() => {
      if (hasSearched) {
          fetchData();
      }
  }, [pagination, currentFilters, fetchData, hasSearched]);

  const getColumns = (): DataTableColumn<any>[] => {
      const commonNoColumn: DataTableColumn<any> = {
          id: 'no',
          header: 'No',
          width: 50,
          cell: ({ row }) => {
              // Calculate global row index
              const rowIndex = rows.indexOf(row);
              return (pagination.pageIndex * pagination.pageSize) + rowIndex + 1;
          }
      };

      if (viewType === 'box') {
          return [
              commonNoColumn,
              { accessorKey: 'serial', header: 'Box Serial' },
              { accessorKey: 'pallet_serial', header: 'Pallet Serial' },
              { accessorKey: 'type', header: 'Type' },
              { accessorKey: 'count', header: 'Total Products' },
              { accessorKey: 'line', header: 'Line' },
              { 
                  accessorKey: 'timestamp', 
                  header: 'Last Update', 
                  cell: ({ value }) => new Date(value).toLocaleString("id-ID", { timeZone: "UTC" })
              },
          ];
      }
      if (viewType === 'pallet') {
          return [
              commonNoColumn,
              { accessorKey: 'serial', header: 'Pallet Serial' },
              { accessorKey: 'type', header: 'Type' },
              { accessorKey: 'count', header: 'Total Boxes' },
              { accessorKey: 'line', header: 'Line' },
              { 
                  accessorKey: 'timestamp', 
                  header: 'Last Update', 
                  cell: ({ value }) => new Date(value).toLocaleString("id-ID", { timeZone: "UTC" })
              },
          ];
      }
      return [
          commonNoColumn,
          { accessorKey: 'serial', header: 'Serial Number' },
          { accessorKey: 'box_serial', header: 'Box Serial' },
          { accessorKey: 'pallet_serial', header: 'Pallet Serial' },
          { accessorKey: 'type', header: 'Type' },
          { accessorKey: 'orderno', header: 'Order No' },
          { accessorKey: 'line', header: 'Line' },
          { 
            accessorKey: 'timestamp', 
            header: 'Waktu Produksi', 
            cell: ({ value }) => new Date(value).toLocaleString("id-ID", { timeZone: "UTC" })
          },
          {
            id: "actions",
            header: "Actions",
            width: 100,
            cell: ({ row }) => <CellAction data={row} />,
          },
      ];
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Products</h1>
            {hasSearched && <div className="text-muted-foreground font-medium">Total Results: {rowCount.toLocaleString()}</div>}
        </div>
        <ProductFilters 
            onFilterChange={handleFilterChange} 
            onExport={handleExport} 
            loading={loading}
            currentSearch={searchTerm}
            onClearSearch={handleClearSearch}
        />
        
        <Card className="shadow-md border-none">
            <CardContent className="p-0">
                <div className="p-4 border-b">
                    <input 
                        type="text" 
                        placeholder="Search Serial, Box, or Pallet..." 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DataTable
                    data={rows}
                    loading={loading}
                    columns={getColumns()}
                    pagination={{
                        pageIndex: pagination.pageIndex,
                        pageSize: pagination.pageSize,
                        rowCount: rowCount,
                        onPageChange: handlePageChange,
                        onPageSizeChange: handlePageSizeChange
                    }}
                />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}