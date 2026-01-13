"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

interface SlaveInfo {
  id: number;
  nomor: string;
  type: string;
  area: string;
  timestamp: string;
  productCount: number;
}

interface MasterSlavesListProps {
  masterId: number;
}

export function MasterSlavesList({ masterId }: MasterSlavesListProps) {
  const [slaves, setSlaves] = useState<SlaveInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [metadata, setMetadata] = useState({ total: 0, totalPages: 0 });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 800);

  useEffect(() => {
    async function fetchSlaves() {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "10",
          search: debouncedSearch
        });
        const res = await fetch(`/api/attachments/${masterId}/slaves?${params}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setSlaves(result.data || []);
        setMetadata({
          total: result.metadata?.total || 0,
          totalPages: result.metadata?.totalPages || 0
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (masterId) fetchSlaves();
  }, [masterId, page, debouncedSearch]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  if (loading && page === 1 && !debouncedSearch) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-slate-700">Associated Slave PLs</h3>
        <div className="relative w-full max-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input 
            placeholder="Search slaves..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>
      </div>

      <div className="rounded-md border overflow-hidden bg-white shadow-sm">
        <div className="max-h-[300px] overflow-auto custom-scrollbar">
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-sm">
              <TableRow>
                <TableHead className="text-xs h-9">Nomor Slave</TableHead>
                <TableHead className="text-xs h-9 text-right">Items Taken</TableHead>
                <TableHead className="text-xs h-9">Area</TableHead>
                <TableHead className="text-xs h-9">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-slate-300" />
                  </TableCell>
                </TableRow>
              ) : slaves.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-slate-500 text-xs italic">
                    {debouncedSearch ? "No matching slaves found." : "No Slave PLs associated yet."}
                  </TableCell>
                </TableRow>
              ) : (
                slaves.map((slave) => (
                  <TableRow key={slave.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="text-xs py-2.5 font-medium">{slave.nomor}</TableCell>
                    <TableCell className="text-xs py-2.5 text-right">
                      <Badge variant="secondary" className="font-mono text-[10px] px-1.5 h-5 bg-slate-100 text-slate-700 border-none">
                        {slave.productCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs py-2.5 text-slate-600">{slave.area}</TableCell>
                    <TableCell className="text-xs py-2.5 text-slate-500">
                      {new Date(slave.timestamp).toLocaleDateString("id-ID")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {metadata.totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-[10px] text-slate-500 font-medium">
            Total {metadata.total} slaves
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <span className="text-xs font-medium text-slate-600 px-2">
              {page} / {metadata.totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => setPage(p => Math.min(metadata.totalPages, p + 1))}
              disabled={page === metadata.totalPages || loading}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
      
      <p className="text-[10px] text-slate-400 italic">
        * "Items Taken" counts only products from this specific Master PL.
      </p>
    </div>
  );
}
