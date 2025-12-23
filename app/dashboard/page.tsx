"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Package, Warehouse, Boxes, Activity, ArrowUpRight, Clock, TrendingUp } from "lucide-react";

interface Log {
  id: number;
  desc: string;
  timestamp: string;
  line: string;
}

interface DashboardStats {
  productCount: number;
  boxCount: number;
  palletCount: number;
  dailyOutput: number;
  weeklyOutput: number;
  monthlyOutput: number;
  topTypes: { type: string; count: number }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    productCount: 0,
    boxCount: 0,
    palletCount: 0,
    dailyOutput: 0,
    weeklyOutput: 0,
    monthlyOutput: 0,
    topTypes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const inventoryItems = [
    {
      title: "Total Produk",
      value: loading ? "..." : stats.productCount.toLocaleString("id-ID"),
      icon: Package,
      description: "Item in inventory",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Boks",
      value: loading ? "..." : stats.boxCount.toLocaleString("id-ID"),
      icon: Warehouse,
      description: "Registered boxes",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Total Palet",
      value: loading ? "..." : stats.palletCount.toLocaleString("id-ID"),
      icon: Boxes,
      description: "Ready pallets",
      color: "text-violet-600",
      bgColor: "bg-violet-50",
    },
  ];

  const outputItems = [
    {
      title: "Output Harian",
      value: loading ? "..." : stats.dailyOutput.toLocaleString("id-ID"),
      icon: Activity,
      description: "Today's production",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Output Mingguan",
      value: loading ? "..." : stats.weeklyOutput.toLocaleString("id-ID"),
      icon: Activity,
      description: "This week",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Output Bulanan",
      value: loading ? "..." : stats.monthlyOutput.toLocaleString("id-ID"),
      icon: Activity,
      description: "This month",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50/50 min-h-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
          <p className="text-slate-500 mt-1">
            Overview of inventory status and production metrics.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid - Inventory */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            Inventory Status
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inventoryItems.map(({ title, value, icon: Icon, description, color, bgColor }) => (
            <Card key={title} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    {title}
                </CardTitle>
                <div className={`p-2 rounded-md ${bgColor}`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                </div>
                </CardHeader>
                <CardContent>
                <div className="text-3xl font-bold text-slate-900">{value}</div>
                <p className="text-xs text-slate-400 mt-1">
                    {description}
                </p>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Output Performance */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                Production Performance
            </h3>
            <div className="grid gap-4">
                {outputItems.map(({ title, value, icon: Icon, description, color, bgColor }) => (
                <Card key={title} className="border-slate-100 shadow-sm flex items-center p-4">
                    <div className={`p-3 rounded-full ${bgColor} mr-4`}>
                        <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">{title}</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-900">{value}</span>
                            <span className="text-xs text-slate-400">/ {description}</span>
                        </div>
                    </div>
                </Card>
                ))}
            </div>
        </div>

        {/* Top 10 Output */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                Top Output by Type
            </h3>
            <Card className="border-slate-100 shadow-sm h-full">
            <CardHeader>
                <CardDescription>
                Highest production volume by meter type.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {stats.topTypes.map((item, index) => (
                    <div key={item.type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${index < 3 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {index + 1}
                            </span>
                            <span className="font-medium text-sm text-slate-700">{item.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-100 rounded-full h-2 hidden sm:block">
                                <div 
                                    className="bg-slate-900 h-2 rounded-full" 
                                    style={{ width: `${Math.min(100, (item.count / (stats.topTypes[0]?.count || 1)) * 100)}%` }}
                                ></div>
                            </div>
                            <span className="font-bold text-sm text-slate-900 min-w-[60px] text-right">
                                {item.count.toLocaleString("id-ID")}
                            </span>
                        </div>
                    </div>
                ))}
                {!loading && stats.topTypes.length === 0 && (
                    <p className="text-center text-slate-400 py-8 text-sm">Data output belum tersedia.</p>
                )}
                </div>
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}