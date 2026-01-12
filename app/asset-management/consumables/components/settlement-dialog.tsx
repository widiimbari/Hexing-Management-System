"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

interface SettlementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: any;
  onSave: () => void;
}

export function SettlementDialog({ open, onOpenChange, request, onSave }: SettlementDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    qty_actual: "",
    unit_price_real: "",
    settlement_date: format(new Date(), "yyyy-MM-dd"),
    receipt_image: null as File | null,
  });

  useEffect(() => {
    if (request) {
      setFormData({
        qty_actual: request.qty_estimated.toString(),
        unit_price_real: request.price_estimated.toString(),
        settlement_date: format(new Date(), "yyyy-MM-dd"),
        receipt_image: null,
      });
    }
  }, [request]);

  const qty = parseFloat(formData.qty_actual) || 0;
  const price = parseFloat(formData.unit_price_real) || 0;
  const subtotal = qty * price;
  const shipping = subtotal * 0.03;
  const grandTotal = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("qty_actual", formData.qty_actual);
      payload.append("unit_price_real", formData.unit_price_real);
      payload.append("settlement_date", formData.settlement_date);
      payload.append("status", "COMPLETED");
      if (formData.receipt_image) {
        payload.append("receipt_image", formData.receipt_image);
      }

      const res = await fetch(`/api/assets/consumables/${request.id}`, {
        method: "PATCH",
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to settle request");
      
      onSave();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      alert("Error settling request");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Goods Receipt / Settlement</DialogTitle>
          <p className="text-sm text-muted-foreground">Ref: {request.item_name} ({request.brand_type || "-"})</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Received Date</Label>
            <Input 
              type="date"
              required
              value={formData.settlement_date}
              onChange={e => setFormData({...formData, settlement_date: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Qty Received</Label>
              <Input 
                type="number"
                min="1"
                required
                value={formData.qty_actual}
                onChange={e => setFormData({...formData, qty_actual: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Real Unit Price (IDR)</Label>
              <Input 
                type="number"
                min="0"
                required
                value={formData.unit_price_real}
                onChange={e => setFormData({...formData, unit_price_real: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Item Price:</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping Fee (3%):</span>
              <span className="font-medium text-blue-600">{formatCurrency(shipping)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between text-base font-bold">
              <span>TOTAL PAID:</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload Receipt/Invoice</Label>
            <Input 
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files?.[0]) {
                  setFormData({...formData, receipt_image: e.target.files[0]});
                }
              }}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>Save & Complete</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
