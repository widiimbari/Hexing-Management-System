import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const types = await db.meter_type.findMany({
      select: {
        value: true,
      },
      distinct: ["value"],
      orderBy: {
        value: "asc",
      },
    });

    return NextResponse.json(types.map((t) => t.value));
  } catch (error) {
    console.error("[METER_TYPES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
