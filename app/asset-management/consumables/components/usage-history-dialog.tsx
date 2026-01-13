"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { History, MapPin, MessageSquare, Calendar } from "lucide-react";

interface UsageHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: any;
}

export function UsageHistoryDialog({ open, onOpenChange, item }: UsageHistoryDialogProps) {
  if (!item) return null;

  const history = item.usage_history || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-blue-600" />
            Usage History: {item.item_name}
          </DialogTitle>
          <DialogDescription>
            View the complete usage history and stock out records for this item.
          </DialogDescription>
          <div className="mt-1 text-sm text-muted-foreground">
            Total Qty Bought: <span className="font-semibold">{item.qty_actual}</span> | 
            Remaining: <span className="font-semibold text-emerald-600">
                {item.qty_actual - history.reduce((sum: number, u: any) => sum + u.qty_used, 0)}
            </span>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full border rounded-md">
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0">
              <TableRow>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead className="text-center w-[80px]">Qty</TableHead>
                <TableHead>Location / Machine</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No usage recorded for this item.
                  </TableCell>
                </TableRow>
              ) : (
                history.sort((a: any, b: any) => new Date(b.usage_date).getTime() - new Date(a.usage_date).getTime()).map((record: any) => (
                  <TableRow key={record.id}>
                    <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            {format(new Date(record.usage_date), "dd MMM yyyy")}
                        </div>
                    </TableCell>
                    <TableCell className="text-center font-bold text-blue-600">
                        {record.qty_used}
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            {record.location || "-"}
                        </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-slate-500 italic">
                        <div className="flex items-center gap-1.5">
                            <MessageSquare className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{record.remarks || "-"}</span>
                        </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
