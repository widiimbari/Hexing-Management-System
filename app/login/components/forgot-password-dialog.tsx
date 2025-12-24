"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

export function ForgotPasswordDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when closed
      setTimeout(() => {
        setSubmitted(false);
        setUsername("");
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button 
            type="button"
            className="text-xs text-blue-600 hover:text-blue-700 font-bold transition-colors hover:underline focus:outline-none"
        >
            Forgot Password?
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!submitted ? (
            <>
                <DialogHeader>
                <DialogTitle className="text-xl">Reset Password</DialogTitle>
                <DialogDescription>
                    Enter your username below. We will notify your administrator to reset your credentials.
                </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="reset-username" className="text-right">
                    Username
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="reset-username"
                            placeholder="Enter your username"
                            className="pl-9"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <DialogFooter className="pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={!username || loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Request Reset
                    </Button>
                </DialogFooter>
                </form>
            </>
        ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Request Sent</h3>
                <p className="text-sm text-slate-500 max-w-[280px]">
                    Your request has been logged. Please contact your system administrator or supervisor to complete the password reset process.
                </p>
                <Button 
                    className="mt-4 min-w-[120px]" 
                    onClick={() => setIsOpen(false)}
                >
                    Close
                </Button>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
