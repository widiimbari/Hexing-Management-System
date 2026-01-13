import { db } from "@/lib/db";
import { Prisma } from "@/generated/inventory-client-v2";
import { PLSlaveSearchParams, CreatePLSlaveInput } from "../domain/types";

export const PLSlaveRepository = {
  async findAll(params: PLSlaveSearchParams) {
    const { page, limit, search } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.attachment2WhereInput = {
      active: true,
      ...(search && {
        OR: [
          { nomor: { contains: search } },
          { type: { contains: search } },
          { area: { contains: search } },
        ],
      }),
    };

    const [total, items] = await Promise.all([
      db.attachment2.count({ where: whereClause }),
      db.attachment2.findMany({
        where: whereClause,
        orderBy: { timestamp: "desc" },
        skip,
        take: limit,
      })
    ]);

    // Fetch counts
    const ids = items.map(a => a.id);
    let countMap = new Map<number, number>();
    
    if (ids.length > 0) {
        const counts = await db.product.groupBy({
          by: ["attachment2_id"],
          _count: { id: true },
          where: { attachment2_id: { in: ids } },
        });
        
        // Ensure id is not null (though schema should imply validation, group by can return null key if nullable)
        // In this case attachment2_id is nullable on product.
        countMap = new Map(counts.map((item) => [item.attachment2_id || 0, item._count.id]));
    }

    return { total, items, countMap };
  },

  async create(data: CreatePLSlaveInput) {
    return await db.attachment2.create({
      data: {
        ...data,
        status: false,
        active: true
      }
    });
  }
};
