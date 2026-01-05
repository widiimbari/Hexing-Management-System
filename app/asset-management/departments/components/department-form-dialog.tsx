"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DepartmentFormData {
  name: string;
}

interface DepartmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: any;
  onSave: (data: DepartmentFormData) => void;
  loading?: boolean;
}

export function DepartmentFormDialog({ 
  open, 
  onOpenChange, 
  department, 
  onSave, 
  loading = false 
}: DepartmentFormDialogProps) {
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: "",
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || "",
      });
    } else {
      setFormData({
        name: "",
      });
    }
  }, [department, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Add automatic timestamps
    const submitData = {
      ...formData,
      created_at: department ? undefined : new Date(), // Only set created_at for new items
      updated_at: new Date(), // Always set updated_at
    };
    
    onSave(submitData);
  };

  const handleInputChange = (field: keyof DepartmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {department ? "Edit Department" : "Add New Department"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter department name"
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
              {loading ? "Saving..." : department ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}