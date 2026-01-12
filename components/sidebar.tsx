"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  Users,
  User,
  History,
  Monitor,
  ArrowLeftRight,
  Shield,
  LucideIcon,
  ChevronDown,
  ChevronRight,
  Map,
  Tag,
  Layers,
  Building2,
  UsersRound,
  MapPin,
  Truck,
  List,
  Activity,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { ProfileDialog } from "@/components/profile/profile-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type NavGroup = {
  title: string;
  icon: LucideIcon;
  href?: string; // If present, it's a direct link
  items: NavItem[]; // If NOT empty, it's a dropdown
};

const initialNavGroups: NavGroup[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    items: []
  },
  {
    title: "Inventory",
    icon: Package,
    items: [
      { href: "/inventory/products", label: "Products", icon: Boxes },
      { href: "/inventory/pl-master", label: "PL Master", icon: ClipboardList },
      { href: "/inventory/pl-slave", label: "PL Slave", icon: FileSpreadsheet },
    ]
  },
  {
    title: "Asset Management",
    icon: Monitor,
    items: [
      { href: "/asset-management/assets", label: "Assets", icon: List },
      { href: "/asset-management/consumables", label: "Non-SAP Assets", icon: ShoppingCart },
      { href: "/asset-management/transactions", label: "Transactions", icon: ArrowLeftRight },
      { href: "/asset-management/employees", label: "Employees", icon: UsersRound },
      { href: "/asset-management/departments", label: "Departments", icon: Building2 },
      { href: "/asset-management/locations", label: "Locations", icon: MapPin },
      { href: "/asset-management/areas", label: "Areas", icon: Map },
      { href: "/asset-management/suppliers", label: "Suppliers", icon: Truck },
      { href: "/asset-management/categories", label: "Categories", icon: Layers },
      { href: "/asset-management/brands", label: "Brands", icon: Tag },
    ]
  },
  {
    title: "System Logs",
    icon: Activity,
    href: "/system-logs",
    items: []
  }
];

function NavItems({ pathname, isCollapsed, onLinkClick, groups }: { pathname: string; isCollapsed?: boolean; onLinkClick?: () => void; groups: NavGroup[] }) {
  // State to track expanded groups. Initialize based on current path.
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Auto-expand group if current path matches one of its items
    const newExpandedState: Record<string, boolean> = {};
    groups.forEach(group => {
       if (group.items.length > 0) {
           const hasActiveItem = group.items.some(item => pathname.startsWith(item.href) || pathname === item.href);
           if (hasActiveItem) {
               newExpandedState[group.title] = true;
           }
       }
    });
    setExpandedGroups(prev => ({ ...prev, ...newExpandedState }));
  }, [pathname, groups]);

  const toggleGroup = (title: string) => {
    if (isCollapsed) return; // Don't toggle in collapsed mode (maybe show hover menu instead? keeping simple for now)
    setExpandedGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
      {groups.map((group, groupIndex) => {
        const isDirectLink = group.items.length === 0;
        const isActiveGroup = isDirectLink ? (pathname === group.href) : group.items.some(item => pathname === item.href);
        const isExpanded = expandedGroups[group.title];

        if (isDirectLink) {
            return (
              <Link
                key={group.title}
                href={group.href!}
                onClick={onLinkClick}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 relative",
                  isActiveGroup 
                    ? "bg-primary/10 text-primary font-bold shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? group.title : undefined}
              >
                {isActiveGroup && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-full" />
                )}
                <group.icon className={cn(
                    "h-5 w-5 transition-transform duration-200", 
                    isActiveGroup ? "scale-110" : "group-hover:scale-110"
                )} />
                {!isCollapsed && <span>{group.title}</span>}
              </Link>
            );
        }

        // Dropdown Group
        return (
            <div key={group.title} className="flex flex-col gap-1">
                <Button
                    variant="ghost"
                    onClick={() => toggleGroup(group.title)}
                    className={cn(
                        "w-full flex items-center justify-between p-2 h-auto hover:bg-muted/50 transition-all",
                        isCollapsed ? "justify-center px-0" : "justify-start px-3 py-2.5",
                        isActiveGroup && !isExpanded && "text-primary font-medium" 
                    )}
                    title={isCollapsed ? group.title : undefined}
                >
                    <div className="flex items-center gap-3">
                         <group.icon className={cn("h-5 w-5", isActiveGroup ? "text-primary" : "text-muted-foreground")} />
                         {!isCollapsed && <span className={cn(isActiveGroup ? "text-foreground" : "text-muted-foreground")}>{group.title}</span>}
                    </div>
                    {!isCollapsed && (
                        <div className="ml-auto">
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </div>
                    )}
                </Button>

                {/* Sub Items */}
                {isExpanded && !isCollapsed && (
                    <div className="ml-4 pl-2 border-l border-muted flex flex-col gap-1 mt-1">
                        {group.items.map((item) => {
                            const isItemActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={onLinkClick}
                                    className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                                    isItemActive 
                                        ? "bg-muted text-primary font-medium" 
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        );
      })}
    </nav>
  );
}

interface UserInfo {
  username: string;
  role: string;
  name?: string;
  image_url?: string | null;
}

export function Sidebar({ isCollapsed, toggleSidebar }: { isCollapsed: boolean; toggleSidebar: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [navGroups, setNavGroups] = useState(initialNavGroups);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          if (userData.role === "super_admin") {
            setNavGroups(prev => {
                if (prev.some(g => g.title === "Admin")) return prev;
                return [
                    ...prev,
                    {
                        title: "Admin",
                        icon: Shield,
                        items: [
                             { href: "/admin/users", label: "Users", icon: Users },
                        ]
                    }
                ]
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUser();
  }, []);

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

  const UserMenu = ({ isMobile = false }: { isMobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
            variant="ghost" 
            className={cn(
                "w-full flex items-center gap-3 p-2 h-auto hover:bg-muted/50 transition-all", 
                isCollapsed && !isMobile ? "justify-center px-0" : "justify-start px-2",
                "rounded-xl border border-transparent hover:border-border"
            )}
        >
          <Avatar className="h-9 w-9 border cursor-pointer">
            <AvatarImage src={user?.image_url || `https://ui-avatars.com/api/?name=${user?.name || user?.username}&background=random`} alt={user?.name || user?.username} />
            <AvatarFallback>{(user?.name || user?.username)?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          {(!isCollapsed || isMobile) && (
             <div className="flex flex-col items-start text-left overflow-hidden transition-all duration-200">
                <span className="text-sm font-semibold truncate w-full max-w-[140px] leading-none mb-1">
                    {user?.name || user?.username || "Guest"}
                </span>
                <span className="text-xs text-muted-foreground font-medium uppercase text-[10px] tracking-wider">
                    {user?.role?.replace("_", " ") || "Visitor"}
                </span>
             </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" side={isCollapsed && !isMobile ? "right" : "top"}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.role?.replace("_", " ")} account
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setIsProfileOpen(true)} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <ProfileDialog isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} />
      <div className={cn("hidden border-r bg-muted/40 md:flex flex-col transition-all duration-300 h-screen sticky top-0 flex-shrink-0", isCollapsed ? "w-[60px]" : "w-[240px]")}>
        <div className="flex h-14 shrink-0 items-center border-b px-4 lg:h-[60px] justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2 font-semibold truncate">
              <img src="/icon hexing.png" alt="Hexing Logo" className="h-8 w-8 object-contain" />
              <span>Hexing System</span>
            </Link>
          )}
          {isCollapsed && (
             <div className="w-full flex justify-center">
                <img src="/icon hexing.png" alt="Hexing Logo" className="h-8 w-8 object-contain" />
             </div>
          )}
          {!isCollapsed && (
             <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
               <ChevronsLeft className="h-4 w-4" />
             </Button>
          )}
        </div>
        
        {isCollapsed && (
             <div className="flex justify-center py-2 border-b shrink-0">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        )}

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 custom-scrollbar">
          <NavItems pathname={pathname} isCollapsed={isCollapsed} groups={navGroups} />
        </div>

        {/* User Profile Section */}
        <div className="mt-auto border-t bg-background p-2">
            <UserMenu />
        </div>
      </div>
    </>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [navGroups, setNavGroups] = useState(initialNavGroups);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          if (userData.role === "super_admin") {
            setNavGroups(prev => {
                if (prev.some(g => g.title === "Admin")) return prev;
                return [
                    ...prev,
                    {
                        title: "Admin",
                        icon: Shield,
                        items: [
                             { href: "/admin/users", label: "Users", icon: Users },
                        ]
                    }
                ]
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUser();
  }, []);

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

   const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full flex items-center justify-start gap-3 p-2 h-auto rounded-xl border border-transparent hover:bg-muted/50 hover:border-border">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={user?.image_url || `https://ui-avatars.com/api/?name=${user?.name || user?.username}&background=random`} alt={user?.name || user?.username} />
            <AvatarFallback>{(user?.name || user?.username)?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-semibold">{user?.name || user?.username || "Guest"}</span>
            <span className="text-xs text-muted-foreground capitalize">{user?.role?.replace("_", " ")}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" align="start" side="top">
         <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
          <User className="mr-2 h-4 w-4" />
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
    <ProfileDialog isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} />
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
               <img src="/icon hexing.png" alt="Hexing Logo" className="h-8 w-8 object-contain" />
               Hexing System
             </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
             <NavItems pathname={pathname} onLinkClick={() => setOpen(false)} groups={navGroups} />
          </div>
          
          <div className="p-4 border-t bg-background">
             <UserMenu />
          </div>
        </SheetContent>
      </Sheet>
      <div className="ml-4 font-bold text-lg truncate">
        Hexing Management System
      </div>
    </div>
    </>
  );
}