"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AssignAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
  onSuccess: () => void;
}

export function AssignAssetDialog({ open, onOpenChange, asset, onSuccess }: AssignAssetDialogProps) {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [reason, setReason] = useState("");
  const [dateTime, setDateTime] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/assets/employees?limit=0");
        const data = await res.json();
        setEmployees(data.data || []);
      } catch (e) {
        console.error(e);
      }
    };
    if (open) fetchData();
  }, [open]);

  useEffect(() => {
    if (asset && asset.employee_id) {
      setEmployeeId(String(asset.employee_id));
    } else {
      setEmployeeId("");
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
    if (!asset || !employeeId) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('action_type', 'ASSIGNMENT');
      formData.append('new_employee_id', employeeId);
      formData.append('remarks', reason);
      
      if (file) {
        formData.append('attachment', file);
      }
      
      // Send date time
      // Force UTC interpretation
      const utcDateTimeStr = dateTime.endsWith('Z') ? dateTime : `${dateTime}Z`;
      formData.append('date', utcDateTimeStr);
      
      const res = await fetch(`/api/assets/${asset.id}/actions`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to assign asset");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to assign asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>Assign Asset</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Asset</Label>
            <Input value={asset?.serial_number} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Current Holder</Label>
            <Input value={asset?.employee?.nama || "Unassigned"} disabled />
          </div>

          <div className="space-y-2">
            <Label>New Holder (Employee)</Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassign">(Unassign)</SelectItem>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.nik} - {emp.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Reason / Remarks</Label>
            <Textarea 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              placeholder="Why is it being assigned/returned?" 
            />
          </div>

          <div className="space-y-2">
            <Label>Document Attachment (Optional)</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
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
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Assign Asset"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
