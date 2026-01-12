"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, Loader2 } from "lucide-react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HistoryDialog({ open, onOpenChange }: HistoryDialogProps) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchDocuments();
    }
  }, [open]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/assets/consumables/documents");
      const result = await res.json();
      setDocuments(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async (docNumber: string, reqDate: string) => {
    setExporting(docNumber);
    try {
      const res = await fetch(`/api/assets/consumables`); 
      const result = await res.json();
      const allItems = result.data || [];
      const items = allItems.filter((i: any) => i.document_number === docNumber);

      if (items.length === 0) {
        alert("No items found for this document");
        return;
      }

      const doc = new jsPDF();
      const img = new Image();
      img.src = "/HEXING LOGO.png";
      
      const generate = () => {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("FORMULIR PERMOHONAN PENYEDIAAN BARANG / JASA", 105, 20, { align: "center" });
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Doc No: ${docNumber}`, 14, 30);
        doc.text(`Tanggal: ${format(new Date(reqDate), "dd MMMM yyyy")}`, 14, 35);
        doc.text(`Department: IT / Umum`, 14, 40); 

        const tableBody = items.map((item: any, index: number) => {
            const qty = item.qty_estimated;
            const price = parseFloat(item.price_estimated);
            const subtotal = qty * price;
            const shipping = subtotal * 0.03; 
            const total = subtotal + shipping;

            return [
                index + 1,
                item.item_name,
                item.brand_type || "-",
                qty,
                "Unit",
                new Intl.NumberFormat("id-ID").format(price),
                new Intl.NumberFormat("id-ID").format(subtotal),
                new Intl.NumberFormat("id-ID").format(shipping),
                new Intl.NumberFormat("id-ID").format(total)
            ];
        });

        const totalSubtotal = items.reduce((acc: number, item: any) => acc + (item.qty_estimated * parseFloat(item.price_estimated)), 0);
        const totalShipping = totalSubtotal * 0.03;
        const totalGrand = totalSubtotal + totalShipping;

        autoTable(doc, {
            startY: 45,
            head: [["No", "Nama Barang", "Merk/Tipe", "Qty", "Satuan", "Harga Satuan (Est)", "Subtotal", "Fee 3%", "Total"]],
            body: tableBody,
            foot: [[ 
                { content: "TOTAL ESTIMASI", colSpan: 6, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: new Intl.NumberFormat("id-ID").format(totalSubtotal), styles: { fontStyle: 'bold' } },
                { content: new Intl.NumberFormat("id-ID").format(totalShipping), styles: { fontStyle: 'bold' } },
                { content: new Intl.NumberFormat("id-ID").format(totalGrand), styles: { fontStyle: 'bold' } },
            ]],
            theme: 'grid',
            headStyles: { fillColor: [22, 163, 74] },
            styles: { fontSize: 8 },
        });

        const finalY = (doc as any).lastAutoTable.finalY + 20;
        
        doc.setFontSize(10);
        doc.text("Prepared By,", 30, finalY);
        doc.text("Checked By,", 90, finalY);
        doc.text("Approved By,", 150, finalY);

        doc.line(20, finalY + 25, 60, finalY + 25);
        doc.line(80, finalY + 25, 120, finalY + 25);
        doc.line(140, finalY + 25, 180, finalY + 25);

        doc.text("( .................... )", 27, finalY + 30);
        doc.text("( .................... )", 87, finalY + 30);
        doc.text("( .................... )", 147, finalY + 30);

        doc.save(`Request_Form_${docNumber.replace(/[\/\\]/g, '-')}.pdf`);
      };

      img.onload = () => {
        doc.addImage(img, "PNG", 14, 10, 30, 10);
        generate();
      };
      img.onerror = () => generate();

    } catch (err) {
      console.error(err);
      alert("Failed to export");
    } finally {
      setExporting(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Request Document History</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] w-full pr-4">
          {loading ? (
            <div className="flex justify-center p-4">Loading...</div>
          ) : documents.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">No history found.</div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        <FileText className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-medium text-sm">{doc.document_number}</p>
                        <p className="text-xs text-muted-foreground">
                            Created: {doc.request_date ? format(new Date(doc.request_date), "dd MMMM yyyy HH:mm") : "-"}
                        </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handlePrint(doc.document_number, doc.request_date)}
                    disabled={exporting === doc.document_number}
                  >
                    {exporting === doc.document_number ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            <Download className="mr-2 h-4 w-4" /> Reprint PDF
                        </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
