import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const type = searchParams.get("type");

    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    // 1. Fetch Targets from Config
    const targets = await db.$queryRaw`
        SELECT root as line, value as target 
        FROM config 
        WHERE branch = 'target'
    `;
    const targetMap = new Map();
    (targets as any[]).forEach(t => {
        // Normalize line names (e.g., 'line_01' -> 'Line 1')
        const key = t.line.replace('line_', 'Line ').replace(/^Line 0/, 'Line ');
        targetMap.set(key, parseInt(t.target || '0'));
    });

    // 2. Main Aggregation Query (Products, Boxes, Pallets)
    // Refactored to be 100% static to avoid SQL syntax errors (Code 1064)
    const filterType = type && type !== 'all' ? type : 'all';
    const isAllTime = (start && end) ? 0 : 1;
    const sDate = start || new Date(0); // Fallback to epoch if All Time
    const eDate = end || new Date();    // Fallback to now if All Time

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
        WHERE (${isAllTime} = 1 OR (p.timestamp >= ${sDate} AND p.timestamp <= ${eDate}))
          AND (${filterType} = 'all' OR p.type = ${filterType})
        GROUP BY p.line, p.type
        ORDER BY p.line ASC
    `;

    // 3. Process Data
    let grandTotalOutput = 0;
    const lineTotals = new Map<string, number>();

    const detailedStats = rawStats.map((row) => {
        const total_output = Number(row.total_output);
        const target = targetMap.get(row.line) || 0;
        
        grandTotalOutput += total_output;
        lineTotals.set(row.line, (lineTotals.get(row.line) || 0) + total_output);

        const startDateStr = row.start_date ? format(new Date(row.start_date), 'yyyy-MM-dd') : '-';
        const endDateStr = row.end_date ? format(new Date(row.end_date), 'yyyy-MM-dd') : '-';
        const dateRange = startDateStr === endDateStr ? startDateStr : `${startDateStr} - ${endDateStr}`;

        return {
            tanggal: dateRange,
            tahun: start ? new Date(start).getFullYear() : (row.start_date ? new Date(row.start_date).getFullYear() : new Date().getFullYear()),
            line: row.line,
            type: row.type,
            total_output: total_output,
            total_bigbox: Number(row.total_bigbox),
            total_pallet: Number(row.total_pallet),
            target: target,
            percentage: target > 0 ? Math.round((total_output / target) * 100) : 0
        };
    });

    // 4. Summarize Line Stats for the Cards
    const lineStats = Array.from(lineTotals.entries()).map(([line, count]) => {
        const target = targetMap.get(line) || 0;
        return {
            line,
            count,
            target,
            performance: target > 0 ? Math.round((count / target) * 100) : 0
        };
    });

    return NextResponse.json({
        totalOutput: grandTotalOutput,
        lineStats,
        detailedStats
    });

  } catch (error: any) {
    console.error("[PRODUCT_STATS]", error);
    return NextResponse.json({ message: "Error", details: error.message }, { status: 500 });
  }
}