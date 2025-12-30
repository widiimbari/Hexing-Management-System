"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  Package, 
  Building, 
  User, 
  Image as ImageIcon,
  Clock,
  Fingerprint,
  Tag,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { format } from "date-fns";

interface Asset {
  id: string;
  type: string;
  serial_number: string;
  sap_id: string;
  supplier: string;
  image: string;
  purchase_date: string;
  created_at: string;
  updated_at: string;
  category_id: string;
  brand_id: string;
  area_id: string;
  location_id: string;
  employee_id: string;
  supplier_id: string;
  category?: { name: string };
  brand?: { name: string };
  area?: { name: string };
  location?: { name: string };
  employee?: { nik: string; nama: string; gender: string };
  supplier_rec?: { name: string; contact_person?: string; phone?: string; email?: string };
  asset_images?: Array<{
    id: string;
    name: string;
    created_at: string;
  }>;
}

interface AssetViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: Asset | null;
}

export function AssetViewDialog({ open, onOpenChange, asset }: AssetViewDialogProps) {
  if (!asset) return null;

  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Asset Details - {asset.serial_number}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="space-y-6">
            {/* Header Information */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">Basic Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Serial Number</p>
                            <p className="font-medium">{asset.serial_number}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Asset Type</p>
                            <p className="font-medium">{asset.type || "N/A"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Fingerprint className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">SAP ID</p>
                            <p className="font-medium">{asset.sap_id || "N/A"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Category</p>
                            <p className="font-medium">{asset.category?.name || "N/A"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Brand</p>
                            <p className="font-medium">{asset.brand?.name || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">Status & Condition</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Area</p>
                            <p className="font-medium">{asset.area?.name || "N/A"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{asset.location?.name || "N/A"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Assigned Employee</p>
                            <p className="font-medium">
                              {asset.employee ? `${asset.employee.nik} - ${asset.employee.nama}` : "N/A"}
                            </p>
                            {asset.employee?.gender && (
                              <p className="text-sm text-muted-foreground">Gender: {asset.employee.gender}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supplier Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">Supplier Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Supplier Name</p>
                      <p className="font-medium">{asset.supplier || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Supplier Record</p>
                      <p className="font-medium">{asset.supplier_rec?.name || "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {asset.supplier_rec?.contact_person && (
                      <div>
                        <p className="text-sm text-muted-foreground">Contact Person</p>
                        <p className="font-medium">{asset.supplier_rec.contact_person}</p>
                      </div>
                    )}
                    {asset.supplier_rec?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{asset.supplier_rec.phone}</p>
                      </div>
                    )}
                    {asset.supplier_rec?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{asset.supplier_rec.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">Purchase Information</h3>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Purchase Date</p>
                    <p className="font-medium">
                      {asset.purchase_date ? 
                        format(new Date(asset.purchase_date), "PPP") : 
                        "N/A"
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Images */}
            {asset.asset_images && asset.asset_images.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-slate-900 mb-3 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Asset Images ({asset.asset_images.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {asset.asset_images.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                          <ImageIcon className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {image.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timestamps */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timestamp Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Created At</p>
                    <p className="font-medium">
                      {asset.created_at ? 
                        format(new Date(asset.created_at), "PPP HH:mm") : 
                        "N/A"
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-medium">
                      {asset.updated_at ? 
                        format(new Date(asset.updated_at), "PPP HH:mm") : 
                        "N/A"
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}