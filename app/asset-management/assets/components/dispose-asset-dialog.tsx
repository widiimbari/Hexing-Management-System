"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DisposeAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
  onSuccess: () => void;
}

export function DisposeAssetDialog({ open, onOpenChange, asset, onSuccess }: DisposeAssetDialogProps) {
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

    if (!confirm("Are you sure you want to dispose of this asset? This action will mark it as DISPOSED.")) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('action_type', 'DISPOSE'); // Or 'CONDITION_CHANGE' with 'DISPOSED'? 
      // The API handles 'CONDITION_CHANGE' with 'DISPOSED' or generic types.
      // Let's assume action_type 'CONDITION_CHANGE' + new_condition 'DISPOSED' is the convention,
      // OR a dedicated 'DISPOSE' action. 
      // Checking actions/route.ts:
      // it handles 'CONDITION_CHANGE'.
      // If I send 'DISPOSE', it just logs it but doesn't update condition unless I add logic.
      // Let's use CONDITION_CHANGE and force DISPOSED.
      formData.append('action_type', 'CONDITION_CHANGE');
      formData.append('new_condition', 'DISPOSED');
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
        throw new Error(errorData.message || "Failed to dispose asset");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to dispose asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>Dispose Asset</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-red-50 p-3 rounded-md text-red-800 text-sm mb-4">
            Warning: This will mark the asset as DISPOSED.
          </div>
          
          <div className="space-y-2">
            <Label>Asset</Label>
            <Input value={asset?.serial_number} disabled />
          </div>

          <div className="space-y-2">
            <Label>Disposal Reason</Label>
            <Textarea 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              placeholder="Why is it being disposed?" 
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
            <Button type="submit" variant="destructive" disabled={loading}>{loading ? "Disposing..." : "Dispose Asset"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
