import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.QC_DB_HOST || "192.168.88.254",
      port: parseInt(process.env.QC_DB_PORT || "3307"),
      user: process.env.QC_DB_USER || "root", 
      password: process.env.QC_DB_PASSWORD || "", 
      database: process.env.QC_DB_NAME || "qc_inspect",
    });

    // Query to find serials marked as 'jimatek'
    // Modified logic:
    // 1. 'input' table contains 'keterangan' LIKE '%jimatek%'.
    // 2. 'input' table entries are BigBox serials.
    // 3. Actual meter serials are in 'input_uji' table linked by 'id_input'.
    const [rows] = await connection.execute(
      `SELECT b.serial 
       FROM input a 
       JOIN input_uji b ON a.id = b.id_input 
       WHERE a.keterangan LIKE '%jimatek%'`
    );

    // Close connection
    await connection.end();

    const serials = (rows as any[]).map((row) => String(row.serial).trim());

    return NextResponse.json(serials);
  } catch (error: any) {
    console.error("[QC_JIMATEK_FETCH]", error);
    if (connection) await connection.end();
    return new NextResponse(`External DB Error: ${error.message}`, { status: 500 });
  }
}
