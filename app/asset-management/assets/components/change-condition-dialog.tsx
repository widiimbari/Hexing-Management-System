"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const conditions = [
  { value: "Good", label: "Good" },
  { value: "Slightly Damaged", label: "Slightly Damaged" },
  { value: "Damaged", label: "Damaged" },
  { value: "Broken", label: "Broken" },
  { value: "Disposed", label: "Disposed" },
  { value: "Lost", label: "Lost" },
];

interface ChangeConditionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
  onSuccess: () => void;
}

export function ChangeConditionDialog({ open, onOpenChange, asset, onSuccess }: ChangeConditionDialogProps) {
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState("");
  const [reason, setReason] = useState("");
  const [dateTime, setDateTime] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (asset) {
      const currentCondition = asset.condition 
        ? asset.condition.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
        : "Good";
      setCondition(currentCondition);
    }
    if (open) {
      const now = new Date();
      // Format to YYYY-MM-DDTHH:mm for datetime-local input
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setDateTime(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
    }
  }, [asset, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asset) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('action_type', 'CONDITION_CHANGE');
      formData.append('new_condition', condition);
      formData.append('remarks', reason);
      
      if (dateTime) {
        // Send date time
        formData.append('date', dateTime);
      }
      
      // Also send timezone info
      formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
      
      if (file) {
        formData.append('attachment', file);
      }

      const res = await fetch(`/api/assets/${asset.id}/actions`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update condition");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to update condition");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>Change Asset Condition</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Asset</Label>
            <Input value={asset?.serial_number} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Current Condition</Label>
            <Input value={asset?.condition?.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || "Unknown"} disabled />
          </div>

          <div className="space-y-2">
            <Label>New Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Reason / Remarks</Label>
            <Textarea 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              placeholder="Why is condition changing?" 
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Attachment (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input 
                type="file" 
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date & Time</Label>
            <Input
              type="datetime-local"
              step="1"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}