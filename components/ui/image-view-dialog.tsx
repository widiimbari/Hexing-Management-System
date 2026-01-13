"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ImageViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string | null;
  alt?: string;
}

export function ImageViewDialog({ open, onOpenChange, src, alt = "Image Preview" }: ImageViewDialogProps) {
  if (!src) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = src.split("/").pop() || "image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      window.open(src, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
          <div className="flex flex-col gap-1">
            <DialogTitle>{alt}</DialogTitle>
            <DialogDescription className="text-xs">
                Click download button to save the image.
            </DialogDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </DialogHeader>
        <div className="flex items-center justify-center bg-slate-100 p-4 min-h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src={src} 
                alt={alt} 
                className="max-w-full max-h-[70vh] object-contain rounded-md shadow-sm"
            />
        </div>
      </DialogContent>
    </Dialog>
  );
}
