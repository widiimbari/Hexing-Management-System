"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TypeFormData {
  name: string;
}

interface TypeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetType?: any;
  onSave: (data: TypeFormData) => void;
  loading?: boolean;
}

export function TypeFormDialog({ 
  open, 
  onOpenChange, 
  assetType, 
  onSave, 
  loading = false 
}: TypeFormDialogProps) {
  const [formData, setFormData] = useState<TypeFormData>({
    name: "",
  });

  useEffect(() => {
    if (assetType) {
      setFormData({
        name: assetType.name || "",
      });
    } else {
      setFormData({
        name: "",
      });
    }
  }, [assetType, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof TypeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {assetType ? "Edit Asset Type" : "Add New Asset Type"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Type Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter type name"
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
              {loading ? "Saving..." : assetType ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}