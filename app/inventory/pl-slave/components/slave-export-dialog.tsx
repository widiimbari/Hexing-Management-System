import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SlaveExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (type: 'PLN' | 'MIMS') => void;
}

export function SlaveExportDialog({ isOpen, onClose, onExport }: SlaveExportDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Select Export Type</DialogTitle>
          <DialogDescription>
            Choose the format for your Excel attachment export.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => onExport('PLN')} className="w-full">
            Lampiran PLN Serial
          </Button>
          <Button onClick={() => onExport('MIMS')} className="w-full" variant="secondary">
            Lampiran MIMS
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}