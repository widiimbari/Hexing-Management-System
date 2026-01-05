import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Warehouse } from "lucide-react";

export default function WarehousePage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-2">
        <Warehouse className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-slate-900">Warehouse Management</h1>
      </div>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <Warehouse className="h-12 w-12 mb-4 opacity-20" />
          <p className="text-lg font-medium">Module Warehouse sedang dalam pengembangan.</p>
          <p className="text-sm">Halaman ini akan digunakan untuk manajemen gudang dan stok fisik.</p>
        </CardContent>
      </Card>
    </div>
  );
}
