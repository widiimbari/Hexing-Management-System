import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Boxes, Package, Users, Activity, FileText, Truck, ClipboardList, Monitor } from "lucide-react";
import Link from "next/link";
import { db, dbAsset, dbManagement } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function getStats() {
  // Run queries in parallel for performance
  const [
    productCount,
    plMasterCount,
    assetCount,
    employeeCount,
    recentLogs
  ] = await Promise.all([
    db.product.count(),
    db.attachment.count({ where: { active: true } }),
    dbAsset.assets.count(),
    dbAsset.employees.count(),
    db.audit_logs.findMany({
      take: 5,
      orderBy: { timestamp: 'desc' }
    })
  ]);

  return {
    productCount,
    plMasterCount,
    assetCount,
    employeeCount,
    recentLogs
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="p-8 space-y-8 container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Overview of your inventory and asset management system.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-white px-3 py-1 rounded-full border shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Operational
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Products */}
        <Link href="/inventory/products">
            <Card className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Products</CardTitle>
                <Boxes className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stats.productCount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Recorded items</p>
                </CardContent>
            </Card>
        </Link>

        {/* PL Master */}
        <Link href="/inventory/pl-master">
            <Card className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-indigo-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active PL Masters</CardTitle>
                <ClipboardList className="h-4 w-4 text-indigo-500" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stats.plMasterCount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Open packing lists</p>
                </CardContent>
            </Card>
        </Link>

        {/* Assets */}
        <Link href="/asset-management/assets">
            <Card className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-emerald-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Assets</CardTitle>
                <Monitor className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stats.assetCount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Registered company assets</p>
                </CardContent>
            </Card>
        </Link>

        {/* Employees */}
        <Link href="/asset-management/employees">
            <Card className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-orange-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Employees</CardTitle>
                <Users className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stats.employeeCount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Active personnel</p>
                </CardContent>
            </Card>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* --- RECENT ACTIVITY --- */}
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system actions and updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {stats.recentLogs.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No recent activity found.</p>
                ) : (
                    stats.recentLogs.map((log) => (
                        <div key={log.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${log.user}&background=random`} />
                                <AvatarFallback>{log.user?.substring(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    <span className="font-bold text-slate-800">{log.user || "System"}</span> 
                                    <span className="font-normal text-slate-500"> {log.action.toLowerCase()}d </span>
                                    <span className="font-semibold text-primary">{log.entity}</span>
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                    {log.details}
                                </p>
                                <p className="text-[10px] text-slate-400">
                                    {new Date(log.timestamp).toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
          </CardContent>
        </Card>

        {/* --- QUICK LINKS --- */}
        <Card className="col-span-3 shadow-sm bg-slate-50/50">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Navigate to frequently used modules.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
             <Link href="/inventory/products">
                <Button variant="outline" className="w-full justify-start h-12 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
                    <Boxes className="mr-2 h-4 w-4" />
                    Product List
                </Button>
             </Link>
             <Link href="/inventory/pl-master">
                <Button variant="outline" className="w-full justify-start h-12 bg-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Packing List Master
                </Button>
             </Link>
             <Link href="/asset-management/assets">
                <Button variant="outline" className="w-full justify-start h-12 bg-white hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all">
                    <Monitor className="mr-2 h-4 w-4" />
                    Asset List
                </Button>
             </Link>
             <Link href="/asset-management/transactions">
                <Button variant="outline" className="w-full justify-start h-12 bg-white hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all">
                    <Activity className="mr-2 h-4 w-4" />
                    Asset Transactions
                </Button>
             </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
