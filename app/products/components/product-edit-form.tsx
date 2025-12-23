"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { product } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the shape of our form.
const formSchema = z.object({
  serial: z.string().min(1, "Serial number is required."),
  orderno: z.string().optional(),
  line: z.string().optional(),
  type: z.string().optional(),
  // Add other fields you want to be editable
});

interface ProductEditFormProps {
  product: product;
  onSuccess: () => void;
}

export function ProductEditForm({ product, onSuccess }: ProductEditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serial: product.serial,
      orderno: product.orderno || "",
      line: product.line || "",
      type: product.type || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      router.refresh();
      onSuccess(); // Close the dialog on success
      // TODO: Add success toast
    } catch (error) {
      console.error(error);
      // TODO: Add error toast
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="serial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input placeholder="Product serial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orderno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order No</FormLabel>
              <FormControl>
                <Input placeholder="Order number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="line"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Line</FormLabel>
              <FormControl>
                <Input placeholder="Production line" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Product type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
