import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";
import ExcelJS from "exceljs";

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

    let createdCount = 0;
    let errors: string[] = [];

    // Skip header row
    const rows = worksheet.getRows(2, worksheet.rowCount) || [];

    for (const row of rows) {
      if (!row.hasValues) continue;

      const name = row.getCell(1).text?.toString().trim();
      
      if (!name) continue; // Skip rows with required field empty

      const contact_person = row.getCell(2).text?.toString().trim() || undefined;
      const phone = row.getCell(3).text?.toString().trim() || undefined;
      const email = row.getCell(4).text?.toString().trim() || undefined;
      const address = row.getCell(5).text?.toString().trim() || undefined;

      try {
        await dbAsset.suppliers.create({
          data: {
            name,
            contact_person,
            phone,
            email,
            address,
            created_at: new Date(),
            updated_at: new Date(),
          }
        });
        createdCount++;
      } catch (e: any) {
        errors.push(`Row ${row.number} (${name}): ${e.message}`);
      }
    }

    return NextResponse.json({
      message: `Imported ${createdCount} suppliers. ${errors.length} errors.`,
      errors,
      createdCount
    });

  } catch (error) {
    console.error("Error importing suppliers:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}