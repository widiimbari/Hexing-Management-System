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
import { format } from "date-fns";

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
  const [pendingFiles, setPendingFiles] = useState<{ file: File; preview: string }[]>([]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const newPendingFiles = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setPendingFiles(prev => [...prev, ...newPendingFiles]);
  };

  const handleSaveFiles = async () => {
    if (pendingFiles.length === 0) return;
    
    setUploading(true);
    try {
      const filesToUpload = pendingFiles.map(p => p.file);
      await onImageUpload(filesToUpload);
      // Clear pending files after successful upload
      setPendingFiles([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  const removePendingFile = (index: number) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
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
                        Select Files
                      </span>
                    </Button>
                  </label>
                </div>

                {/* Pending Files Preview */}
                {pendingFiles.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <h4 className="font-medium mb-3">Pending Uploads ({pendingFiles.length})</h4>
                    <ScrollArea className="max-h-[200px]">
                      <div className="grid grid-cols-4 gap-4">
                        {pendingFiles.map((file, index) => (
                          <div key={index} className="relative group border rounded-lg overflow-hidden">
                            <img 
                              src={file.preview} 
                              alt="preview" 
                              className="w-full h-24 object-cover"
                            />
                            <button
                              onClick={() => removePendingFile(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="mt-4 flex justify-end">
                      <Button onClick={handleSaveFiles} disabled={uploading}>
                        {uploading ? "Uploading..." : "Save Images"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Images Grid */}
            {images.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">
                      Saved Images ({images.length})
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
                                {format(new Date(image.created_at), "dd/MM/yyyy")}
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
                  Uploaded: {format(new Date(selectedImage.created_at), "dd/MM/yyyy HH:mm:ss")}
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