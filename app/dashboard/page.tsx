import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Boxes, Package, Users, Activity } from "lucide-react";
import Link from "next/link";
import { dbManagement } from "@/lib/db";

export default async function DashboardPage() {
  // Fetch high-level stats (e.g., total users, system status)
  // We can also fetch some inventory summaries if we want to show them here.
  
  // Example: Count users
  const userCount = await dbManagement.users.count();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to Hexing Management System.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/inventory/dashboard">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory System</CardTitle>
              <Boxes className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Inventory</div>
              <p className="text-xs text-muted-foreground">
                Manage products, PL, and history
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="#">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full opacity-70">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Asset Management</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">Assets</div>
                <p className="text-xs text-muted-foreground">
                    Coming Soon
                </p>
                </CardContent>
            </Card>
        </Link>
        
        <Link href="/admin/users">
             <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Management</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{userCount} Users</div>
                <p className="text-xs text-muted-foreground">
                    Manage system access
                </p>
                </CardContent>
            </Card>
        </Link>
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}