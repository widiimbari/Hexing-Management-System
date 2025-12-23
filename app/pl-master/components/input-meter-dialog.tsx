"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  codes: z.string().min(1, "Please enter at least one code."),
});

interface InputMeterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attachmentId: number | null;
  nomor: string;
  type: string;
  onSuccess: () => void;
  mode?: "master" | "slave";
}

export function InputMeterDialog({
  isOpen,
  onClose,
  attachmentId,
  nomor,
  type,
  onSuccess,
  mode = "master",
}: InputMeterDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [detectedCount, setDetectedCount] = useState<number | null>(null);
  const [alreadyAssignedCount, setAlreadyAssignedCount] = useState<number | null>(null);
  const [conflictingCodes, setConflictingCodes] = useState<string[]>([]);
  const [invalidTypeCount, setInvalidTypeCount] = useState<number | null>(null);
  const [invalidTypeCodes, setInvalidTypeCodes] = useState<string[]>([]);
  const [noMasterCount, setNoMasterCount] = useState<number | null>(null);
  const [noMasterCodes, setNoMasterCodes] = useState<string[]>([]);
  const [validating, setValidating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codes: "",
    },
  });

  const codesValue = form.watch("codes");
  const debouncedCodes = useDebounce(codesValue, 500);

  // Reset form when dialog opens/closes or attachmentId changes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        codes: "",
      });
      setDetectedCount(null);
      setAlreadyAssignedCount(null);
      setConflictingCodes([]);
      setInvalidTypeCount(null);
      setInvalidTypeCodes([]);
      setNoMasterCount(null);
      setNoMasterCodes([]);
      setShowConfirm(false);
    }
  }, [isOpen, attachmentId, form]);

  // Validation Effect
  useEffect(() => {
    async function validate() {
      if (!debouncedCodes) {
        setDetectedCount(null);
        setAlreadyAssignedCount(null);
        setConflictingCodes([]);
        setInvalidTypeCount(null);
        setInvalidTypeCodes([]);
        setNoMasterCount(null);
        setNoMasterCodes([]);
        return;
      }

      setValidating(true);
      try {
        const codeList = debouncedCodes
          .split(/[\n,\r\t\s]+/)
          .map((s) => s.trim())
          .filter((s) => s !== "");

        if (codeList.length === 0) {
          setDetectedCount(null);
          setAlreadyAssignedCount(null);
          setConflictingCodes([]);
          setInvalidTypeCount(null);
          setInvalidTypeCodes([]);
          setNoMasterCount(null);
          setNoMasterCodes([]);
          setValidating(false);
          return;
        }

        const response = await fetch("/api/attachments/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            codes: codeList,
            inputType: "Auto",
            expectedType: type,
            mode: mode
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setDetectedCount(data.count);
          setAlreadyAssignedCount(data.alreadyAssigned || 0);
          setConflictingCodes(data.conflictingCodes || []);
          setInvalidTypeCount(data.invalidTypeCount || 0);
          setInvalidTypeCodes(data.invalidTypeCodes || []);
          setNoMasterCount(data.noMasterCount || 0);
          setNoMasterCodes(data.noMasterCodes || []);
        }
      } catch (error) {
        console.error("Validation error:", error);
      } finally {
        setValidating(false);
      }
    }

    validate();
  }, [debouncedCodes, type, mode]);

  // Trigger Confirmation Dialog
  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(() => {
      // Prevent saving if there are invalid types or missing masters
      if ((invalidTypeCount && invalidTypeCount > 0) || (noMasterCount && noMasterCount > 0)) {
        return; 
      }

      if (detectedCount !== null && detectedCount > 0) {
        setShowConfirm(true);
      } else {
        form.trigger(); 
      }
    })();
  };

  async function onConfirmSave() {
    if (!attachmentId) return;

    try {
      setIsLoading(true);
      const codeList = codesValue
        .split(/[\n,\r\t\s]+/)
        .map((s) => s.trim())
        .filter((s) => s !== "");

      const apiEndpoint = mode === "slave" 
        ? `/api/attachments2/${attachmentId}/add-items` 
        : `/api/attachments/${attachmentId}/add-items`;

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codes: codeList,
          inputType: "Auto",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to add items.");
      }

      router.refresh();
      onSuccess();
      setShowConfirm(false);
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Input Meter for: {nomor}</DialogTitle>
            <DialogDescription>
              Enter or paste product serials, box serials, or pallet serials below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="codes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Codes (One per line or comma separated)</FormLabel>
                    <FormControl>
                      <textarea
                        className={cn(
                          "flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        placeholder="Paste codes here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {validating && (
                      <p className="text-xs text-muted-foreground">Validating...</p>
                    )}
                    {!validating && detectedCount !== null && (
                      <div className="text-sm space-y-2">
                         <p className="font-medium text-green-600">
                           Found {detectedCount} products.
                         </p>
                         {invalidTypeCount !== null && invalidTypeCount > 0 && (
                            <div className="p-2 bg-red-50 border border-red-200 rounded-md">
                                <p className="font-bold text-red-600">
                                   ⛔ Error: {invalidTypeCount} items have mismatched Type (Expected: {type}).
                                </p>
                                <p className="text-xs text-red-500">
                                   Please remove these items before saving.
                                </p>
                                <ScrollArea className="h-[80px] w-full mt-2 bg-white p-2 rounded border">
                                  <ul className="list-disc pl-4 space-y-1">
                                    {invalidTypeCodes.map((code, i) => (
                                      <li key={i} className="text-xs text-red-600 font-mono">
                                        {code}
                                      </li>
                                    ))}
                                  </ul>
                                </ScrollArea>
                            </div>
                         )}
                         {noMasterCount !== null && noMasterCount > 0 && (
                            <div className="p-2 bg-red-50 border border-red-200 rounded-md mt-2">
                                <p className="font-bold text-red-600">
                                   ⛔ Error: {noMasterCount} items NOT found in any Master PL.
                                </p>
                                <p className="text-xs text-red-500">
                                   Slave PL items MUST exist in a Master PL first.
                                </p>
                                <ScrollArea className="h-[80px] w-full mt-2 bg-white p-2 rounded border">
                                  <ul className="list-disc pl-4 space-y-1">
                                    {noMasterCodes.map((code, i) => (
                                      <li key={i} className="text-xs text-red-600 font-mono">
                                        {code}
                                      </li>
                                    ))}
                                  </ul>
                                </ScrollArea>
                            </div>
                         )}
                         {alreadyAssignedCount !== null && alreadyAssignedCount > 0 && (
                            <p className="font-medium text-amber-600">
                               Warning: {alreadyAssignedCount} items are already assigned to another {mode === 'slave' ? 'Slave' : 'Master'} PL.
                            </p>
                         )}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                   type="button" 
                   onClick={handleSaveClick} 
                   disabled={isLoading || validating || !detectedCount || (invalidTypeCount ? invalidTypeCount > 0 : false) || (noMasterCount ? noMasterCount > 0 : false)}
                >
                  {isLoading ? "Saving..." : "Save Items"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Save</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-sm">
                <p>You are about to add <strong>{detectedCount}</strong> products to {mode === 'slave' ? 'PL Slave' : 'PL Master'} <strong>{nomor}</strong>.</p>
                <br/>
                {alreadyAssignedCount !== null && alreadyAssignedCount > 0 && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-amber-800 font-bold mb-2">
                      ⚠️ WARNING: The following {alreadyAssignedCount} items are ALREADY assigned to another {mode === 'slave' ? 'Slave' : 'Master'} PL:
                    </p>
                    <ScrollArea className="h-[100px] w-full rounded border bg-white p-2">
                      <ul className="list-disc pl-4 space-y-1">
                        {conflictingCodes.map((code, i) => (
                          <li key={i} className="text-xs text-red-600 font-mono">
                            {code}
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                    <p className="mt-2 text-xs text-amber-700">
                      Proceeding will move them to this PL.
                    </p>
                  </div>
                )}
                {alreadyAssignedCount === 0 && (
                   <p className="text-muted-foreground">All products are ready to be assigned.</p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmSave} className="bg-green-600 hover:bg-green-700">
              Confirm Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
