"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmployeeFormData {
  nik: string;
  nama: string;
  gender: string;
  department_id: string;
}

interface Department {
  id: string;
  name: string;
}

interface EmployeeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: any;
  departments: Department[];
  onSave: (data: EmployeeFormData) => void;
  loading?: boolean;
}

export function EmployeeFormDialog({ 
  open, 
  onOpenChange, 
  employee, 
  departments,
  onSave, 
  loading = false 
}: EmployeeFormDialogProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    nik: "",
    nama: "",
    gender: "",
    department_id: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        nik: employee.nik || "",
        nama: employee.nama || "",
        gender: employee.gender || "",
        department_id: employee.department_id || "",
      });
    } else {
      setFormData({
        nik: "",
        nama: "",
        gender: "",
        department_id: "",
      });
    }
  }, [employee, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {employee ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nik">NIK</Label>
            <Input
              id="nik"
              value={formData.nik}
              onChange={(e) => handleInputChange("nik", e.target.value)}
              placeholder="Enter NIK"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nama">Full Name</Label>
            <Input
              id="nama"
              value={formData.nama}
              onChange={(e) => handleInputChange("nama", e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Male</SelectItem>
                <SelectItem value="P">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department_id}
              onValueChange={(value) => handleInputChange("department_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
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
              {loading ? "Saving..." : employee ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}