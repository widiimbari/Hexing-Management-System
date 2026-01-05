"use client";

import { ColumnDef } from "@tanstack/react-table";
import { logs, logs_code } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const getBadgeVariant = (code: logs_code) => {
  switch (code) {
    case "OK":
      return "default";
    case "NG":
      return "destructive";
    case "DUP":
      return "secondary";
    default:
      return "outline";
  }
};

export const columns: ColumnDef<logs>[] = [
  {
    accessorKey: "timestamp",
    header: "Waktu",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"));
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit", 
        year: "numeric"
      });
    },
  },
  {
    accessorKey: "line",
    header: "Line",
  },
  {
    accessorKey: "desc",
    header: "Deskripsi",
  },
  {
    accessorKey: "code",
    header: "Kode",
    cell: ({ row }) => {
      const code: logs_code = row.getValue("code");
      return <Badge variant={getBadgeVariant(code)}>{code}</Badge>;
    },
  },
];
