"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

interface PLItemsViewerProps {
  attachmentId: number;
  mode: "master" | "slave";
}

export function PLItemsViewer({ attachmentId, mode }: PLItemsViewerProps) {
  const [view, setView] = useState("serial");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 800);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });

  useEffect(() => {
    fetchData(1);
  }, [attachmentId, mode, view, debouncedSearch]);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const endpoint = mode === "master" ? "attachments" : "attachments2";
      const params = new URLSearchParams({
        view,
        page: page.toString(),
        limit: "10",
        search: debouncedSearch
      });

      const res = await fetch(`/api/${endpoint}/${attachmentId}/items?${params}`);
      if (!res.ok) throw new Error("Failed to fetch items");
      
      const result = await res.json();
      setData(result.data);
      setMetadata(result.metadata);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-center p-8 text-slate-500 bg-slate-50 rounded-md border border-dashed">
          No items found.
        </div>
      );
    }

    if (view === "serial") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Box</TableHead>
              <TableHead>Pallet</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{(metadata.page - 1) * metadata.limit + i + 1}</TableCell>
                <TableCell className="font-mono">{item.serial}</TableCell>
                <TableCell>{item.box}</TableCell>
                <TableCell>{item.pallet}</TableCell>
                <TableCell>{item.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    if (view === "box") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Box Serial</TableHead>
              <TableHead>Pallet</TableHead>
              <TableHead>Item Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{(metadata.page - 1) * metadata.limit + i + 1}</TableCell>
                <TableCell className="font-mono">{item.serial}</TableCell>
                <TableCell>{item.pallet}</TableCell>
                <TableCell>{item.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    if (view === "pallet") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Pallet Serial</TableHead>
              <TableHead>Box Count</TableHead>
              <TableHead>Total Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{(metadata.page - 1) * metadata.limit + i + 1}</TableCell>
                <TableCell className="font-mono">{item.serial}</TableCell>
                <TableCell>{item.boxCount}</TableCell>
                <TableCell>{item.productCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs value={view} onValueChange={setView} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="serial">Serials</TabsTrigger>
            <TabsTrigger value="box">Boxes</TabsTrigger>
            <TabsTrigger value="pallet">Pallets</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search serials..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border h-[400px] overflow-auto relative">
        {renderTable()}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Total: {metadata.total} items
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchData(metadata.page - 1)}
            disabled={metadata.page <= 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            Page {metadata.page} of {metadata.totalPages || 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchData(metadata.page + 1)}
            disabled={metadata.page >= metadata.totalPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
