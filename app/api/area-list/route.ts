import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const areas = await db.area_list.findMany({
      orderBy: { value: "asc" },
    });
    
    // Return only the string values
    return NextResponse.json(areas.map(a => a.value));
  } catch (error) {
    console.error("[AREA_LIST_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
