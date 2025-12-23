"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar, MobileSidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <main className="flex flex-col min-h-screen">{children}</main>;
  }

  return (
    <div 
        className={cn(
            "flex flex-col md:grid min-h-screen w-full transition-all duration-300",
            isSidebarCollapsed 
                ? "md:grid-cols-[60px_1fr]" 
                : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
        )}
    >
      <MobileSidebar />
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className="flex flex-col flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
