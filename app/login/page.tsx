"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User, ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh(); 
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-[#F0F4F8]">
      
      {/* --- Dynamic Soft Background --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob delay-4000"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[800px] h-[800px] bg-emerald-100 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob delay-6000"></div>
      </div>

      {/* --- Floating Glass Card --- */}
      <div className="relative z-10 w-full max-w-[420px] px-4 animate-fade-in-up">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl shadow-sm border border-white/50 mb-6">
                <Image 
                    src="/HEXING LOGO.png" 
                    alt="Hexing Logo" 
                    width={160} 
                    height={60} 
                    className="object-contain"
                    priority
                />
            </div>
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back</h1>
                <p className="text-slate-500 font-medium">Inventory Management System</p>
            </div>
        </div>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/80 backdrop-blur-xl rounded-[2rem]">
            <CardContent className="p-8 space-y-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-slate-400 ml-1 tracking-widest">Username</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <Input 
                                id="username" 
                                className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl font-medium"
                                placeholder="Enter your username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <Label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Password</Label>
                            <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-bold transition-colors">Forgot?</a>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <Input 
                                id="password" 
                                type="password" 
                                className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl font-medium"
                                placeholder="Enter your password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-600 rounded-xl animate-shake">
                            <AlertDescription className="flex items-center justify-center gap-2 text-xs font-bold">
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button 
                        type="submit" 
                        className="w-full h-12 text-sm font-bold bg-slate-900 hover:bg-blue-600 text-white shadow-xl shadow-slate-200 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 rounded-xl group" 
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
        
        <div className="mt-8 text-center flex justify-center items-center gap-2 text-slate-400 text-xs font-medium">
            <Sparkles className="h-3 w-3 text-blue-400" />
            <span>Secure Enterprise System</span>
        </div>
      </div>
    </div>
  );
}