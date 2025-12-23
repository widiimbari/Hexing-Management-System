
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  FileSpreadsheet,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Inventory", icon: Boxes },
  { href: "/pl-master", label: "PL Master", icon: ClipboardList },
  { href: "/pl-slave", label: "PL Slave", icon: FileSpreadsheet },
];

function NavItems({ pathname, isCollapsed, onLinkClick }: { pathname: string; isCollapsed?: boolean; onLinkClick?: () => void }) {
  return (
    <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            onClick={onLinkClick}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 relative",
              isActive 
                ? "bg-primary/10 text-primary font-bold shadow-sm" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              isCollapsed && "justify-center px-2"
            )}
            title={isCollapsed ? label : undefined}
          >
            {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-full" />
            )}
            <Icon className={cn(
                "h-5 w-5 transition-transform duration-200", 
                isActive ? "scale-110" : "group-hover:scale-110"
            )} />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={cn("hidden border-r bg-muted/40 md:block transition-all duration-300 h-screen sticky top-0", isCollapsed ? "w-[60px]" : "w-full")}>
      <div className="flex h-full flex-col gap-2">
        <div className={cn("flex h-14 shrink-0 items-center border-b px-4 lg:h-[60px]", isCollapsed ? "justify-center px-2" : "justify-between lg:px-6")}>
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6" />
              <span className="">Hexing Inventory</span>
            </Link>
          )}
          {isCollapsed && (
             <Package className="h-6 w-6" />
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className={cn("ml-auto", isCollapsed && "hidden")}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </div>
        
        {isCollapsed && (
            <div className="flex justify-center py-2 border-b shrink-0">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        )}

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <NavItems pathname={pathname} isCollapsed={isCollapsed} />
        </div>
        <div className="mt-auto p-4 border-t shrink-0">
          <Button
            variant="ghost"
            className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isCollapsed ? "justify-center px-0" : "justify-start"
            )}
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex h-14 shrink-0 items-center border-b bg-muted/40 px-4 md:hidden sticky top-0 z-50 backdrop-blur-sm">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 w-[280px]">
          <SheetHeader className="p-4 border-b shrink-0">
             <SheetTitle className="flex items-center gap-2 font-semibold">
               <Package className="h-6 w-6" />
               Hexing Inventory
             </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto py-4">
             <NavItems pathname={pathname} onLinkClick={() => setOpen(false)} />
          </div>
          <div className="p-4 border-t shrink-0">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-3 justify-start rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className="ml-4 font-bold text-lg truncate">
        Hexing Inventory
      </div>
    </div>
  );
}
