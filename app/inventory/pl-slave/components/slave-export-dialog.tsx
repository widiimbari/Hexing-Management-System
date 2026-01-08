import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SlaveExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (type: 'PLN' | 'MIMS', format: 'excel' | 'pdf') => void;
}

export function SlaveExportDialog({ isOpen, onClose, onExport }: SlaveExportDialogProps) {
  const [format, setFormat] = useState<'excel' | 'pdf'>('excel');

  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Select Export Type</DialogTitle>
          <DialogDescription>
            Choose the template type and file format.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2">
            <Label className="mb-2 block">File Format:</Label>
            <RadioGroup defaultValue="excel" value={format} onValueChange={(v) => setFormat(v as 'excel' | 'pdf')} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excel" id="excel" />
                    <Label htmlFor="excel">Excel</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <Label htmlFor="pdf">PDF</Label>
                </div>
            </RadioGroup>
        </div>

        <div className="grid gap-4 py-4">
          <Button onClick={() => onExport('PLN', format)} className="w-full">
            Lampiran PLN Serial
          </Button>
          {format === 'excel' && (
            <Button onClick={() => onExport('MIMS', format)} className="w-full" variant="secondary">
                Lampiran MIMS
            </Button>
          )}
          {format === 'pdf' && (
            <p className="text-xs text-center text-muted-foreground italic">
                * PDF format is only available for PLN Serial attachment.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}