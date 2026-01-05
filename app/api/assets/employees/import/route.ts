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

    // Pre-fetch departments for mapping
    const departments = await dbAsset.departments.findMany();
    const departmentMap = new Map(departments.map(d => [d.name.toLowerCase(), d.id]));

    // Skip header row
    const rows = worksheet.getRows(2, worksheet.rowCount) || [];

    for (const row of rows) {
      if (!row.hasValues) continue;

      const nik = row.getCell(1).text?.toString().trim();
      const nama = row.getCell(2).text?.toString().trim();
      
      if (!nik || !nama) continue; // Skip rows with required fields empty

      const genderRaw = row.getCell(3).text?.toString().trim().toUpperCase();
      let gender = undefined;
      if (genderRaw === 'L' || genderRaw === 'P') {
        gender = genderRaw;
      }

      const departmentName = row.getCell(4).text?.toString().trim();
      let department_id = undefined;
      
      if (departmentName && departmentMap.has(departmentName.toLowerCase())) {
        department_id = departmentMap.get(departmentName.toLowerCase());
      }

      if (!gender) {
         errors.push(`Row ${row.number} (${nama}): Invalid Gender (Must be L or P)`);
         continue;
      }

      try {
        // Check duplicate NIK
        const existing = await dbAsset.employees.findFirst({ where: { nik } });
        if (existing) {
             errors.push(`Row ${row.number} (${nama}): NIK ${nik} already exists`);
             continue;
        }

        await dbAsset.employees.create({
          data: {
            nik,
            nama,
            gender,
            department_id,
            created_at: new Date(),
            updated_at: new Date(),
          }
        });
        createdCount++;
      } catch (e: any) {
        errors.push(`Row ${row.number} (${nama}): ${e.message}`);
      }
    }

    return NextResponse.json({
      message: `Imported ${createdCount} employees. ${errors.length} errors.`,
      errors,
      createdCount
    });

  } catch (error) {
    console.error("Error importing employees:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}