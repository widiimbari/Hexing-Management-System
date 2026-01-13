import { db } from "@/lib/db";

// Force dynamic rendering - skip prerender during build
export const dynamic = 'force-dynamic';

export default async function StokPage() {
  // PENTING: Ganti 'nama_model_di_schema' dengan nama model tabel kamu.
  // Lihat baris paling atas di file schema.prisma, misal: model production_log { ... }
  // Maka ganti jadi: db.production_log.findMany(...)
  
  const data = await db.product.findMany({
    take: 1000, // Kita ambil 20 data terbaru
    orderBy: {
      timestamp: 'desc', // Urutkan dari yang paling baru
    },
  });

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Inventory / Produksi</h1>
        <div className="text-gray-500 text-sm">
          Menampilkan 20 data terbaru
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3 border">Serial Number</th>
              <th className="px-6 py-3 border">Type</th>
              <th className="px-6 py-3 border">Order No</th>
              <th className="px-6 py-3 border">Line</th>
              <th className="px-6 py-3 border">Box ID</th>
              <th className="px-6 py-3 border">Waktu Input</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 hover:text-black">
                
                {/* Kolom Serial */}
                <td className="px-6 py-4 font-medium text-gray-900 border">
                  {item.serial}
                </td>

                {/* Kolom Type */}
                <td className="px-6 py-4 border">
                  {item.type}
                </td>

                {/* Kolom Order No */}
                <td className="px-6 py-4 border">
                  {item.orderno}
                </td>
                
                {/* Kolom Line Produksi */}
                <td className="px-6 py-4 border">
                  {item.line}
                </td>

                {/* Kolom Box ID (Kalau kosong tampilin strip -) */}
                <td className="px-6 py-4 border font-bold text-blue-600">
                  {item.box_id ? `BOX-${item.box_id}` : '-'}
                </td>

                {/* Kolom Tanggal (Diformat biar enak dibaca orang Indonesia) */}
                <td className="px-6 py-4 border">
                  {new Date(item.timestamp).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}