"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface UsageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: any;
  onSave: () => void;
}

export function UsageDialog({ open, onOpenChange, item, onSave }: UsageDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    qty_used: "1",
    location: "",
    remarks: "",
    usage_date: format(new Date(), "yyyy-MM-dd"),
  });

  const totalUsed = item?.usage_history?.reduce((sum: number, u: any) => sum + u.qty_used, 0) || 0;
  const available = (item?.qty_actual || 0) - totalUsed;

  useEffect(() => {
    if (open) {
        setFormData({
            qty_used: "1",
            location: "",
            remarks: "",
            usage_date: format(new Date(), "yyyy-MM-dd"),
        });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    if (parseInt(formData.qty_used) > available) {
        alert("Qty used cannot exceed available stock!");
        return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/assets/consumables/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consumable_id: item.id,
          ...formData
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to record usage");
      
      onSave();
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error recording usage");
    } finally {
      setLoading(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record Usage (Stock Out)</DialogTitle>
          <DialogDescription>
             Record a new usage or stock out for this item. This will reduce the available inventory.
          </DialogDescription>
          <div className="mt-2 p-3 bg-slate-50 rounded-lg border text-sm">
            <p className="font-semibold text-slate-700">{item.item_name}</p>
            <div className="flex justify-between mt-1 text-slate-500">
                <span>Current Available Stock:</span>
                <span className="font-bold text-blue-600">{available} Unit</span>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Usage Date</Label>
                <Input 
                type="date"
                required
                value={formData.usage_date}
                onChange={e => setFormData({...formData, usage_date: e.target.value})}
                />
            </div>
            <div className="space-y-2">
                <Label>Qty to Use</Label>
                <Input 
                type="number"
                min="1"
                max={available}
                required
                value={formData.qty_used}
                onChange={e => setFormData({...formData, qty_used: e.target.value})}
                />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Used at (Location/Machine)</Label>
            <Input 
              required
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              placeholder="e.g. Line 1, Office Room 3, Machine A"
            />
          </div>

          <div className="space-y-2">
            <Label>Remarks / Purpose</Label>
            <Input 
              value={formData.remarks}
              onChange={e => setFormData({...formData, remarks: e.target.value})}
              placeholder="e.g. Replacement for broken part"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading || available <= 0}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Confirm Usage
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
