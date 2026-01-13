"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Trash } from "lucide-react";
import { CopyLinkButton } from "./copy-link-button";

interface ExpandedRowProps {
  doc: any;
  items: any[];
  onSettle: (item: any) => void;
  onDelete: (id: string, name: string) => void;
  onViewImage: (src: string, alt: string) => void;
}

export function ExpandedRow({ doc, items, onSettle, onDelete, onViewImage }: ExpandedRowProps) {
  const docItems = items.filter(i => i.document_number === doc.document_number);
  
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden m-4">
        <Table>
            <TableHeader className="bg-slate-100/80">
                <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead className="text-center">Qty (Est)</TableHead>
                    <TableHead className="text-right">Price (Est)</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {docItems.map(item => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.item_name}</TableCell>
                    <TableCell>{item.brand_type || "-"}</TableCell>
                    <TableCell>
                        <CopyLinkButton url={item.purchase_link} />
                    </TableCell>
                    <TableCell className="text-center">{item.qty_estimated}</TableCell>
                    <TableCell className="text-right">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(parseFloat(item.price_estimated))}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">{item.remarks || "-"}</TableCell>
                    <TableCell>
                        {item.status === "COMPLETED" ? (
                            <Badge variant="outline" className="text-emerald-600 border-emerald-600 bg-emerald-50">Bought</Badge>
                        ) : (
                            <Badge variant="outline" className="text-amber-600 border-amber-600 bg-amber-50">Pending</Badge>
                        )}
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-2 items-center">
                            {item.item_image && (
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onViewImage(item.item_image, item.item_name)}>
                                    <ImageIcon className="h-4 w-4" />
                                </Button>
                            )}
                            {item.status === "PENDING" && (
                                <Button size="sm" onClick={() => onSettle(item)} className="h-8">
                                    Settle
                                </Button>
                            )}
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => onDelete(item.id, item.item_name)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}
