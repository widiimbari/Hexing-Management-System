"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Package, 
  Building, 
  User, 
  ImageIcon,
  Clock,
  Fingerprint,
  Tag,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  Move,
  ExternalLink,
  History,
  Box,
  X
} from "lucide-react";
import { format } from "date-fns";
import { ChangeConditionDialog } from "./change-condition-dialog";
import { MoveAssetDialog } from "./move-asset-dialog";
import { AssignAssetDialog } from "./assign-asset-dialog";

// Helper function to format condition names for display
const formatConditionName = (condition?: string) => {
  if (!condition) return 'Unknown';
  
  return condition
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
};

// Helper to format date treating UTC as local time (to display stored DB time exactly as is)
const formatUTC = (dateStr: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const utcDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
  return format(utcDate, "dd/MM/yyyy HH:mm:ss");
};

interface Asset {
  id: string;
  serial_number: string;
  condition?: string;
  [key: string]: any;
}

interface AssetViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: Asset | null;
  onAssetUpdated?: () => void;
}

interface Transaction {
  id: string;
  action: string;
  details: string;
  user_name: string;
  created_at: string;
  type: string;
  previous_condition?: string;
  new_condition?: string;
  previous_location?: string;
  new_location?: string;
  previous_holder_name?: string;
  new_holder_name?: string;
}

export function AssetViewDialog({ open, onOpenChange, asset, onAssetUpdated }: AssetViewDialogProps) {
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(asset);
  const [timeline, setTimeline] = useState<Transaction[]>([]);
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  
  // Action Dialog States
  const [conditionOpen, setConditionOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  
  // Image Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setCurrentAsset(asset);
    if (asset && open) {
      fetchTimeline();
    }
  }, [asset, open]);

  const fetchTimeline = async () => {
    if (!asset) return;
    setLoadingTimeline(true);
    try {
      const res = await fetch(`/api/assets/${asset.id}/logs`);
      if (res.ok) {
        const data = await res.json();
        setTimeline(data.data.slice(0, 5));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTimeline(false);
    }
  };

  const refreshAsset = async () => {
    if (!asset?.id) return;
    try {
      const res = await fetch(`/api/assets/${asset.id}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentAsset(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSuccess = () => {
    fetchTimeline();
    refreshAsset();
    if (onAssetUpdated) onAssetUpdated();
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    if (!currentAsset?.asset_images) return;
    setSelectedImageIndex((prev) => (prev + 1) % currentAsset.asset_images.length);
  };

  const prevImage = () => {
    if (!currentAsset?.asset_images) return;
    setSelectedImageIndex((prev) => (prev - 1 + currentAsset.asset_images.length) % currentAsset.asset_images.length);
  };

  if (!currentAsset) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col overflow-hidden bg-white">
          <DialogTitle className="sr-only">
            Asset Details - {currentAsset.sap_id || currentAsset.serial_number}
          </DialogTitle>
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 bg-white shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Box className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    {currentAsset.sap_id || currentAsset.serial_number}
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    {currentAsset.asset_type?.name || "Asset"} 
                    <span className="text-slate-300">•</span> 
                    <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">{currentAsset.serial_number}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-normal">
                  Last updated: {format(new Date(), 'dd/MM/yyyy')}
                </Badge>
              </div>
            </div>
          </div>

          {/* Single Column Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            
            {/* Quick Actions */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3 border-b bg-slate-50">
                <CardTitle className="text-sm font-semibold text-slate-800">
                  Manage Asset
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Button onClick={() => setConditionOpen(true)} variant="outline" className="justify-start h-10 border-slate-300 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200">
                    <AlertTriangle className="mr-2 h-4 w-4" /> Report
                  </Button>
                  <Button onClick={() => setMoveOpen(true)} variant="outline" className="justify-start h-10 border-slate-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                    <Move className="mr-2 h-4 w-4" /> Move
                  </Button>
                  <Button onClick={() => setAssignOpen(true)} variant="outline" className="justify-start h-10 border-slate-300 hover:bg-green-50 hover:text-green-700 hover:border-green-200">
                    <User className="mr-2 h-4 w-4" /> Assign
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Status & Location Card */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-600" />
                  Current Status & Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Condition</p>
                    <Badge 
                      className={`text-sm px-4 py-2 font-semibold w-full flex justify-center items-center text-center whitespace-normal h-auto leading-tight uppercase tracking-wide border-transparent text-white
                      ${(() => {
                        switch (currentAsset.condition) {
                          case 'GOOD': return 'bg-emerald-600 hover:bg-emerald-700';
                          case 'SLIGHTLY_DAMAGED': return 'bg-yellow-600 hover:bg-yellow-700';
                          case 'DAMAGED': return 'bg-orange-600 hover:bg-orange-700';
                          case 'BROKEN': return 'bg-red-600 hover:bg-red-700';
                          case 'DISPOSED': return 'bg-slate-600 hover:bg-slate-700';
                          case 'MAINTENANCE': return 'bg-blue-600 hover:bg-blue-700';
                          case 'LOST': return 'bg-purple-600 hover:bg-purple-700';
                          default: return 'bg-slate-600';
                        }
                      })()}`}
                    >
                      {currentAsset.condition?.replace(/_/g, ' ') || 'UNKNOWN'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Location</p>
                    <div className="font-semibold text-slate-900 text-sm">
                      {currentAsset.location?.name || "No Location"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {currentAsset.area?.name || "No Area Defined"}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Assigned To</p>
                    <div className="font-semibold text-slate-900 text-sm">
                      {currentAsset.employee ? currentAsset.employee.nama : "Unassigned"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {currentAsset.employee ? "Current Holder" : "Available"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Specs Card */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-slate-600" />
                  Specification & Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
                  <div className="p-4 hover:bg-slate-50 transition-colors">
                     <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Brand</p>
                     <div className="font-semibold text-slate-900 flex items-center gap-2">
                       <Package className="h-4 w-4 text-slate-400" />
                       {currentAsset.brand?.name || "-"}
                     </div>
                  </div>
                  <div className="p-4 hover:bg-slate-50 transition-colors">
                     <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Category</p>
                     <div className="font-semibold text-slate-900 flex items-center gap-2">
                       <Tag className="h-4 w-4 text-slate-400" />
                       {currentAsset.category?.name || "-"}
                     </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-100">
                  <div className="p-4 hover:bg-slate-50 transition-colors">
                     <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Purchase Date</p>
                     <div className="font-semibold text-slate-900 flex items-center gap-2">
                       <Calendar className="h-4 w-4 text-slate-400" />
                        {currentAsset.purchase_date ? format(new Date(currentAsset.purchase_date), "dd/MM/yyyy") : "-"}
                     </div>
                  </div>
                  <div className="p-4 hover:bg-slate-50 transition-colors">
                     <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Warranty Exp.</p>
                     <div className="font-semibold text-slate-900 flex items-center gap-2">
                       <Clock className="h-4 w-4 text-slate-400" />
                        {currentAsset.warranty_expiry ? format(new Date(currentAsset.warranty_expiry), "dd/MM/yyyy") : "N/A"}
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photo Gallery */}
            {currentAsset.asset_images && currentAsset.asset_images.length > 0 && (
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-slate-600" />
                      Gallery
                    </CardTitle>
                    <Badge variant="secondary" className="rounded-full px-2">
                      {currentAsset.asset_images.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-4 gap-3">
                    {currentAsset.asset_images.map((image: any, idx: number) => (
                      <div 
                        key={image.id}
                        onClick={() => openLightbox(idx)}
                        className="group relative aspect-square rounded-md overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer"
                      >
                        <img 
                          src={image.url} 
                          alt="Asset" 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 text-white bg-black/50 rounded-full p-1.5 backdrop-blur-sm">
                              <ExternalLink className="h-3 w-3" />
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            

            {/* Supplier Info */}
            {currentAsset.supplier_rec && (
              <Card className="border-slate-200 shadow-sm">
                 <CardHeader className="pb-3 pt-4">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Building className="h-4 w-4 text-slate-500" />
                    Supplier Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <p className="font-semibold text-slate-900">{currentAsset.supplier_rec.name}</p>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-slate-600">
                      {currentAsset.supplier_rec.contact_person && (
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" /> {currentAsset.supplier_rec.contact_person}
                        </div>
                      )}
                      {currentAsset.supplier_rec.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" /> {currentAsset.supplier_rec.phone}
                        </div>
                      )}
                      {currentAsset.supplier_rec.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" /> {currentAsset.supplier_rec.email}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Transaction History Timeline */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <History className="h-4 w-4 text-slate-600" />
                    Activity Log
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('/asset-management/transactions', '_blank')}
                    className="text-xs"
                  >
                    View All Transactions
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {loadingTimeline ? (
                  <div className="py-8 text-center text-sm text-slate-500">Loading history...</div>
                ) : (
                  <div className="relative pl-2">
                    <div className="absolute top-2 bottom-2 left-[23px] w-px bg-slate-200" />
                    
                    <div className="space-y-6">
                      {timeline.map((item: any, idx: number) => (
                        <div key={item.id} className="relative flex gap-4 group">
                          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white shadow-sm">
                            {item.action === 'CONDITION_CHANGE' ? <AlertTriangle className="h-4 w-4 text-orange-500" /> :
                             item.action === 'RELOCATION' ? <Move className="h-4 w-4 text-blue-500" /> :
                             item.action === 'ASSIGNMENT' ? <User className="h-4 w-4 text-green-500" /> :
                             <Clock className="h-4 w-4 text-slate-400" />}
                          </div>
                          <div className="flex-1 py-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                              <p className="font-semibold text-slate-900 text-sm">
                                {item.action.replace(/_/g, ' ')}
                              </p>
                              <span className="text-xs text-slate-400 font-mono">
                                {formatUTC(item.created_at)}
                              </span>
                            </div>
                            {/* Show condition change details */}
                            {item.action === 'CONDITION_CHANGE' && (
                              <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                                  {formatConditionName(item.previous_condition)}
                                </span>
                                <span className="text-slate-400">→</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                  {formatConditionName(item.new_condition)}
                                </span>
                              </div>
                            )}
                            {/* Show relocation details */}
                            {item.action === 'RELOCATION' && (
                              <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                                  {item.previous_location || 'Unknown'}
                                </span>
                                <span className="text-slate-400">→</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                  {item.new_location || 'Unknown'}
                                </span>
                              </div>
                            )}
                            {/* Show assignment details */}
                            {item.action === 'ASSIGNMENT' && (
                              <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                                  {item.previous_holder_name || 'Unassigned'}
                                </span>
                                <span className="text-slate-400">→</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                  {item.new_holder_name || 'Unassigned'}
                                </span>
                              </div>
                            )}
                            {/* For other actions or if details need to be shown */}
                            {item.action !== 'CONDITION_CHANGE' && item.action !== 'RELOCATION' && item.action !== 'ASSIGNMENT' && (
                              <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                                {item.details}
                              </p>
                            )}
                            {(item.action === 'CONDITION_CHANGE' || item.action === 'RELOCATION' || item.action === 'ASSIGNMENT') && item.details && (
                               <p className="text-xs text-slate-500 mb-2 italic">
                                 "{item.details}"
                               </p>
                            )}
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 font-normal text-slate-500 bg-slate-50">
                                <User className="h-3 w-3 mr-1" />
                                {item.user_name}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-white shrink-0 flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Helper Dialogs */}
      <ChangeConditionDialog 
        open={conditionOpen} 
        onOpenChange={setConditionOpen} 
        asset={currentAsset}
        onSuccess={handleSuccess}
      />
      <MoveAssetDialog 
        open={moveOpen} 
        onOpenChange={setMoveOpen} 
        asset={currentAsset}
        onSuccess={handleSuccess}
      />
      <AssignAssetDialog 
        open={assignOpen} 
        onOpenChange={setAssignOpen} 
        asset={currentAsset}
        onSuccess={handleSuccess}
      />
      
       {/* Lightbox */}
       {currentAsset.asset_images && currentAsset.asset_images.length > 0 && lightboxOpen && (
         <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
           <DialogTitle className="sr-only">
             Asset Gallery - Image {selectedImageIndex + 1}
           </DialogTitle>
           <DialogContent className="max-w-7xl h-[90vh] p-0 bg-black/95 border-none">
              <div className="relative w-full h-full flex items-center justify-center">
               <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-white/20">
                 <X className="h-6 w-6" />
               </button>
               
               <button onClick={prevImage} className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full">
                 <Move className="h-6 w-6 rotate-180" />
               </button>
               
               <img src={currentAsset.asset_images[selectedImageIndex]?.url} className="max-h-full max-w-full object-contain" />
               
               <button onClick={nextImage} className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full">
                 <Move className="h-6 w-6" />
               </button>
              </div>
           </DialogContent>
         </Dialog>
       )}
    </>
  );
}