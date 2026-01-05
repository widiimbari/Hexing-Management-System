"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface MoveAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
  onSuccess: () => void;
}

export function MoveAssetDialog({ open, onOpenChange, asset, onSuccess }: MoveAssetDialogProps) {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [locationId, setLocationId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [reason, setReason] = useState("");
  const [dateTime, setDateTime] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
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
  }, [open]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsRes, areasRes] = await Promise.all([
          fetch("/api/assets/locations?limit=0"),
          fetch("/api/assets/areas?limit=0")
        ]);
        
        const locationsData = await locationsRes.json();
        const areasData = await areasRes.json();
        
        setLocations(locationsData.data || []);
        setAreas(areasData.data || []);
      } catch (e) {
        console.error(e);
      }
    };
    if (open) fetchData();
  }, [open]);

  useEffect(() => {
    if (asset) {
      if (asset.location_id) {
        setLocationId(String(asset.location_id));
      }
      if (asset.area_id) {
        setAreaId(String(asset.area_id));
      }
    }
  }, [asset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asset || !areaId || !locationId) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('action_type', 'RELOCATION');
      formData.append('new_area_id', areaId);
      formData.append('new_location_id', locationId);
      formData.append('remarks', reason);
      
      if (file) {
        formData.append('attachment', file);
      }
      
      // Send date time
      formData.append('date', dateTime);
      
      // Also send timezone info
      formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);

      const res = await fetch(`/api/assets/${asset.id}/actions`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to move asset");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to move asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>Move Asset</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Asset</Label>
            <Input value={asset?.serial_number} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Current Location</Label>
            <Input value={asset?.location?.name || "Unknown"} disabled />
          </div>

          <div className="space-y-2">
            <Label>New Area</Label>
            <Select value={areaId} onValueChange={(val) => {
              setAreaId(val);
              setLocationId("");
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select new area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.id}>
                    {area.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>New Location</Label>
            <Select value={locationId} onValueChange={setLocationId} disabled={!areaId}>
              <SelectTrigger>
                <SelectValue placeholder="Select new location" />
              </SelectTrigger>
              <SelectContent>
                {locations
                  .filter((loc) => loc.area_id === areaId)
                  .map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.name}
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
              placeholder="Why is it moving?" 
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
            <Button type="submit" disabled={loading || !areaId || !locationId}>{loading ? "Saving..." : "Move Asset"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}