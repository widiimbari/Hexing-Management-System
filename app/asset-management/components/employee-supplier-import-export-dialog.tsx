"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, FileSpreadsheet } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ImportExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<{ success: boolean; message: string; errors?: any[] }>;
  onDownloadTemplate: () => Promise<void>;
  type: "employee" | "supplier";
  loading?: boolean;
}

export function EmployeeSupplierImportExportDialog({
  isOpen,
  onClose,
  onImport,
  onDownloadTemplate,
  type,
  loading = false,
}: ImportExportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setValidationErrors([]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file to import.");
      return;
    }

    const result = await onImport(file);
    if (result.success) {
      setFile(null);
      setError(null);
      setValidationErrors([]);
      onClose();
    } else {
      setError(result.message);
      if (result.errors) {
        setValidationErrors(result.errors);
      }
    }
  };

  const titleCase = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import {titleCase}s</DialogTitle>
          <DialogDescription>
            Download the template, fill it out, and upload it to import multiple {type}s at once.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col gap-2">
            <Label>Step 1: Download Template</Label>
            <Button
              variant="outline"
              onClick={onDownloadTemplate}
              className="w-full justify-start"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
              Download Excel Template
            </Button>
          </div>

          <div className="flex flex-col gap-2">
             <Label htmlFor="file-upload">Step 2: Upload Filled Template</Label>
             <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input id="file-upload" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
             </div>
             {file && (
                <p className="text-sm text-muted-foreground">
                    Selected: {file.name}
                </p>
             )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="flex flex-col gap-1">
                <span>{error}</span>
                {validationErrors.length > 0 && (
                    <div className="max-h-[100px] overflow-y-auto mt-2 text-xs bg-destructive/10 p-2 rounded">
                        <ul className="list-disc pl-4 space-y-1">
                            {validationErrors.map((err, idx) => (
                                <li key={idx}>
                                    Row {err.row}: {err.message || JSON.stringify(err)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !file}>
            {loading ? "Importing..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}