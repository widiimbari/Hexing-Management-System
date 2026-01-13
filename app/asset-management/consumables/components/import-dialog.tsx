"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileDown, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ConsumableImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportSuccess: () => void;
}

export function ConsumableImportDialog({ open, onOpenChange, onImportSuccess }: ConsumableImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [downloading, setDownloading] = useState(false);

  const handleDownloadTemplate = async () => {
    try {
      setDownloading(true);
      const res = await fetch("/api/assets/consumables/template");
      if (!res.ok) throw new Error("Failed to download template");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Template_Import_Consumables.xlsx";
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Template download error:", err);
      alert("Failed to download template");
    } finally {
      setDownloading(false);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/assets/consumables/import", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to import");

      alert(result.message);
      onImportSuccess();
      onOpenChange(false);
      setFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Import from Excel</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Instructions</AlertTitle>
            <AlertDescription className="text-xs space-y-1">
              <p>1. Please use the template provided below.</p>
              <p>2. Columns with <strong>*</strong> are required.</p>
              <p>3. Column order: No, Item Name, Brand, Qty, Price, Remarks, Link, Image URL.</p>
              <p>4. Image URL (optional): Direct link to image, will be downloaded automatically.</p>
            </AlertDescription>
          </Alert>

          <Button variant="outline" className="w-full h-12" onClick={handleDownloadTemplate} disabled={downloading}>
            <FileDown className="mr-2 h-5 w-5 text-blue-600" />
            {downloading ? "Downloading..." : "Download Template"}
          </Button>

          <div className="space-y-2 pt-2">
            <Label className="font-semibold">Select Excel File</Label>
            <Input 
              type="file" 
              accept=".xlsx, .xls" 
              className="cursor-pointer"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
          <Button onClick={handleImport} disabled={!file || loading}>
            {loading ? <span className="flex items-center gap-2">Importing...</span> : <span className="flex items-center gap-2"><Upload className="h-4 w-4" /> Upload & Import</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}