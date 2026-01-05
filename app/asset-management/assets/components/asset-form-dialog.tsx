"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AssetType {
  id: string;
  name: string;
}

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
  type_id: string;
  serial_number: string;
  sap_id: string;
  imageFiles: File[];
  purchase_date: Date | undefined;
  category_id: string;
  brand_id: string;
  area_id: string;
  location_id: string;
  employee_id: string;
  supplier_id: string;
  condition: string;
}

interface AssetFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset?: any;
  onSave: (data: AssetFormData) => void;
  loading?: boolean;
}

const conditions = [
  { value: "Good", label: "Good" },
  { value: "Slightly_Damaged", label: "Slightly Damaged" },
  { value: "Damaged", label: "Damaged" },
  { value: "Broken", label: "Broken" },
  { value: "Disposed", label: "Disposed" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Lost", label: "Lost" },
];

export function AssetFormDialog({ 
  open, 
  onOpenChange, 
  asset, 
  onSave, 
  loading = false 
}: AssetFormDialogProps) {
  const [formData, setFormData] = useState<AssetFormData>({
    type_id: "",
    serial_number: "",
    sap_id: "",
    imageFiles: [],
    purchase_date: undefined,
    category_id: "",
    brand_id: "",
    area_id: "",
    location_id: "",
    employee_id: "",
    supplier_id: "",
    condition: "Good",
  });

  const [types, setTypes] = useState<AssetType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [sapIdError, setSapIdError] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // 1. PERBAIKAN: useEffect untuk Fetch Data Dropdown
  useEffect(() => {
    const fetchDropdownData = async () => {
      setLoadingData(true);
      try {
        const [typesRes, categoriesRes, brandsRes, suppliersRes, areasRes, locationsRes, employeesRes] = await Promise.all([
          fetch("/api/assets/types?limit=0"),
          fetch("/api/assets/categories?limit=0"),
          fetch("/api/assets/brands?limit=0"),
          fetch("/api/assets/suppliers?limit=0"),
          fetch("/api/assets/areas?limit=0"),
          fetch("/api/assets/locations?limit=0"),
          fetch("/api/assets/employees?limit=0"),
        ]);

        if (typesRes.ok) {
          const typesData = await typesRes.json();
          setTypes(typesData.data || []);
        }

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

  // 2. useEffect untuk Inisialisasi Data Edit
  useEffect(() => {
    if (asset) {
      // Helper to map DB condition (ALL CAPS) to Title Case for Form
      const mapConditionToForm = (c: string) => {
        if (!c) return "Good";
        return c.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      };

      setFormData({
        type_id: asset.type_id || "",
        serial_number: asset.serial_number || "",
        sap_id: asset.sap_id || "",
        imageFiles: [],
        purchase_date: asset.purchase_date ? new Date(asset.purchase_date) : undefined,
        category_id: asset.category_id || "",
        brand_id: asset.brand_id || "",
        area_id: asset.area_id || "",
        location_id: asset.location_id || "",
        employee_id: asset.employee_id || "",
        supplier_id: asset.supplier_id || "",
        condition: mapConditionToForm(asset.condition),
      });
      
      // Set initial image previews
      if (asset.asset_images && asset.asset_images.length > 0) {
        setImagePreviews(asset.asset_images.map((img: any) => img.url));
      } else if (asset.main_image) {
        setImagePreviews([asset.main_image.url]);
      } else {
        setImagePreviews([]);
      }
    } else {
      // Reset form for add mode
      setFormData({
        type_id: "",
        serial_number: "",
        sap_id: "",
        imageFiles: [],
        purchase_date: undefined,
        category_id: "",
        brand_id: "",
        area_id: "",
        location_id: "",
        employee_id: "",
        supplier_id: "",
        condition: "Good",
      });
      setImagePreviews([]);
      setSapIdError("");
    }
  }, [asset, open]);

  // 3. Logic Handle Input
  const handleInputChange = (field: keyof AssetFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "sap_id") {
      setSapIdError(""); // Clear error when user types
    }
  };

  // 4. Logic Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana (opsional)
    if (!formData.serial_number) {
      alert("Serial Number is required");
      return;
    }

    onSave(formData);
  };

  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        alert("Maximum 5 images allowed");
        return;
      }
      setFormData(prev => ({ ...prev, imageFiles: files }));
      
      // Create preview URLs
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
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
                value={formData.type_id}
                onValueChange={(value) => handleInputChange("type_id", value)}
                disabled={loadingData}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
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
                className={sapIdError ? "border-red-500" : ""}
              />
              {sapIdError && (
                <p className="text-sm text-red-500">{sapIdError}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => handleInputChange("condition", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      {condition.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Input
                type="date"
                value={formData.purchase_date ? formData.purchase_date.toISOString().split('T')[0] : ''}
                onChange={(e) => handleInputChange("purchase_date", e.target.value ? new Date(e.target.value) : undefined)}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="images">Asset Images (Max 5)</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageFilesChange}
              />
              <p className="text-xs text-muted-foreground">First image will be the main image. Named as SAP_ID_001, etc.</p>
            </div>

            {/* Image Preview Grid */}
            {imagePreviews.length > 0 && (
              <div className="space-y-2">
                <Label>Image Previews</Label>
                <div className="grid grid-cols-3 gap-2">
                  {imagePreviews.map((url, idx) => (
                    <div key={idx} className="border rounded-lg p-2 relative aspect-square flex items-center justify-center bg-slate-50">
                      <img 
                        src={url} 
                        alt={`Preview ${idx + 1}`} 
                        className="max-w-full max-h-full object-contain"
                      />
                      <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        {idx === 0 ? "Main" : `#${idx + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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