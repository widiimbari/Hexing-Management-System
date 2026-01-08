import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  AlertCircle,
  CheckCircle2 
} from "lucide-react";
import { useRef, useState } from "react";

interface AssetImportExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<{ success: boolean; message: string; errors?: string[] }>;
  onExport: () => Promise<void>;
  onDownloadTemplate: () => Promise<void>;
  loading?: boolean;
  canImport?: boolean;
}

export function AssetImportExportDialog({ 
  isOpen, 
  onClose, 
  onImport,
  onExport,
  onDownloadTemplate,
  loading = false,
  canImport = false
}: AssetImportExportDialogProps) {
  const [importMode, setImportMode] = useState<'import' | 'export' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    message: string;
    errors?: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel' // .xls
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setImportResult({
          success: false,
          message: "Invalid file format. Please upload Excel file (.xlsx or .xls)"
        });
        return;
      }

      setFile(selectedFile);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setImportResult({
        success: false,
        message: "Please select a file to import"
      });
      return;
    }

    try {
      const result = await onImport(file);
      setImportResult(result);
      
      if (result.success) {
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: "Import failed. Please try again."
      });
    }
  };

  const handleClose = () => {
    setImportMode(null);
    setFile(null);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const handleExport = async () => {
    try {
      await onExport();
      setImportResult({
        success: true,
        message: "Export completed successfully!"
      });
    } catch (error) {
      setImportResult({
        success: false,
        message: "Export failed. Please try again."
      });
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      await onDownloadTemplate();
      setImportResult({
        success: true,
        message: "Template downloaded successfully!"
      });
    } catch (error) {
      setImportResult({
        success: false,
        message: "Failed to download template. Please try again."
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Asset Import/Export
          </DialogTitle>
          <DialogDescription>
            Import assets from Excel file or export existing assets data
          </DialogDescription>
        </DialogHeader>

        {!importMode ? (
          // Initial selection screen
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              {canImport && (
                <Button
                    onClick={() => setImportMode('import')}
                    variant="outline"
                    className="h-20 flex-col gap-2"
                >
                    <Upload className="h-6 w-6" />
                    <span className="font-semibold">Import Assets</span>
                    <span className="text-xs text-muted-foreground normal-case">
                    Upload Excel file to add assets
                    </span>
                </Button>
              )}

              <Button
                onClick={() => setImportMode('export')}
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <Download className="h-6 w-6" />
                <span className="font-semibold">Export Assets</span>
                <span className="text-xs text-muted-foreground normal-case">
                  Download all assets as Excel file
                </span>
              </Button>
            </div>

            {canImport && (
                <div className="space-y-2">
                <Button
                    onClick={handleDownloadTemplate}
                    variant="secondary"
                    className="w-full"
                >
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Download Import Template
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                    Get the Excel template with dropdown validation for easy data entry
                </p>
                </div>
            )}
          </div>
        ) : importMode === 'import' ? (
          // Import screen
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select Excel File</Label>
                <Input
                  ref={fileInputRef}
                  id="file"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
              </div>

              {file && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Selected file:</strong> {file.name}
                    <br />
                    <strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              )}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Make sure your Excel file follows the template format with correct column headers.
                  Serial Number is required and must be unique.
                </AlertDescription>
              </Alert>
            </div>

            {importResult && (
              <Alert className={importResult.success ? "border-green-200" : "border-red-200"}>
                {importResult.success ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription>
                  {importResult.message}
                  {importResult.errors && importResult.errors.length > 0 && (
                    <div className="mt-2">
                      <strong>Errors:</strong>
                      <ul className="list-disc list-inside text-xs mt-1">
                        {importResult.errors.slice(0, 5).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                        {importResult.errors.length > 5 && (
                          <li>...and {importResult.errors.length - 5} more errors</li>
                        )}
                      </ul>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setImportMode(null)}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                onClick={handleImport}
                disabled={!file || loading}
                className="flex-1"
              >
                {loading ? "Importing..." : "Import Assets"}
              </Button>
            </div>
          </div>
        ) : (
          // Export screen
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This will export all current assets data to an Excel file with proper formatting.
                </AlertDescription>
              </Alert>
            </div>

            {importResult && (
              <Alert className={importResult.success ? "border-green-200" : "border-red-200"}>
                {importResult.success ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription>{importResult.message}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setImportMode(null)}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                onClick={handleExport}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Exporting..." : "Export Assets"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}