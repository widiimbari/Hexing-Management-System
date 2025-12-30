"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

interface Supplier {
  id: string;
  name: string;
}

interface Area {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
  area_id: string;
}

interface Employee {
  id: string;
  nik: string;
  nama: string;
  gender: string;
}

interface AssetFormData {
  type: string;
  serial_number: string;
  sap_id: string;
  image: string;
  imageFile?: File | null;
  purchase_date: Date | undefined;
  category_id: string;
  brand_id: string;
  area_id: string;
  location_id: string;
  employee_id: string;
  supplier_id: string;
}

interface AssetFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset?: any;
  onSave: (data: AssetFormData) => void;
  loading?: boolean;
}

const typeOptions = [
  "Hardware",
  "Software",
  "Furniture",
  "Vehicle",
  "Equipment",
  "Other"
];

export function AssetFormDialog({ 
  open, 
  onOpenChange, 
  asset, 
  onSave, 
  loading = false 
}: AssetFormDialogProps) {
  const [formData, setFormData] = useState<AssetFormData>({
    type: "",
    serial_number: "",
    sap_id: "",
    image: "",
    imageFile: null,
    purchase_date: undefined,
    category_id: "",
    brand_id: "",
    area_id: "",
    location_id: "",
    employee_id: "",
    supplier_id: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [categoriesRes, brandsRes, suppliersRes, areasRes, locationsRes, employeesRes] = await Promise.all([
          fetch("/api/assets/categories"),
          fetch("/api/assets/brands"),
          fetch("/api/assets/suppliers"),
          fetch("/api/assets/areas"),
          fetch("/api/assets/locations"),
          fetch("/api/assets/employees"),
        ]);

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.data || []);
        }

        if (brandsRes.ok) {
          const brandsData = await brandsRes.json();
          setBrands(brandsData.data || []);
        }

        if (suppliersRes.ok) {
          const suppliersData = await suppliersRes.json();
          setSuppliers(suppliersData.data || []);
        }

        if (areasRes.ok) {
          const areasData = await areasRes.json();
          setAreas(areasData.data || []);
        }

        if (locationsRes.ok) {
          const locationsData = await locationsRes.json();
          setLocations(locationsData.data || []);
        }

        if (employeesRes.ok) {
          const employeesData = await employeesRes.json();
          setEmployees(employeesData.data || []);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    if (open) {
      fetchDropdownData();
    }
  }, [open]);

  useEffect(() => {
    if (asset) {
      setFormData({
        type: asset.type || "",
        serial_number: asset.serial_number || "",
        sap_id: asset.sap_id || "",
        image: asset.image || "",
        imageFile: null,
        purchase_date: asset.purchase_date ? new Date(asset.purchase_date) : undefined,
        category_id: asset.category_id || "",
        brand_id: asset.brand_id || "",
        area_id: asset.area_id || "",
        location_id: asset.location_id || "",
        employee_id: asset.employee_id || "",
        supplier_id: asset.supplier_id || "",
      });
    } else {
      setFormData({
        type: "",
        serial_number: "",
        sap_id: "",
        image: "",
        imageFile: null,
        purchase_date: undefined,
        category_id: "",
        brand_id: "",
        area_id: "",
        location_id: "",
        employee_id: "",
        supplier_id: "",
      });
    }
  }, [asset, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof AssetFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {asset ? "Edit Asset" : "Add New Asset"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Asset Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serial_number">Serial Number</Label>
              <Input
                id="serial_number"
                value={formData.serial_number}
                onChange={(e) => handleInputChange("serial_number", e.target.value)}
                placeholder="Enter serial number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sap_id">SAP ID</Label>
              <Input
                id="sap_id"
                value={formData.sap_id}
                onChange={(e) => handleInputChange("sap_id", e.target.value)}
                placeholder="Enter SAP ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Asset Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.image && !formData.imageFile && (
                <p className="text-sm text-muted-foreground mt-1">Current image: {formData.image}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => handleInputChange("category_id", value)}
                disabled={loadingData}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select
                value={formData.brand_id}
                onValueChange={(value) => handleInputChange("brand_id", value)}
                disabled={loadingData}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area</Label>
              <Select
                value={formData.area_id}
                onValueChange={(value) => {
                  handleInputChange("area_id", value);
                  // Reset location when area changes
                  setFormData(prev => ({ ...prev, location_id: "" }));
                }}
                disabled={loadingData}
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

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={formData.location_id}
                onValueChange={(value) => handleInputChange("location_id", value)}
                disabled={loadingData || !formData.area_id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations
                    .filter(location => location.area_id === formData.area_id)
                    .map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employee">Employee</Label>
              <Select
                value={formData.employee_id}
                onValueChange={(value) => handleInputChange("employee_id", value)}
                disabled={loadingData}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.nik} - {employee.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier Record</Label>
              <Select
                value={formData.supplier_id}
                onValueChange={(value) => handleInputChange("supplier_id", value)}
                disabled={loadingData}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier record" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchase_date">Purchase Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.purchase_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.purchase_date ? 
                      format(formData.purchase_date, "PPP") : 
                      "Pick a date"
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.purchase_date}
                    onSelect={(date) => handleInputChange("purchase_date", date)}
                  />
                </PopoverContent>
              </Popover>
            </div>
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
            <Button type="submit" disabled={loading || loadingData}>
              {loading ? "Saving..." : asset ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}