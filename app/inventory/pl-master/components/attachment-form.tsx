"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  nomor: z.string().min(1, "No Packing List is required."),
  timestamp: z.date({
    message: "Tanggal is required.",
  }),
  type: z.string().min(1, "Type is required."),
  tgl_order: z.date({
    message: "Tanggal Test is required.",
  }),
  area: z.string().min(1, "Area is required."),
});

interface AttachmentFormProps {
  onSuccess: () => void;
  initialData?: any;
}

export function AttachmentForm({ onSuccess, initialData }: AttachmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isOrderCalendarOpen, setIsOrderCalendarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/meter-types")
      .then((res) => res.json())
      .then((data) => setTypes(data))
      .catch((err) => console.error(err));
  }, []);

  // Function to convert month to Roman numerals
  const monthToRoman = (month: number): string => {
    const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    return romans[month - 1] || "I";
  };

  // Function to generate packing list number
  const generatePackingListNumber = (type: string, date: Date = new Date()): string => {
    if (!type) return "";

    const month = date.getMonth() + 1; // 1-12
    const year = date.getFullYear().toString().slice(-2); // Last 2 digits
    const romanMonth = monthToRoman(month);

    return `${type}/PL-MASTER/HT-WH/${romanMonth}/${year}`;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomor: initialData?.nomor || "",
      type: initialData?.type || "",
      area: initialData?.area || "",
      timestamp: initialData?.timestamp ? new Date(initialData.timestamp) : undefined,
      tgl_order: initialData?.tgl_order ? new Date(initialData.tgl_order) : undefined,
    },
  });

  // Watch type and timestamp changes to auto-generate nomor
  const watchType = form.watch("type");
  const watchTimestamp = form.watch("timestamp");

  useEffect(() => {
    // Only auto-generate if not editing (no initialData) or if nomor is empty
    if (watchType && (!initialData || !form.getValues("nomor"))) {
      const date = watchTimestamp || new Date();
      const generatedNomor = generatePackingListNumber(watchType, date);
      form.setValue("nomor", generatedNomor);
    }
  }, [watchType, watchTimestamp]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const url = initialData 
        ? `/api/attachments/${initialData.id}` 
        : "/api/attachments";
      
      const method = initialData ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          timestamp: format(values.timestamp, "yyyy-MM-dd"),
          tgl_order: format(values.tgl_order, "yyyy-MM-dd"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create attachment.");
      }

      router.refresh();
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Type Field - FIRST */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type Meter</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih type meter" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* No Packing List Field - THIRD (Auto-generated, editable) */}
        <FormField
          control={form.control}
          name="nomor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No Packing List</FormLabel>
              <FormControl>
                <Input
                  placeholder="No Attachment"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

                {/* Tanggal Field - SECOND */}
        <FormField
          control={form.control}
          name="timestamp"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal</FormLabel>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                        field.onChange(date);
                        setIsCalendarOpen(false);
                    }}
                    disabled={(date) =>
                       date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tgl_order"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal Test</FormLabel>
              <Popover open={isOrderCalendarOpen} onOpenChange={setIsOrderCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                        field.onChange(date);
                        setIsOrderCalendarOpen(false);
                    }}
                    disabled={(date) =>
                       date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
              <FormControl>
                <Input placeholder="Area" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Update Attachment" : "Create Attachment"}
        </Button>
      </form>
    </Form>
  );
}
