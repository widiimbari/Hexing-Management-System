import { NextRequest, NextResponse } from "next/server";
import { dbManagement } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    // Filters
    const module = searchParams.get("module");
    const action = searchParams.get("action");
    const entityType = searchParams.get("entity_type");
    const userId = searchParams.get("user_id");
    const search = searchParams.get("search");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    // Build where clause
    const where: any = {};

    if (module) where.module = module;
    if (action) where.action = action;
    if (entityType) where.entity_type = entityType;
    if (userId) where.user_id = parseInt(userId);

    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { entity_id: { contains: search, mode: 'insensitive' } },
        { user_name: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at.gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.created_at.lte = end;
      }
    }

    // Fetch logs with count
    const [logs, total] = await Promise.all([
      dbManagement.system_logs.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      dbManagement.system_logs.count({ where }),
    ]);

    // Serialize BigInt
    const serializedLogs = logs.map(log => ({
      ...log,
      id: log.id.toString(),
      user_id: log.user_id?.toString() || null,
    }));

    return NextResponse.json({
      logs: serializedLogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching system logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch system logs" },
      { status: 500 }
    );
  }
}

// Get available filter options
export async function OPTIONS(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [modules, actions, entityTypes] = await Promise.all([
      dbManagement.system_logs.findMany({
        select: { module: true },
        distinct: ['module'],
      }),
      dbManagement.system_logs.findMany({
        select: { action: true },
        distinct: ['action'],
      }),
      dbManagement.system_logs.findMany({
        select: { entity_type: true },
        distinct: ['entity_type'],
      }),
    ]);

    return NextResponse.json({
      modules: modules.map(m => m.module),
      actions: actions.map(a => a.action),
      entityTypes: entityTypes.map(e => e.entity_type),
    });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return NextResponse.json(
      { error: "Failed to fetch filter options" },
      { status: 500 }
    );
  }
}
