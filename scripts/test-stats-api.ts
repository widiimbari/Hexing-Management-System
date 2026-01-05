
import { db } from "../lib/db";
import { Prisma } from "../generated/inventory-client";

async function main() {
  const startDate = "2025-01-04T17:00:00.000Z";
  const endDate = "2026-01-05T16:59:59.999Z";
  const type = "all"; // Simulating 'all' or specific type

  console.log("Testing with:", { startDate, endDate, type });

  const start = new Date(startDate);
  const end = new Date(endDate);
  const filterType = type && type !== 'all' ? type : 'all';

  try {
    const rawStats: any[] = await db.$queryRaw`
        SELECT 
            MIN(DATE(p.timestamp)) as start_date,
            MAX(DATE(p.timestamp)) as end_date,
            p.line,
            p.type,
            COUNT(p.id) as total_output,
            COUNT(DISTINCT p.box_id) as total_bigbox,
            COUNT(DISTINCT b.pallete_id) as total_pallet
        FROM product p
        LEFT JOIN box b ON p.box_id = b.id
        WHERE p.timestamp >= ${start} 
          AND p.timestamp <= ${end}
          AND (${filterType} = 'all' OR p.type = ${filterType})
        GROUP BY p.line, p.type
        ORDER BY p.line ASC
    `;

    console.log("Success! Rows returned:", rawStats.length);
    console.log(rawStats);
  } catch (error) {
    console.error("Query failed:", error);
  }
}

main();
