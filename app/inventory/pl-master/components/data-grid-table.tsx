"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Simplified interface compatible with what the pages are passing
interface GridColDef {
  field: string;
  headerName: string;
  width?: number;
  renderCell?: (params: any) => React.ReactNode;
  valueFormatter?: (value: any) => string;
}

interface DataGridTableProps {
  rows: any[];
  rowCount: number;
  loading: boolean;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
  columns: GridColDef[];
}

export default function DataGridTable({
  rows,
  rowCount, // We might ignore this if we do client-side slicing
  loading,
  paginationModel,
  onPaginationModelChange,
  columns,
}: DataGridTableProps) {
  
  // Implement client-side pagination logic
  // The parent passes 'page' (0-indexed) and 'pageSize'.
  // We will use these to slice the 'rows' array.
  
  const startIndex = paginationModel.page * paginationModel.pageSize;
  const endIndex = startIndex + paginationModel.pageSize;
  const currentRows = rows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const handleNext = () => {
    if (paginationModel.page < totalPages - 1) {
      onPaginationModelChange({ ...paginationModel, page: paginationModel.page + 1 });
    }
  };

  const handlePrev = () => {
    if (paginationModel.page > 0) {
      onPaginationModelChange({ ...paginationModel, page: paginationModel.page - 1 });
    }
  };

  const handlePageSizeChange = (value: string) => {
    onPaginationModelChange({ page: 0, pageSize: parseInt(value) });
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading data...</div>;
  }

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-primary/5">
            <TableRow>
              {columns.map((col) => (
                <TableHead 
                    key={col.field} 
                    style={{ width: col.width }}
                    className="text-primary font-bold whitespace-nowrap"
                >
                  {col.headerName}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows.map((row, rowIndex) => (
                <TableRow key={row.id || rowIndex} className="hover:bg-primary/5 transition-colors">
                  {columns.map((col) => {
                    const value = row[col.field];
                    // Prepare params for renderCell similar to MUI
                    const params = {
                      row,
                      value,
                      id: row.id,
                      api: {
                          getAllRowIds: () => rows.map(r => r.id) // Mock for index calculation
                      }
                    };

                    let cellContent: React.ReactNode = value;

                    if (col.valueFormatter) {
                      cellContent = col.valueFormatter(value);
                    }
                    
                    if (col.renderCell) {
                      cellContent = col.renderCell(params);
                    }

                    return (
                      <TableCell key={col.field} className="py-3">
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Rows per page</span>
            <Select 
                value={String(paginationModel.pageSize)} 
                onValueChange={handlePageSizeChange}
            >
                <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={paginationModel.pageSize} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                </SelectContent>
            </Select>
            <span>
                {startIndex + 1}-{Math.min(endIndex, rows.length)} of {rows.length}
            </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={paginationModel.page === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={paginationModel.page >= totalPages - 1}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
