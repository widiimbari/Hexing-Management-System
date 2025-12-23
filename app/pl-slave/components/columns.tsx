"use client";

import { ColumnDef } from "@tanstack/react-table";
import { attachment2 } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<attachment2>[] = [
  {
    accessorKey: "nomor",
    header: "Nomor PL Slave",
  },
  {
    accessorKey: "no_do",
    header: "Nomor DO",
  },
  {
    accessorKey: "no_order",
    header: "Nomor Order",
  },
  {
    accessorKey: "area",
    header: "Area",
  },
  {
    accessorKey: "type",
    header: "Tipe",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={status ? "default" : "secondary"}>
          {status ? "Completed" : "Open"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Tanggal Dibuat",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"));
      return date.toLocaleDateString("id-ID");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
