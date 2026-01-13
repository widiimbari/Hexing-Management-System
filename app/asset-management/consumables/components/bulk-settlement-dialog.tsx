"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface BulkSettlementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentNumber: string | null;
  items: any[]; // Individual items for this doc
  onSave: () => void;
}

export function BulkSettlementDialog({ open, onOpenChange, documentNumber, items, onSave }: BulkSettlementDialogProps) {
  const [loading, setLoading] = useState(false);
  const [settlementDate, setSettlementDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [itemsData, setItemsData] = useState<any[]>([]);

  useEffect(() => {
    if (open && items.length > 0) {
      // Initialize items data with estimated values
      setItemsData(items.filter(i => i.status === "PENDING").map(i => ({
        id: i.id,
        item_name: i.item_name,
        brand_type: i.brand_type,
        qty_actual: i.qty_estimated.toString(),
        unit_price_real: i.price_estimated.toString()
      })));
    }
  }, [open, items]);

  const handleItemChange = (id: string, field: string, value: string) => {
    setItemsData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateGrandTotal = () => {
    return itemsData.reduce((acc, item) => {
      const subtotal = (parseFloat(item.qty_actual) || 0) * (parseFloat(item.unit_price_real) || 0);
      return acc + subtotal + (subtotal * 0.03);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itemsData.length === 0) return;
    if (!receiptImage) {
        alert("Please upload a receipt image for the combined invoice.");
        return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("settlement_date", settlementDate);
      payload.append("receipt_image", receiptImage);
      payload.append("items_data", JSON.stringify(itemsData));

      const res = await fetch("/api/assets/consumables/bulk-settle", {
        method: "PATCH",
        body: payload,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to settle requests");
      
      onSave();
      onOpenChange(false);
      setReceiptImage(null);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error settling requests");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl">Bulk Settlement (Combined Invoice)</DialogTitle>
          <p className="text-sm text-muted-foreground">Document: {documentNumber}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-6 flex-1 overflow-hidden flex flex-col">
            <div className="grid grid-cols-2 gap-6 shrink-0">
              <div className="space-y-2">
                <Label>Purchase/Received Date</Label>
                <Input 
                  type="date"
                  required
                  value={settlementDate}
                  onChange={e => setSettlementDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Combined Invoice/Receipt</Label>
                <Input 
                  type="file"
                  accept="image/*"
                  required
                  onChange={e => e.target.files?.[0] && setReceiptImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden border rounded-lg">
                <div className="bg-slate-50 px-4 py-2 border-b flex justify-between items-center shrink-0">
                    <span className="text-sm font-semibold">Items to Settle</span>
                    <span className="text-xs text-muted-foreground">{itemsData.length} Items selected</span>
                </div>
                <ScrollArea className="flex-1">
                    <Table>
                        <TableHeader className="bg-white sticky top-0 z-10">
                            <TableRow>
                                <TableHead>Item Description</TableHead>
                                <TableHead className="w-[100px] text-center">Qty</TableHead>
                                <TableHead className="w-[180px]">Unit Price (Real)</TableHead>
                                <TableHead className="w-[150px] text-right">Subtotal + 3%</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {itemsData.map((item) => {
                                const sub = (parseFloat(item.qty_actual) || 0) * (parseFloat(item.unit_price_real) || 0);
                                const total = sub + (sub * 0.03);
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="text-sm font-medium">{item.item_name}</div>
                                            <div className="text-xs text-muted-foreground">{item.brand_type || "-"}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Input 
                                                type="number" 
                                                className="h-8 text-center"
                                                value={item.qty_actual}
                                                onChange={e => handleItemChange(item.id, "qty_actual", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input 
                                                type="number" 
                                                className="h-8"
                                                value={item.unit_price_real}
                                                onChange={e => handleItemChange(item.id, "unit_price_real", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {formatCurrency(total)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
          </div>

          <div className="p-6 border-t bg-slate-50 flex items-center justify-between shrink-0">
            <div className="text-left">
                <p className="text-sm text-muted-foreground font-medium">Total Document Amount</p>
                <p className="text-2xl font-bold text-blue-700">{formatCurrency(calculateGrandTotal())}</p>
            </div>
            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading || itemsData.length === 0} className="bg-blue-600 hover:bg-blue-700 min-w-[150px]">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                    Settle All Items
                </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
