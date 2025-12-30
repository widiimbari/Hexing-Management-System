"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Image as ImageIcon, 
  Upload, 
  Download, 
  ZoomIn,
  Trash2
} from "lucide-react";

interface AssetImage {
  id: string;
  name: string;
  created_at: string;
  url?: string;
}

interface AssetImageGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetId: string;
  images: AssetImage[];
  onImageUpload: (files: File[]) => Promise<void>;
  onImageDelete: (imageId: string) => Promise<void>;
  loading?: boolean;
}

export function AssetImageGallery({ 
  open, 
  onOpenChange, 
  assetId, 
  images, 
  onImageUpload, 
  onImageDelete,
  loading = false 
}: AssetImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<AssetImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const fileArray = Array.from(files);
    setUploading(true);
    
    try {
      await onImageUpload(fileArray);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Asset Images Gallery
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Upload Area */}
            <Card>
              <CardContent className="p-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? "border-primary bg-primary/5" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Upload Asset Images</p>
                    <p className="text-sm text-gray-500">
                      Drag and drop images here, or click to select files
                    </p>
                    <p className="text-xs text-gray-400">
                      Supported formats: JPG, PNG, GIF, WebP (Max 10MB per file)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    id="file-upload"
                    disabled={uploading || loading}
                  />
                  <label htmlFor="file-upload">
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      disabled={uploading || loading}
                      asChild
                    >
                      <span>
                        {uploading ? "Uploading..." : "Select Files"}
                      </span>
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Images Grid */}
            {images.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">
                      Images ({images.length})
                    </h3>
                    <div className="text-sm text-gray-500">
                      Asset ID: {assetId}
                    </div>
                  </div>
                  
                  <ScrollArea className="max-h-[400px]">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((image) => (
                        <div key={image.id} className="relative group">
                          <Card className="overflow-hidden">
                            <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                              {image.url ? (
                                <img
                                  src={image.url}
                                  alt={image.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                              )}
                              
                              {/* Overlay Actions */}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => setSelectedImage(image)}
                                >
                                  <ZoomIn className="h-4 w-4" />
                                </Button>
                                {image.url && (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => {
                                      if (image.url) {
                                        const link = document.createElement('a');
                                        link.href = image.url;
                                        link.download = image.name;
                                        link.click();
                                      }
                                    }}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => onImageDelete(image.id)}
                                  disabled={loading}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-2">
                              <p className="text-xs font-medium truncate">
                                {image.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(image.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {images.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    No Images Yet
                  </p>
                  <p className="text-sm text-gray-500">
                    Upload images to get started with the asset gallery.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.name}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                {selectedImage.url ? (
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="h-16 w-16 text-gray-400" />
                )}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  Uploaded: {new Date(selectedImage.created_at).toLocaleString()}
                </span>
                {selectedImage.url && (
                  <Button
                    variant="outline"
                    size="sm"
onClick={() => {
                      if (selectedImage.url) {
                        const link = document.createElement('a');
                        link.href = selectedImage.url;
                        link.download = selectedImage.name;
                        link.click();
                      }
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}