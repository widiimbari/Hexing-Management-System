"use client";

import { ColumnDef } from "@tanstack/react-table"; // Need to check if I can use this or the Custom DataTableColumn
import { DataTableColumn } from "@/components/ui/data-table";
import { CellAction } from "./cell-action";

export const columns: DataTableColumn<any>[] = [
  {
    header: "No",
    id: "no",
    width: 50,
    cell: ({ row }) => {
       // Since the DataTable component manages rendering, we might need to handle index there or pass it here.
       // The custom DataTable passes 'row' (the data object) and 'value'.
       // It seems difficult to get the index directly in the cell function of the custom DataTable unless 'row' has it or we pass it differently.
       // However, looking at the DataTable implementation:
       // {col.cell ? col.cell({ row, value }) : value}
       // The DataTable uses `rows.indexOf(row)` inside the component if needed, or we can just rely on the parent component to transform data?
       // Actually, in `app/products/page.tsx` I saw:
       /*
        cell: ({ row }) => {
              // Calculate global row index
              const rowIndex = rows.indexOf(row);
              return (pagination.pageIndex * pagination.pageSize) + rowIndex + 1;
          }
       */
       // But `rows` is state in the Page component. `columns` is defined outside or inside.
       // I'll define `columns` as a function in the Page component to access `rows` and `pagination`, 
       // OR I can just skip the "No" column here and define it in the page like in products.
       return null; 
    }
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  // Actions will be added in the page component or here if we pass success handler?
  // The CellAction needs `onSuccess` to refresh data. 
  // So columns probably need to be defined inside the component to access `fetchData`.
];
