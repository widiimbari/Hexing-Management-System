"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Use window.location.href for a hard redirect to ensure cookies are processed 
        // and middleware state is correctly updated in production
        window.location.href = "/dashboard";
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
    <div className="w-full h-screen flex relative overflow-hidden selection:bg-[#008AD8] selection:text-white">
      
      {/* --- Background Layer with Dark Overlay --- */}
      <div className="absolute inset-0 z-0">
        <Image 
            src="/background.webp" 
            alt="Factory Background" 
            fill 
            className="object-cover"
            priority
        />
        {/* Overlay Hitam 60% untuk kontras teks maksimal */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="container relative z-10 mx-auto h-full flex flex-col md:flex-row items-center justify-center px-6 lg:px-12">
        
        {/* --- LEFT SIDE: Clean Branding (No Slider) --- */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-4 md:pr-16 mb-12 md:mb-0">
            
            <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-lg">
                    HEXING <br/>
                    <span className="text-[#008AD8]">MANAGEMENT</span> <br/>
                    SYSTEM
                </h1>
                
                <p className="text-lg text-slate-300 font-normal max-w-md leading-relaxed border-l-4 border-[#008AD8] pl-4">
                    Streamlining operations with precision tracking and integrated smart analytics.
                </p>
            </div>
        </div>

        {/* --- RIGHT SIDE: High-End Glassmorphism Form --- */}
        <div className="w-full md:w-[460px] flex items-center justify-center">
            <div className="w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] p-8 md:p-12 relative">
                
                {/* Logo Centered in Form */}
                <div className="flex justify-center mb-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/HEXING LOGO.png?v=2" 
                        alt="Hexing Logo" 
                        width={230} 
                        className="object-contain filter drop-shadow-[1px_0_0_#008AD8] drop-shadow-[-1px_0_0_#008AD8] drop-shadow-[0_1px_0_#008AD8] drop-shadow-[0_-1px_0_#008AD8]" 
                    />
                </div>

                <div className="space-y-2 mb-10 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white tracking-tight text-center">Sign In</h2>
                    <p className="text-slate-400 text-sm text-center">Welcome back, please enter your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        {/* Label Color changed to Light Slate for readability on dark glass */}
                        <Label className="text-xs font-bold uppercase text-slate-300 ml-1 tracking-wider">Username</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <User className="h-5 w-5 text-slate-500 group-focus-within:text-[#008AD8] transition-colors" />
                            </div>
                            {/* Input White Solid as requested */}
                            <Input 
                                id="username" 
                                className="pl-12 h-14 bg-white border-none focus:ring-4 focus:ring-[#008AD8]/50 transition-all rounded-2xl font-semibold text-slate-900 placeholder:text-slate-400 shadow-md"
                                placeholder="Enter username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-slate-300 ml-1 tracking-wider">Password</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-[#008AD8] transition-colors" />
                            </div>
                            <Input 
                                id="password" 
                                type={showPassword ? "text" : "password"}
                                className="pl-12 pr-12 h-14 bg-white border-none focus:ring-4 focus:ring-[#008AD8]/50 transition-all rounded-2xl font-semibold text-slate-900 placeholder:text-slate-400 shadow-md"
                                placeholder="Enter password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                             <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#008AD8] focus:outline-none transition-colors z-10"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <div className="flex justify-end pt-1">
                            {/* Forgot Password Link - White Text */}
                            <div className="text-slate-300 hover:text-white transition-colors text-sm">
                                <ForgotPasswordDialog />
                            </div>
                        </div>
                    </div>
                    
                    {error && (
                        <Alert variant="destructive" className="bg-red-500/20 backdrop-blur border border-red-500/30 text-white rounded-xl py-3 border-none">
                            <AlertDescription className="flex items-center justify-center gap-2 font-medium text-sm">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Button with Strong Shadow */}
                    <Button 
                        type="submit" 
                        className="w-full h-14 text-base font-bold bg-[#008AD8] hover:bg-[#0070B0] text-white shadow-lg shadow-blue-600/40 hover:shadow-blue-600/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 rounded-2xl mt-4" 
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-3">
                                <Loader2 className="h-5 w-5 animate-spin" /> Signing In...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                SIGN IN <ArrowRight className="h-5 w-5" />
                            </span>
                        )}
                    </Button>
                </form>
                
                <div className="mt-8 text-center border-t border-white/10 pt-6">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">PT Hexing Technology</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}