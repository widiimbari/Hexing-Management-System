"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ImageIcon, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface DocumentSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentNumber: string | null;
  data: any[]; // All consumable items
  onSettle: (item: any) => void;
}

export function DocumentSheet({ open, onOpenChange, documentNumber, data, onSettle }: DocumentSheetProps) {
  if (!documentNumber) return null;

  // Filter items for this document
  const docItems = data.filter(d => d.document_number === documentNumber);
  const docDate = docItems[0]?.request_date;

  const columns: DataTableColumn<any>[] = [
    { 
        id: "item",
        header: "Item Name",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.item_name}</span>
                {row.purchase_link && (
                    <a href={row.purchase_link} target="_blank" className="text-[10px] text-blue-500 flex items-center gap-1 hover:underline">
                        <ExternalLink className="w-2 h-2" /> Link
                    </a>
                )}
            </div>
        )
    },
    { accessorKey: "brand_type", header: "Brand" },
    { 
        id: "qty",
        header: "Qty",
        cell: ({ row }) => row.status === "COMPLETED" ? row.qty_actual : `${row.qty_estimated} (Est)`
    },
    { 
        id: "price",
        header: "Price",
        cell: ({ row }) => {
            const val = row.status === "COMPLETED" ? row.unit_price_real : row.price_estimated;
            return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(parseFloat(val));
        }
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.status === "COMPLETED" ? "default" : "outline"} className={row.status === "COMPLETED" ? "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent" : "text-amber-600 border-amber-600"}>
          {row.status === "COMPLETED" ? "Bought" : "Pending"}
        </Badge>
      )
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
            {row.item_image && (
                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                    <a href={row.item_image} target="_blank">
                        <ImageIcon className="h-4 w-4" />
                    </a>
                </Button>
            )}
            {row.status === "PENDING" && (
                <Button size="sm" onClick={() => onSettle(row)} className="h-8">
                    Settle
                </Button>
            )}
        </div>
      )
    }
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[800px] sm:max-w-[100vw] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Document Details</SheetTitle>
          <SheetDescription>
            {documentNumber} • {docDate ? format(new Date(docDate), "dd MMMM yyyy") : "-"}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border text-center">
                    <div className="text-2xl font-bold">{docItems.length}</div>
                    <div className="text-xs text-muted-foreground uppercase">Total Items</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-center">
                    <div className="text-2xl font-bold text-amber-600">
                        {docItems.filter(i => i.status === "PENDING").length}
                    </div>
                    <div className="text-xs text-amber-600 uppercase">Pending</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                        {docItems.filter(i => i.status === "COMPLETED").length}
                    </div>
                    <div className="text-xs text-emerald-600 uppercase">Completed</div>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={docItems}
            />
        </div>
      </SheetContent>
    </Sheet>
  );
}
