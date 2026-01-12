"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function RequestDialog({ open, onOpenChange, onSave }: RequestDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    item_name: "",
    brand_type: "",
    qty_estimated: "1",
    price_estimated: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/assets/consumables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create request");
      
      onSave();
      onOpenChange(false);
      setFormData({ item_name: "", brand_type: "", qty_estimated: "1", price_estimated: "" });
    } catch (error) {
      console.error(error);
      alert("Error creating request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Purchase Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Item Name</Label>
            <Input 
              required
              value={formData.item_name}
              onChange={e => setFormData({...formData, item_name: e.target.value})}
              placeholder="e.g., SSD Internal SATA III"
            />
          </div>
          <div className="space-y-2">
            <Label>Brand/Type</Label>
            <Input 
              value={formData.brand_type}
              onChange={e => setFormData({...formData, brand_type: e.target.value})}
              placeholder="e.g., Teamgroup GX2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Est. Qty</Label>
              <Input 
                type="number"
                min="1"
                required
                value={formData.qty_estimated}
                onChange={e => setFormData({...formData, qty_estimated: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Est. Unit Price (IDR)</Label>
              <Input 
                type="number"
                min="0"
                required
                value={formData.price_estimated}
                onChange={e => setFormData({...formData, price_estimated: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>Create Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
