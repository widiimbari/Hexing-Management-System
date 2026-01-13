"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function RequestDialog({ open, onOpenChange, onSave }: RequestDialogProps) {
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [mode, setMode] = useState<'new' | 'existing'>('new');
  const [selectedDoc, setSelectedDoc] = useState("");
  
  const [formData, setFormData] = useState({
    item_name: "",
    brand_type: "",
    qty_estimated: "1",
    price_estimated: "",
    purchase_link: "",
    remarks: "",
    item_image: null as File | null,
  });

  useEffect(() => {
    if (open) {
        fetchDocuments();
    }
  }, [open]);

  const fetchDocuments = async () => {
    try {
        const res = await fetch("/api/assets/consumables/documents");
        const result = await res.json();
        // Filter documents that are likely active (e.g. created recently or have pending items)
        // For now, let's show all, or filter client side if needed. 
        // Showing all might be too much, but let's assume the user knows which one.
        // Or sort by date desc (API already does).
        setDocuments(result.data || []);
    } catch (err) {
        console.error("Failed to fetch documents", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'existing' && !selectedDoc) {
        alert("Please select a document");
        return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("item_name", formData.item_name);
      payload.append("brand_type", formData.brand_type);
      payload.append("qty_estimated", formData.qty_estimated);
      payload.append("price_estimated", formData.price_estimated);
      payload.append("purchase_link", formData.purchase_link);
      payload.append("remarks", formData.remarks);
      if (formData.item_image) {
        payload.append("item_image", formData.item_image);
      }
      
      if (mode === 'existing') {
          payload.append("existing_document_number", selectedDoc);
      }

      const res = await fetch("/api/assets/consumables", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to create request");
      
      onSave();
      onOpenChange(false);
      setFormData({ 
        item_name: "", 
        brand_type: "", 
        qty_estimated: "1", 
        price_estimated: "", 
        purchase_link: "",
        remarks: "",
        item_image: null 
      });
      setMode('new');
      setSelectedDoc("");
    } catch (error) {
      console.error(error);
      alert("Error creating request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Purchase Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Document Mode Selection */}
          <div className="space-y-2 pb-2 border-b">
            <Label>Document Type</Label>
            <RadioGroup defaultValue="new" value={mode} onValueChange={(v: any) => setMode(v)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="r-new" />
                    <Label htmlFor="r-new" className="font-normal cursor-pointer">New Document</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="r-existing" />
                    <Label htmlFor="r-existing" className="font-normal cursor-pointer">Add to Existing</Label>
                </div>
            </RadioGroup>
          </div>

          {mode === 'existing' && (
              <div className="space-y-2">
                <Label>Select Document</Label>
                <Select value={selectedDoc} onValueChange={setSelectedDoc}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a document..." />
                    </SelectTrigger>
                    <SelectContent>
                        {documents.filter((d: any) => d.pending_items > 0).length === 0 ? (
                            <SelectItem value="none" disabled>No active documents found</SelectItem>
                        ) : (
                            documents.filter((d: any) => d.pending_items > 0).map((doc: any) => (
                                <SelectItem key={doc.document_number} value={doc.document_number}>
                                    {doc.document_number} 
                                    <span className="text-xs text-muted-foreground ml-2">
                                        ({doc.pending_items} pending)
                                    </span>
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>
              </div>
          )}

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
          <div className="space-y-2">
            <Label>Remarks (Purpose)</Label>
            <Input 
            value={formData.remarks}
            onChange={e => setFormData({...formData, remarks: e.target.value})}
            placeholder="e.g. For Backup"
            />
          </div>
          <div className="space-y-2">
            <Label>Purchase Link (Optional)</Label>
            <Input 
              value={formData.purchase_link}
              onChange={e => setFormData({...formData, purchase_link: e.target.value})}
              placeholder="https://tokopedia.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label>Sample Image (Optional)</Label>
            <Input 
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files?.[0]) {
                  setFormData({...formData, item_image: e.target.files[0]});
                }
              }}
            />
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
