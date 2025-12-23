"use client";

import { ColumnDef } from "@tanstack/react-table";
import { attachment } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<attachment>[] = [
  {
    accessorKey: "nomor",
    header: "Nomor Attachment",
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
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Manage Products</DropdownMenuItem>
            <DropdownMenuItem>Print</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
