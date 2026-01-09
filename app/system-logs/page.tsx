"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Activity,
  Monitor,
  Package,
  Users,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload,
  LogIn,
  LogOut,
  ArrowRightLeft,
  Calendar as CalendarIcon,
  X,
  FileSpreadsheet
} from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { id } from "date-fns/locale";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface SystemLog {
  id: string;
  module: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  description: string | null;
  old_values: any;
  new_values: any;
  user_id: string | null;
  user_name: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const IGNORED_KEYS = ['id', 'created_at', 'updated_at', 'deleted_at', 'password', 'user_id'];

const formatKey = (key: string) => {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

interface ValueDisplayProps {
  values: any;
  title: string;
  compareValues?: any;
  lookups?: { departments: Record<string, string> };
}

const ValueDisplay = ({ values, title, compareValues, lookups }: ValueDisplayProps) => {
  if (!values || Object.keys(values).length === 0) return null;
  
  const filteredKeys = Object.keys(values).filter(key => !IGNORED_KEYS.includes(key));
  
  if (filteredKeys.length === 0) return null;

  return (
    <div className="mt-2">
      <label className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 block">{title}</label>
      <div className="bg-slate-50 rounded-md border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
           <tbody>
             {filteredKeys.map((key) => {
               const value = values[key];
               const isChanged = compareValues && String(compareValues[key]) !== String(value);
               const highlightClass = isChanged ? "bg-yellow-100" : "";
               
               let displayValue = value === null ? <span className="text-slate-400 italic">null</span> : String(value);
               
               // Resolve Gender
               if (key === 'gender') {
                 displayValue = value === "L" ? "Male" : value === "P" ? "Female" : String(value);
               }
               
               // Resolve Department Name
               if (key === 'department_id' && lookups?.departments && value) {
                 const deptName = lookups.departments[String(value)];
                 if (deptName) {
                   displayValue = (
                     <span>
                       {deptName} <span className="text-xs text-slate-400">({value})</span>
                     </span>
                   );
                 }
               }

               return (
                 <tr key={key} className={`border-b border-slate-100 last:border-0 ${highlightClass}`}>
                   <td className="px-3 py-2 text-slate-600 bg-slate-100/50 w-[40%] font-medium">
                     {formatKey(key)}
                   </td>
                   <td className="px-3 py-2 text-slate-800">
                     {displayValue}
                   </td>
                 </tr>
               );
             })}
           </tbody>
        </table>
      </div>
    </div>
  );
};

const moduleIcons: Record<string, React.ReactNode> = {
  ASSET: <Monitor className="w-4 h-4" />,
  INVENTORY: <Package className="w-4 h-4" />,
  USER: <Users className="w-4 h-4" />,
  SYSTEM: <Settings className="w-4 h-4" />,
  WAREHOUSE: <Package className="w-4 h-4" />,
};

const moduleColors: Record<string, string> = {
  ASSET: "bg-violet-100 text-violet-700",
  INVENTORY: "bg-teal-100 text-teal-700",
  USER: "bg-blue-100 text-blue-700",
  SYSTEM: "bg-slate-100 text-slate-700",
  WAREHOUSE: "bg-amber-100 text-amber-700",
};

const actionIcons: Record<string, React.ReactNode> = {
  CREATE: <Plus className="w-3.5 h-3.5" />,
  UPDATE: <Pencil className="w-3.5 h-3.5" />,
  DELETE: <Trash2 className="w-3.5 h-3.5" />,
  EXPORT: <Download className="w-3.5 h-3.5" />,
  IMPORT: <Upload className="w-3.5 h-3.5" />,
  LOGIN: <LogIn className="w-3.5 h-3.5" />,
  LOGOUT: <LogOut className="w-3.5 h-3.5" />,
  ASSIGN: <ArrowRightLeft className="w-3.5 h-3.5" />,
  TRANSFER: <ArrowRightLeft className="w-3.5 h-3.5" />,
};

const actionColors: Record<string, string> = {
  CREATE: "bg-emerald-100 text-emerald-700",
  UPDATE: "bg-blue-100 text-blue-700",
  DELETE: "bg-rose-100 text-rose-700",
  EXPORT: "bg-purple-100 text-purple-700",
  IMPORT: "bg-cyan-100 text-cyan-700",
  LOGIN: "bg-green-100 text-green-700",
  LOGOUT: "bg-slate-100 text-slate-700",
  ASSIGN: "bg-amber-100 text-amber-700",
  TRANSFER: "bg-orange-100 text-orange-700",
};

export default function SystemLogsPage() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 30,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);
  const [departments, setDepartments] = useState<Record<string, string>>({});

  // Filters
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState<string>("");
  const [actionFilter, setActionFilter] = useState<string>("");
  
  // New Date Filters
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [period, setPeriod] = useState<string>("all");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    // Fetch departments for lookup
    const fetchDepartments = async () => {
      try {
        const res = await fetch('/api/assets/departments?limit=1000');
        const data = await res.json();
        if (data.data) {
          const map: Record<string, string> = {};
          data.data.forEach((d: any) => {
            map[d.id] = d.name;
          });
          setDepartments(map);
        }
      } catch (e) {
        console.error("Failed to fetch departments", e);
      }
    };
    fetchDepartments();
  }, []);

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    const today = new Date();
    switch (value) {
      case "daily":
        setDateRange({ from: today, to: today });
        break;
      case "weekly":
        setDateRange({ from: subDays(today, 7), to: today });
        break;
      case "monthly":
        setDateRange({ from: subDays(today, 30), to: today });
        break;
      case "yearly":
        setDateRange({ from: subDays(today, 365), to: today });
        break;
      case "all":
        setDateRange(undefined);
        break;
      case "custom": 
        break;
    }
  };

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", pagination.page.toString());
      params.set("limit", pagination.limit.toString());

      if (search) params.set("search", search);
      if (moduleFilter && moduleFilter !== 'all') params.set("module", moduleFilter);
      if (actionFilter && actionFilter !== 'all') params.set("action", actionFilter);
      
      if (dateRange?.from) {
        params.set("start_date", startOfDay(dateRange.from).toISOString());
      }
      if (dateRange?.to) {
        params.set("end_date", endOfDay(dateRange.to).toISOString());
      }

      const response = await fetch(`/api/system-logs?${params}`);
      const data = await response.json();

      if (data.logs) {
        setLogs(data.logs);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, moduleFilter, actionFilter, dateRange]);

  // Initial Fetch & Search Trigger
  // Use simple effect to fetch when filters change (debouncing search could be added if needed)
  useEffect(() => {
    // Reset page to 1 when filters change (except pagination itself)
    // Actually simpler to just call fetchLogs inside the handlers or use a separate effect for filter changes resetting page
    fetchLogs();
  }, [fetchLogs]);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchLogs();
  };

  const handleReset = () => {
    setSearch("");
    setModuleFilter("");
    setActionFilter("");
    setPeriod("all");
    setDateRange(undefined);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (moduleFilter && moduleFilter !== 'all') params.set("module", moduleFilter);
      if (actionFilter && actionFilter !== 'all') params.set("action", actionFilter);
      if (dateRange?.from) params.set("start_date", startOfDay(dateRange.from).toISOString());
      if (dateRange?.to) params.set("end_date", endOfDay(dateRange.to).toISOString());
      
      params.set("limit", "5000");

      const response = await fetch(`/api/system-logs?${params}`);
      const data = await response.json();

      if (data.logs && data.logs.length > 0) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('System Logs');

        worksheet.columns = [
          { header: 'Timestamp', key: 'timestamp', width: 20 },
          { header: 'Module', key: 'module', width: 15 },
          { header: 'Action', key: 'action', width: 15 },
          { header: 'Entity Type', key: 'entity_type', width: 15 },
          { header: 'Description', key: 'description', width: 50 },
          { header: 'User', key: 'user', width: 20 },
          { header: 'IP Address', key: 'ip', width: 15 },
        ];

        data.logs.forEach((log: SystemLog) => {
          worksheet.addRow({
            timestamp: format(new Date(log.created_at), "dd/MM/yyyy HH:mm:ss"),
            module: log.module,
            action: log.action,
            entity_type: log.entity_type,
            description: log.description,
            user: log.user_name || "System",
            ip: log.ip_address || "-"
          });
        });

        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE0E0E0' }
        };

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `SystemLogs_${format(new Date(), "yyyyMMdd_HHmmss")}.xlsx`);
      } else {
        alert("No logs found to export.");
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export logs.");
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto py-10 space-y-6 max-w-[1600px]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" /> System Logs
            </h1>
            <p className="text-muted-foreground mt-1">
              Audit trail and activity logs across the system.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col xl:flex-row gap-4 items-end xl:items-center">
            <div className="flex flex-1 w-full gap-2 items-center flex-wrap">
                
                {/* Search */}
                <div className="relative min-w-[240px] flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search logs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-slate-50 border-slate-200"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>

                {/* Module Filter */}
                <div className="w-[140px]">
                    <Select value={moduleFilter || "all"} onValueChange={(v) => setModuleFilter(v === "all" ? "" : v)}>
                        <SelectTrigger className="bg-slate-50 border-slate-200">
                        <SelectValue placeholder="All Modules" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All Modules</SelectItem>
                        <SelectItem value="ASSET">Asset</SelectItem>
                        <SelectItem value="INVENTORY">Inventory</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="WAREHOUSE">Warehouse</SelectItem>
                        <SelectItem value="SYSTEM">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Action Filter */}
                <div className="w-[140px]">
                    <Select value={actionFilter || "all"} onValueChange={(v) => setActionFilter(v === "all" ? "" : v)}>
                        <SelectTrigger className="bg-slate-50 border-slate-200">
                        <SelectValue placeholder="All Actions" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All Actions</SelectItem>
                        <SelectItem value="CREATE">Create</SelectItem>
                        <SelectItem value="UPDATE">Update</SelectItem>
                        <SelectItem value="DELETE">Delete</SelectItem>
                        <SelectItem value="EXPORT">Export</SelectItem>
                        <SelectItem value="IMPORT">Import</SelectItem>
                        <SelectItem value="LOGIN">Login</SelectItem>
                        <SelectItem value="LOGOUT">Logout</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Period Selector */}
                <div className="w-[120px]">
                    <Select value={period} onValueChange={handlePeriodChange}>
                        <SelectTrigger className="bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Date Range */}
                <div className="w-[240px]">
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal bg-slate-50 border-slate-200",
                            !dateRange && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                            dateRange.to ? (
                                <>
                                {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                                </>
                            ) : (
                                format(dateRange.from, "dd/MM/yyyy")
                            )
                            ) : (
                            <span>Pick Date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={(range) => {
                                setDateRange(range);
                                if (period !== 'all' && period !== 'custom') setPeriod('custom');
                            }}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-4 xl:mt-0">
                <Button onClick={handleSearch} disabled={loading} className="bg-slate-900 text-white hover:bg-slate-800">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                </Button>

                <Button variant="outline" onClick={handleExport} disabled={exportLoading} title="Export Excel">
                    <FileSpreadsheet className={`h-4 w-4 mr-2 ${exportLoading ? "animate-bounce" : ""}`} />
                    Export
                </Button>

                {(search || moduleFilter || actionFilter || dateRange || period !== 'all') && (
                    <Button variant="ghost" size="icon" onClick={handleReset} title="Clear Filters" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>

        {/* Table */}
        <Card className="shadow-md border-none">
          <CardHeader className="border-b border-slate-100 py-4 hidden">
             {/* Hidden header since we have main header */}
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                    <TableHead className="w-[180px] font-semibold text-slate-700">Timestamp</TableHead>
                    <TableHead className="w-[120px] font-semibold text-slate-700">Module</TableHead>
                    <TableHead className="w-[120px] font-semibold text-slate-700">Action</TableHead>
                    <TableHead className="w-[140px] font-semibold text-slate-700">Entity</TableHead>
                    <TableHead className="font-semibold text-slate-700">Description</TableHead>
                    <TableHead className="w-[140px] font-semibold text-slate-700">User</TableHead>
                    <TableHead className="w-[80px] text-center font-semibold text-slate-700">Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                         <div className="flex justify-center items-center gap-2">
                             <RefreshCw className="animate-spin h-5 w-5" />
                             Loading logs...
                         </div>
                      </TableCell>
                    </TableRow>
                  ) : logs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                        No logs found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="text-sm text-slate-600 font-medium">
                          {format(new Date(log.created_at), "dd MMM yyyy HH:mm", { locale: id })}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${moduleColors[log.module] || "bg-slate-100 text-slate-700"}`}>
                            {moduleIcons[log.module]}
                            {log.module}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${actionColors[log.action] || "bg-slate-100 text-slate-700"}`}>
                            {actionIcons[log.action]}
                            {log.action}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <span className="font-medium text-slate-800">{log.entity_type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[400px]">
                          <p className="text-sm text-slate-600 truncate" title={log.description || ""}>
                            {log.description || "-"}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm text-slate-700 font-medium">
                          {log.user_name || "System"}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedLog(log)}
                            className="h-8 w-8 p-0 text-slate-500 hover:text-primary"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  Page <span className="font-medium text-slate-900">{pagination.page}</span> of <span className="font-medium text-slate-900">{pagination.totalPages}</span>
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                    disabled={pagination.page <= 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-slate-500" />
                Log Details
            </DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-6 pt-2">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 block">Timestamp</label>
                  <p className="font-medium text-slate-900 text-sm">
                    {format(new Date(selectedLog.created_at), "dd MMMM yyyy HH:mm:ss", { locale: id })}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 block">User</label>
                  <p className="font-medium text-slate-900 text-sm">{selectedLog.user_name || "System"}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 block">Module</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${moduleColors[selectedLog.module]}`}>
                      {moduleIcons[selectedLog.module]}
                      {selectedLog.module}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 block">Action</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${actionColors[selectedLog.action]}`}>
                      {actionIcons[selectedLog.action]}
                      {selectedLog.action}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 block">Entity Type</label>
                  <p className="font-medium text-slate-900 text-sm">{selectedLog.entity_type}</p>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 block">Description</label>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed">
                    {selectedLog.description || "-"}
                </div>
              </div>

              {selectedLog.old_values && (
                <ValueDisplay 
                  values={selectedLog.old_values} 
                  title="Previous Values" 
                  compareValues={selectedLog.new_values}
                  lookups={{ departments }}
                />
              )}

              {selectedLog.new_values && (
                <ValueDisplay 
                  values={selectedLog.new_values} 
                  title="New Values" 
                  compareValues={selectedLog.old_values}
                  lookups={{ departments }}
                />
              )}

              <div className="border-t border-slate-100 pt-6 mt-6 grid grid-cols-2 gap-4">
                {selectedLog.ip_address && (
                  <div>
                     <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">IP Address</label>
                     <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded inline-block">{selectedLog.ip_address}</span>
                  </div>
                )}
                {selectedLog.user_agent && (
                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">User Agent</label>
                    <p className="text-[10px] text-slate-500 break-all bg-slate-50 p-2 rounded border border-slate-100 font-mono">{selectedLog.user_agent}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}