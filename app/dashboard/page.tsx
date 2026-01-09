import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Boxes, Users, Activity, ClipboardList, Monitor, TrendingUp, Factory, Package, ArrowUpRight, BarChart3, ScrollText } from "lucide-react";
import Link from "next/link";
import { db, dbAsset } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getStats() {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [
      assetCount,
      employeeCount,
      assetsByCondition,
      outputTempData
    ] = await Promise.all([
      dbAsset.assets.count(),
      dbAsset.employees.count(),
      dbAsset.assets.groupBy({
        by: ['condition'],
        _count: { condition: true }
      }),
      db.output_temp.findMany({
        where: { timestamp: { gte: startOfDay } },
        orderBy: [{ line: 'asc' }]
      })
    ]);

    const dailyOutput = outputTempData.reduce((sum, item) => sum + item.total_output, 0);
    const totalTarget = outputTempData.reduce((sum, item) => sum + item.target, 0);
    const totalBigbox = outputTempData.reduce((sum, item) => sum + item.total_bigbox, 0);
    const totalPallet = outputTempData.reduce((sum, item) => sum + item.total_pallet, 0);

    const typeMap = new Map<string, number>();
    outputTempData.forEach(item => {
      if (item.type) {
        typeMap.set(item.type, (typeMap.get(item.type) || 0) + item.total_output);
      }
    });
    const outputByType = Array.from(typeMap.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    const activeLinesArray = [...new Set(outputTempData.map(item => item.line))].sort();

    const productionStats = outputTempData.map(item => ({
      line: item.line,
      type: item.type || '-',
      output: item.total_output,
      target: item.target,
      targetHour: item.target_hour,
      bigbox: item.total_bigbox,
      pallet: item.total_pallet,
      achievement: item.target > 0 ? Math.round((item.total_output / item.target) * 100) : 0,
    }));

    return {
      assetCount,
      employeeCount,
      assetsByCondition,
      dailyOutput,
      totalTarget,
      totalBigbox,
      totalPallet,
      outputByType,
      activeLines: activeLinesArray,
      productionStats,
      achievement: totalTarget > 0 ? Math.round((dailyOutput / totalTarget) * 100) : 0
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return {
      assetCount: 0,
      employeeCount: 0,
      assetsByCondition: [],
      dailyOutput: 0,
      totalTarget: 0,
      totalBigbox: 0,
      totalPallet: 0,
      outputByType: [],
      activeLines: [],
      productionStats: [],
      achievement: 0
    };
  }
}

export const revalidate = 60;

export default async function DashboardPage() {
  const stats = await getStats();

  const getAchievementColor = (achievement: number) => {
    if (achievement >= 100) return { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-100' };
    if (achievement >= 80) return { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-100' };
    return { bg: 'bg-rose-500', text: 'text-rose-600', light: 'bg-rose-100' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-0.5">Production & Asset Overview</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Data
          </div>
        </div>

        {/* Production Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Main Production Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                    <Factory className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-800">Daily Production</h2>
                    <p className="text-xs text-slate-500">Today's output summary</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-slate-800">{stats.dailyOutput.toLocaleString()}</span>
                    <span className="text-slate-400 text-sm">/ {stats.totalTarget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <TrendingUp className={`w-3.5 h-3.5 ${getAchievementColor(stats.achievement).text}`} />
                    <span className={`text-sm font-semibold ${getAchievementColor(stats.achievement).text}`}>
                      {stats.achievement}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getAchievementColor(stats.achievement).bg}`}
                    style={{ width: `${Math.min(stats.achievement, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-4 divide-x divide-slate-100">
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-slate-800">{stats.activeLines.length}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Active Lines</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-slate-800">{stats.outputByType.length}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Product Types</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-slate-800">{stats.totalBigbox.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Big Box</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-slate-800">{stats.totalPallet.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Pallet</p>
              </div>
            </div>
          </div>

          {/* Side Stats */}
          <div className="space-y-4">
            {/* Assets Card */}
            <Link href="/asset-management/assets" className="block">
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:shadow-md hover:border-slate-300/60 transition-all group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Assets</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{stats.assetCount.toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <Monitor className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-violet-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </Link>

            {/* Employees Card */}
            <Link href="/asset-management/employees" className="block">
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:shadow-md hover:border-slate-300/60 transition-all group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Employees</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{stats.employeeCount.toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-blue-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Production Table & Quick Access */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Production by Line */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Production by Line</h3>
                  <p className="text-xs text-slate-500">{stats.productionStats.length} lines active</p>
                </div>
              </div>
            </div>
            <div className="max-h-[320px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="text-slate-600 font-medium text-xs">LINE</TableHead>
                    <TableHead className="text-slate-600 font-medium text-xs">TYPE</TableHead>
                    <TableHead className="text-slate-600 font-medium text-xs w-[140px]">PROGRESS</TableHead>
                    <TableHead className="text-slate-600 font-medium text-xs text-right">OUTPUT</TableHead>
                    <TableHead className="text-slate-600 font-medium text-xs text-right">TARGET</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.productionStats.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-slate-400 py-12">
                        No production data for today
                      </TableCell>
                    </TableRow>
                  ) : (
                    stats.productionStats.map((item, idx) => {
                      const color = getAchievementColor(item.achievement);
                      return (
                        <TableRow key={idx} className="hover:bg-slate-50/50">
                          <TableCell className="font-medium text-slate-800">{item.line}</TableCell>
                          <TableCell className="text-slate-600 text-sm">{item.type}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${color.bg}`}
                                  style={{ width: `${Math.min(item.achievement, 100)}%` }}
                                />
                              </div>
                              <span className={`text-xs font-medium ${color.text} w-10 text-right`}>
                                {item.achievement}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-semibold text-slate-800">
                            {item.output.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-slate-500">
                            {item.target.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">

            {/* Asset Conditions */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-600" />
                  <h3 className="font-semibold text-slate-800 text-sm">Asset Conditions</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {stats.assetsByCondition.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">No data available</p>
                ) : (
                  stats.assetsByCondition.map((item) => (
                    <div key={item.condition} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          item.condition === 'GOOD' ? 'bg-emerald-500' :
                          item.condition === 'SLIGHTLY_DAMAGED' ? 'bg-amber-500' :
                          ['DAMAGED', 'BROKEN', 'DISPOSED'].includes(item.condition) ? 'bg-rose-500' : 'bg-slate-400'
                        }`} />
                        <span className="text-sm text-slate-600">{item.condition ? item.condition.replace(/_/g, ' ') : 'Unknown'}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{item._count.condition}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 text-sm">Quick Access</h3>
              </div>
              <div className="p-3 space-y-1.5">
                <Link href="/inventory/products">
                  <Button variant="ghost" className="w-full justify-start h-10 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl">
                    <Boxes className="mr-3 h-4 w-4 text-teal-600" />
                    <span className="text-sm">Products</span>
                  </Button>
                </Link>
                <Link href="/inventory/pl-master">
                  <Button variant="ghost" className="w-full justify-start h-10 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl">
                    <ClipboardList className="mr-3 h-4 w-4 text-violet-600" />
                    <span className="text-sm">Packing List</span>
                  </Button>
                </Link>
                <Link href="/asset-management/assets">
                  <Button variant="ghost" className="w-full justify-start h-10 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl">
                    <Monitor className="mr-3 h-4 w-4 text-blue-600" />
                    <span className="text-sm">Assets</span>
                  </Button>
                </Link>
                <Link href="/asset-management/transactions">
                  <Button variant="ghost" className="w-full justify-start h-10 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl">
                    <Activity className="mr-3 h-4 w-4 text-amber-600" />
                    <span className="text-sm">Transactions</span>
                  </Button>
                </Link>
                <Link href="/system-logs">
                  <Button variant="ghost" className="w-full justify-start h-10 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl">
                    <ScrollText className="mr-3 h-4 w-4 text-slate-600" />
                    <span className="text-sm">System Logs</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Top Products */}
            {stats.outputByType.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-600" />
                    <h3 className="font-semibold text-slate-800 text-sm">Top Products</h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {stats.outputByType.slice(0, 4).map((item, idx) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-slate-600 truncate max-w-[120px]">{item.type}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{item.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
