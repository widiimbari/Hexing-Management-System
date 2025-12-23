import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { startOfDay, startOfWeek, startOfMonth } from "date-fns";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday start
    const monthStart = startOfMonth(now);

    const [
      productCount, 
      boxCount, 
      palletCount,
      dailyOutput,
      weeklyOutput,
      monthlyOutput,
      topTypesRaw
    ] = await Promise.all([
      db.product.count(),
      db.box.count(),
      db.pallete.count(),
      db.product.count({ where: { timestamp: { gte: todayStart } } }),
      db.product.count({ where: { timestamp: { gte: weekStart } } }),
      db.product.count({ where: { timestamp: { gte: monthStart } } }),
      db.product.groupBy({
        by: ['type'],
        _count: { type: true },
        orderBy: { _count: { type: 'desc' } },
        take: 10,
      }),
    ]);

    const topTypes = topTypesRaw.map(t => ({ type: t.type, count: t._count.type }));

    return NextResponse.json({
      productCount,
      boxCount,
      palletCount,
      dailyOutput,
      weeklyOutput,
      monthlyOutput,
      topTypes,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
