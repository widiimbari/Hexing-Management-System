"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LocationFormData {
  name: string;
  area_id: string;
}

interface Area {
  id: string;
  name: string;
}

interface LocationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location?: any;
  areas: Area[];
  onSave: (data: LocationFormData) => void;
  loading?: boolean;
}

export function LocationFormDialog({ 
  open, 
  onOpenChange, 
  location, 
  areas,
  onSave, 
  loading = false 
}: LocationFormDialogProps) {
  const [formData, setFormData] = useState<LocationFormData>({
    name: "",
    area_id: "",
  });

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name || "",
        area_id: location.area_id || "",
      });
    } else {
      setFormData({
        name: "",
        area_id: "",
      });
    }
  }, [location, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof LocationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {location ? "Edit Location" : "Add New Location"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Location Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter location name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Select
              value={formData.area_id}
              onValueChange={(value) => handleInputChange("area_id", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
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

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : location ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}