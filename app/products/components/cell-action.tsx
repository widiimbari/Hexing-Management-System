"use client";

import { useState } from "react";
import { ProductWithRelations } from "./columns";
import { Copy, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductEditForm } from "./product-edit-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRole } from "@/hooks/use-role";

interface CellActionProps {
  data: ProductWithRelations;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { role } = useRole();
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${data.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }

      router.refresh();
      window.location.reload(); 
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsAlertOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(data.serial)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Serial
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDetailOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          {role === "admin" && (
            <>
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => setIsAlertOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Viewing full technical details for product: {data.serial}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh] pr-4">
             <div className="grid grid-cols-2 gap-4 text-sm">
                {/* Main Info */}
                <div className="font-semibold text-muted-foreground">Serial Number</div>
                <div className="font-bold">{data.serial}</div>
                
                <div className="font-semibold text-muted-foreground">Type</div>
                <div>{data.type}</div>
                
                <div className="font-semibold text-muted-foreground">Order No</div>
                <div>{data.orderno}</div>
                
                <div className="font-semibold text-muted-foreground">Line</div>
                <div>{data.line}</div>

                <div className="font-semibold text-muted-foreground">Module Serial</div>
                <div>{data.module_serial || "-"}</div>

                 <div className="font-semibold text-muted-foreground">Area</div>
                <div>{data.area || "-"}</div>

                 <div className="font-semibold text-muted-foreground">Jenis</div>
                <div>{data.jenis || "-"}</div>

                 <div className="font-semibold text-muted-foreground">Garansi</div>
                <div>{data.garansi || "-"}</div>

                 {/* Grouping Info */}
                <div className="col-span-2 my-2 border-b"></div>
                <div className="col-span-2 font-medium text-primary">Packaging Information</div>

                <div className="font-semibold text-muted-foreground">Box Serial</div>
                <div>{data.box_serial}</div>

                <div className="font-semibold text-muted-foreground">Pallet Serial</div>
                <div>{data.pallet_serial}</div>

                 {/* Attachment Info */}
                <div className="col-span-2 my-2 border-b"></div>
                <div className="col-span-2 font-medium text-primary">Attachments</div>

                <div className="font-semibold text-muted-foreground">PL Master (Attachment)</div>
                <div>{data.attachment_nomor}</div>

                <div className="font-semibold text-muted-foreground">PL Slave (Attachment 2)</div>
                <div>{data.attachment2_nomor}</div>
                
                {/* Timestamp */}
                <div className="col-span-2 my-2 border-b"></div>
                <div className="font-semibold text-muted-foreground">Production Date</div>
                <div>{new Date(data.timestamp).toLocaleString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: "UTC"
                })}</div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the metadata for this product record.
            </DialogDescription>
          </DialogHeader>
          <ProductEditForm 
            product={data} 
            onSuccess={() => {
                setIsEditOpen(false);
                window.location.reload(); 
            }} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-bold text-foreground">{data.serial}</span>? <br/>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};