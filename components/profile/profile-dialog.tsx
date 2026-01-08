"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  image_url: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) return false;
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: { username: string; role: string; name?: string; image_url?: string } | null;
}

export function ProfileDialog({ isOpen, onClose, user }: ProfileDialogProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      image_url: user?.image_url || "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user && isOpen) {
      form.reset({
        name: user.name || "",
        image_url: user.image_url || "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user, isOpen, form]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      form.setValue("image_url", data.imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setSuccessMessage("");
    try {
      const payload: any = {
        name: values.name,
        image_url: values.image_url,
      };
      if (values.newPassword) payload.newPassword = values.newPassword;

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      
      setSuccessMessage("Profile updated successfully. Please log in again to see changes if name/photo was changed.");
      
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
        window.location.reload(); 
      }, 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            Manage your account settings.
          </DialogDescription>
        </DialogHeader>
        
        {user && (
            <div className="mb-4 flex flex-col items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                    <AvatarImage src={user.image_url || `https://ui-avatars.com/api/?name=${user.name || user.username}&background=random`} />
                    <AvatarFallback>{(user.name || user.username)?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="w-full space-y-1">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold text-xs text-right text-slate-500 uppercase">Login:</span>
                        <span className="col-span-3 text-sm font-mono">{user.username}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold text-xs text-right text-slate-500 uppercase">Role:</span>
                        <span className="col-span-3 text-xs font-bold uppercase tracking-wider text-primary">{user.role.replace("_", " ")}</span>
                    </div>
                </div>
            </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border">
                      <AvatarImage src={field.value} />
                      <AvatarFallback>
                        {uploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Camera className="h-6 w-6 text-muted-foreground" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="profile-photo-upload"
                        onChange={handleFileUpload}
                        disabled={uploading || loading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={uploading || loading}
                        onClick={() => document.getElementById("profile-photo-upload")?.click()}
                      >
                        {uploading ? "Uploading..." : "Choose File"}
                      </Button>
                      <p className="text-[10px] text-muted-foreground">
                        JPG, PNG or GIF. Max 2MB.
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="border-t pt-4 mt-4">
                <p className="text-xs font-bold text-slate-500 mb-4 uppercase">Change Password (Optional)</p>
                <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Leave empty to keep current" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem className="mt-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            {successMessage && (
                <div className="text-xs text-green-600 font-bold text-center bg-green-50 p-2 rounded border border-green-100">
                    {successMessage}
                </div>
            )}

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={loading || uploading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Profile
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}