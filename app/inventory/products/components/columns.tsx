"use client";

import { ColumnDef } from "@tanstack/react-table";
import { product } from "@/generated/inventory-client-v2";
import { CellAction } from "./cell-action";

// Extend the type to include our injected fields
export type ProductWithRelations = product & {
  box_serial?: string;
  pallet_serial?: string;
  attachment_nomor?: string;
  attachment2_nomor?: string;
};

export const columns: ColumnDef<ProductWithRelations>[] = [
  {
    accessorKey: "serial",
    header: "Serial Number",
  },
  {
    accessorKey: "box_serial", 
    header: "Box Serial", 
  },
  {
      accessorKey: "pallet_serial", 
      header: "Pallet Serial",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "orderno",
    header: "Order No",
  },
  {
    accessorKey: "line",
    header: "Line",
  },
  {
    accessorKey: "timestamp",
    header: "Waktu Produksi",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"));
      return (
        <div className="text-left"> {/* Changed from text-right to text-left */}
          {date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit", 
            year: "numeric"
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action", // Added header label
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

// Columns for Box Grouping
export const boxColumns: ColumnDef<any>[] = [
    {
      accessorKey: "serial",
      header: "Box Serial",
    },
    {
        accessorKey: "pallet_serial",
        header: "Pallet Serial",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "count",
        header: "Total Products",
    },
    {
        accessorKey: "line",
        header: "Line",
    },
    {
        accessorKey: "timestamp",
        header: "Last Update",
        cell: ({ row }) => new Date(row.getValue("timestamp")).toLocaleString("id-ID"),
    },
];

// Columns for Pallet Grouping
export const palletColumns: ColumnDef<any>[] = [
    {
      accessorKey: "serial",
      header: "Pallet Serial",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "count",
        header: "Total Boxes",
    },
    {
        accessorKey: "line",
        header: "Line",
    },
    {
        accessorKey: "timestamp",
        header: "Last Update",
        cell: ({ row }) => new Date(row.getValue("timestamp")).toLocaleString("id-ID"),
    },
];