"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AreaFormData {
  name: string;
}

interface AreaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area?: any;
  onSave: (data: AreaFormData) => void;
  loading?: boolean;
}

export function AreaFormDialog({ 
  open, 
  onOpenChange, 
  area, 
  onSave, 
  loading = false 
}: AreaFormDialogProps) {
  const [formData, setFormData] = useState<AreaFormData>({
    name: "",
  });

  useEffect(() => {
    if (area) {
      setFormData({
        name: area.name || "",
      });
    } else {
      setFormData({
        name: "",
      });
    }
  }, [area, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Add automatic timestamps
    const submitData = {
      ...formData,
      created_at: area ? undefined : new Date(), // Only set created_at for new items
      updated_at: new Date(), // Always set updated_at
    };
    
    onSave(submitData);
  };

  const handleInputChange = (field: keyof AreaFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {area ? "Edit Area" : "Add New Area"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Area Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter area name"
              required
            />
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
              {loading ? "Saving..." : area ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}