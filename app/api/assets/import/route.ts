import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import ExcelJS from "exceljs";
import { AssetLog } from "@/lib/system-logger";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      return NextResponse.json({ message: "Invalid Excel file" }, { status: 400 });
    }

    // Cache simple relations
    const [types, categories, brands, areas, suppliers] = await Promise.all([
      dbAsset.asset_types.findMany(),
      dbAsset.categories.findMany(),
      dbAsset.brands.findMany(),
      dbAsset.areas.findMany(),
      dbAsset.suppliers.findMany(),
    ]);

    const typeMap = new Map(types.map(t => [t.name.toLowerCase(), t.id]));
    const categoryMap = new Map(categories.map(c => [c.name.toLowerCase(), c.id]));
    const brandMap = new Map(brands.map(b => [b.name.toLowerCase(), b.id]));
    const areaMap = new Map(areas.map(a => [a.name.toLowerCase(), a.id]));
    const supplierMap = new Map(suppliers.map(s => [s.name.toLowerCase(), s.id]));

    let createdCount = 0;
    let errors: string[] = [];

    // Skip header row
    const rows = worksheet.getRows(2, worksheet.rowCount) || [];

    for (const row of rows) {
      if (!row.hasValues) continue;

      const serial_number = row.getCell(1).text?.toString().trim();
      if (!serial_number) continue; // Skip empty serials

      const sap_id = row.getCell(2).text?.toString().trim();
      const typeName = row.getCell(3).text?.toString().trim();
      const categoryName = row.getCell(4).text?.toString().trim();
      const brandName = row.getCell(5).text?.toString().trim();
      const areaName = row.getCell(6).text?.toString().trim();
      const locationName = row.getCell(7).text?.toString().trim();
      const employeeNik = row.getCell(8).text?.toString().trim().split(' - ')[0]; // Handle "NIK - Name" format
      const supplierName = row.getCell(9).text?.toString().trim();
      const purchaseDateStr = row.getCell(10).text?.toString().trim();

      // Resolve IDs
      const type_id = typeName ? typeMap.get(typeName.toLowerCase()) : undefined;
      const category_id = categoryName ? categoryMap.get(categoryName.toLowerCase()) : undefined;
      const brand_id = brandName ? brandMap.get(brandName.toLowerCase()) : undefined;
      const area_id = areaName ? areaMap.get(areaName.toLowerCase()) : undefined;
      const supplier_id = supplierName ? supplierMap.get(supplierName.toLowerCase()) : undefined;

      // Resolve Location (needs db lookup as it depends on area potentially, or just name)
      let location_id = undefined;
      if (locationName) {
        const loc = await dbAsset.locations.findFirst({
          where: { 
            name: locationName,
            ...(area_id ? { area_id: area_id } : {}) 
          }
        });
        if (loc) location_id = loc.id;
      }

      // Resolve Employee
      let employee_id = undefined;
      if (employeeNik) {
        const emp = await dbAsset.employees.findFirst({ where: { nik: employeeNik } });
        if (emp) employee_id = emp.id;
      }

      try {
        await dbAsset.assets.create({
          data: {
            serial_number,
            sap_id,
            type_id,
            category_id,
            brand_id,
            area_id,
            location_id,
            employee_id,
            supplier_id,
            purchase_date: purchaseDateStr ? new Date(purchaseDateStr) : null,
            created_at: new Date(),
            updated_at: new Date(),
          }
        });
        createdCount++;
      } catch (e: any) {
        errors.push(`Row ${row.number} (${serial_number}): ${e.message}`);
      }
    }

    // Log import activity
    try {
      await AssetLog.import(
        `Imported ${createdCount} assets from file. ${errors.length} errors.`,
        { createdCount, errorCount: errors.length }
      );
    } catch (logError) {
      console.error("[Asset Import] Failed to log import:", logError);
    }

    return NextResponse.json({
      message: `Imported ${createdCount} assets. ${errors.length} errors.`,
      errors,
      createdCount
    });

  } catch (error) {
    console.error("Error importing assets:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
