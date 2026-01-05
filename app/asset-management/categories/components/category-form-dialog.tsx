"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryFormData {
  name: string;
}

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: any;
  onSave: (data: CategoryFormData) => void;
  loading?: boolean;
}

export function CategoryFormDialog({ 
  open, 
  onOpenChange, 
  category, 
  onSave, 
  loading = false 
}: CategoryFormDialogProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
      });
    } else {
      setFormData({
        name: "",
      });
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Add automatic timestamps
    const submitData = {
      ...formData,
      created_at: category ? undefined : new Date(), // Only set created_at for new items
      updated_at: new Date(), // Always set updated_at
    };
    
    onSave(submitData);
  };

  const handleInputChange = (field: keyof CategoryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter category name"
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
              {loading ? "Saving..." : category ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}