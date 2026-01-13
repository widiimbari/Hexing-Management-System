"use client";

import React from "react";
import { DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, CheckCircle, Printer, FileSpreadsheet, Trash, 
  ChevronDown, ChevronRight, History, PackageOpen 
} from "lucide-react";
import { format } from "date-fns";

export interface RequestColumnProps {
  expandedDocNumber: string | null;
  handleBulkSettle: (row: any) => void;
  handlePrintDocument: (row: any) => void;
  handlePrintDocumentExcel: (row: any) => void;
  handleDeleteDocument: (docNo: string) => void;
}

export const getRequestColumns = ({
  expandedDocNumber,
  handleBulkSettle,
  handlePrintDocument,
  handlePrintDocumentExcel,
  handleDeleteDocument
}: RequestColumnProps): DataTableColumn<any>[] => [
  {
    id: "actions_expand",
    header: "",
    width: "30px",
    cell: ({ row }) => (
       expandedDocNumber === row.document_number 
       ? <ChevronDown className="h-4 w-4 text-slate-500" /> 
       : <ChevronRight className="h-4 w-4 text-slate-500" />
    )
  },
  {
    id: "doc_no",
    header: "Document No",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium text-blue-600">
         <FileText className="h-4 w-4" />
         {row.document_number}
      </div>
    )
  },
  {
    id: "date",
    header: "Req Date",
    cell: ({ row }) => format(new Date(row.request_date), "dd MMMM yyyy")
  },
  {
    id: "progress",
    header: "Item Progress",
    width: "200px",
    cell: ({ row }) => {
      const percent = Math.round((row.completed_items / row.total_items) * 100) || 0;
      return (
           <div className="w-full">
              <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                  <span>{row.completed_items}/{row.total_items}</span>
                  <span>{percent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all ${percent === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${percent}%` }} />
              </div>
          </div>
      )
    }
  },
  {
      id: "status",
      header: "Status",
      cell: ({ row }) => row.pending_items === 0 && row.total_items > 0 ? (
          <Badge className="bg-emerald-600 hover:bg-emerald-700">Completed</Badge>
      ) : row.completed_items > 0 ? (
          <Badge className="bg-blue-600 hover:bg-blue-700">Partial</Badge>
      ) : (
          <Badge variant="outline" className="text-amber-600 border-amber-600">Pending</Badge>
      )
  },
  {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
          <div className="flex gap-2">
              {row.pending_items > 0 && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={(e) => { e.stopPropagation(); handleBulkSettle(row); }}>
                      <CheckCircle className="mr-2 h-4 w-4" /> Settle All
                  </Button>
              )}
              <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handlePrintDocument(row); }}>
                  <Printer className="mr-2 h-4 w-4" /> PDF
              </Button>
              <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handlePrintDocumentExcel(row); }}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); handleDeleteDocument(row.document_number); }}>
                  <Trash className="h-4 w-4" />
              </Button>
          </div>
      )
  }
];

export interface InventoryColumnProps {
  handleViewHistory: (row: any) => void;
  handleUse: (row: any) => void;
  handleDeleteItem: (id: string, name: string) => void;
  handleViewImage: (src: string, alt: string) => void;
}

export const getInventoryColumns = ({
  handleViewHistory,
  handleUse,
  handleDeleteItem,
  handleViewImage
}: InventoryColumnProps): DataTableColumn<any>[] => [
  {
      id: "settle_date",
      header: "Purchase Date",
      cell: ({ row }) => row.settlement_date ? format(new Date(row.settlement_date), "dd/MM/yyyy") : "-"
  },
  {
      id: "item",
      header: "Item Name",
      cell: ({ row }) => <span className="font-medium">{row.item_name}</span>
  },
  { accessorKey: "brand_type", header: "Brand/Type" },
  {
      id: "stock",
      header: "Stock",
      cell: ({ row }) => {
          const used = row.usage_history?.reduce((sum: number, u: any) => sum + u.qty_used, 0) || 0;
          const available = (row.qty_actual || 0) - used;
          return (
              <div className="flex flex-col">
                  <span className={`font-bold ${available <= 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {available} <span className="text-[10px] text-muted-foreground font-normal">/ {row.qty_actual}</span>
                  </span>
              </div>
          );
      }
  },
  {
      id: "total",
      header: "Grand Total",
      cell: ({ row }) => row.grand_total ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(parseFloat(row.grand_total)) : "-"
  },
  {
    id: "proof",
    header: "Proof",
    cell: ({ row }) => row.receipt_image ? (
        <Button size="sm" variant="outline" onClick={() => handleViewImage(row.receipt_image, `Receipt - ${row.item_name}`)}>
          View Receipt
        </Button>
    ) : <span className="text-muted-foreground">-</span>
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
          <Button size="sm" variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" onClick={() => handleViewHistory(row)}>
              <History className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" onClick={() => handleUse(row)}>
              <PackageOpen className="mr-2 h-4 w-4" /> Use Item
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteItem(row.id, row.item_name)}>
              <Trash className="h-4 w-4" />
          </Button>
      </div>
    )
  }
];
