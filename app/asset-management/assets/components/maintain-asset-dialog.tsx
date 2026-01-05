"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MaintainAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
  onSuccess: () => void;
}

export function MaintainAssetDialog({ open, onOpenChange, asset, onSuccess }: MaintainAssetDialogProps) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    if (open) {
      const now = new Date();
      // Format to YYYY-MM-DDTHH:mm for datetime-local input
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asset) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('action_type', 'MAINTENANCE');
      formData.append('remarks', reason);
      
      // Send date time
      const dateTimeStr = `${dateTime}:00`;
      const utcDateTimeStr = dateTimeStr.endsWith('Z') ? dateTimeStr : `${dateTimeStr}Z`;
      formData.append('date', utcDateTimeStr);

      const res = await fetch(`/api/assets/${asset.id}/actions`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to log maintenance");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to log maintenance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>Log Maintenance</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Asset</Label>
            <Input value={asset?.serial_number} disabled />
          </div>

          <div className="space-y-2">
            <Label>Maintenance Details</Label>
            <Textarea 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              placeholder="What maintenance was performed?" 
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Date & Time</Label>
            <Input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Log Maintenance"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
