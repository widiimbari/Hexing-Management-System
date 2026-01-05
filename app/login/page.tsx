"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User, ArrowRight, Loader2, Sparkles, Eye, EyeOff } from "lucide-react";
import { ForgotPasswordDialog } from "./components/forgot-password-dialog";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        // Redirect to dashboard or home page
        router.push("/dashboard");
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
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-[#F8FAFC]">
      
      {/* --- Dynamic Soft Background (Subtle Gradient Animation) --- */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-100 to-slate-200">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-blue-400/10 blur-[100px] animate-blob" />
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-purple-400/10 blur-[100px] animate-blob delay-2000" />
            <div className="absolute -bottom-[30%] left-[20%] w-[50%] h-[50%] rounded-full bg-emerald-400/10 blur-[100px] animate-blob delay-4000" />
         </div>
      </div>

      {/* --- Main Content Layout --- */}
      <div className="relative z-10 w-full max-w-5xl h-full md:h-[600px] flex rounded-[2rem] overflow-hidden md:shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:mx-4">
        
        {/* Left Side: Illustration / Brand (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 relative bg-slate-900 items-center justify-center p-12 overflow-hidden group text-white">
            {/* Background Image/Pattern */}
            <div className="absolute inset-0 opacity-40">
                <Image 
                    src="/images/login1.png" 
                    alt="Industrial Background"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    priority
                />
            </div>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                {/* Logo on the left panel */}
                <div className="bg-white p-6 rounded-2xl shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/HEXING LOGO.png?v=2" 
                        alt="Hexing Logo" 
                        width={200} 
                        height={70} 
                        className="object-contain"
                    />
                </div>

                <div className="space-y-4 max-w-sm">
                    <h2 className="text-4xl font-bold tracking-tight leading-tight">
                        Hexing <br/>
                        <span className="text-blue-400">Management System</span>
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Streamline your operations with real-time tracking and secure data handling.
                    </p>
                </div>
            </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 bg-white/80 md:bg-white backdrop-blur-xl flex flex-col justify-center p-8 sm:p-12 lg:p-16 relative">
            
            {/* Mobile-only Logo (if needed, but already prominently on left for desktop) */}
            <div className="md:hidden flex justify-center mb-8">
                 <div className="bg-white p-4 rounded-xl shadow-md border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/HEXING LOGO.png?v=2" 
                        alt="Hexing Logo" 
                        width={140} 
                        height={50} 
                        className="object-contain"
                    />
                 </div>
            </div>

            <div className="space-y-2 mb-8 text-center md:text-left">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
                <p className="text-slate-500">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-slate-400 ml-1 tracking-widest">Username</Label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <Input 
                            id="username" 
                            className="pl-12 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl font-medium"
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-slate-400 ml-1 tracking-widest">Password</Label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"}
                            className="pl-12 pr-12 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl font-medium"
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                         <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {/* Forgot password moved here (below input) */}
                    <div className="flex justify-end px-1 pt-1">
                        <ForgotPasswordDialog />
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
                    className="w-full h-12 text-sm font-bold bg-slate-900 hover:bg-blue-600 text-white shadow-lg shadow-slate-200 hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300 rounded-xl group mt-2" 
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
            
             <div className="mt-8 text-center md:hidden text-slate-400 text-xs">
                Secure Enterprise System
            </div>
        </div>
      </div>
    </div>
  );
}
