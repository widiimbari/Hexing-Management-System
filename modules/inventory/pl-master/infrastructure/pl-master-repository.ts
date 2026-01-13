import { db } from "@/lib/db";
import { Prisma } from "@/generated/inventory-client-v2";
import { PLMasterSearchParams, CreatePLMasterInput } from "../domain/types";

export const PLMasterRepository = {
  async findAvailableIds(): Promise<number[]> {
     const availableAttachments = await db.$queryRawUnsafe<{ id: number }[]>(
       "SELECT id FROM attachment WHERE active = 1 AND qty > 0 AND used_qty < qty"
     );
     return availableAttachments.map(a => a.id);
  },

  async findAll(params: PLMasterSearchParams) {
    const { page, limit, search, availableOnly } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.attachmentWhereInput = {
      active: true,
      ...(search && {
        OR: [
          { nomor: { contains: search } },
          { type: { contains: search } },
          { area: { contains: search } },
        ],
      }),
    };

    if (availableOnly) {
       try {
         const ids = await this.findAvailableIds();
         if (ids.length === 0) return { total: 0, items: [] };
         whereClause.id = { in: ids };
       } catch (e) {
         console.error("Raw SQL error, fallback", e);
         whereClause.qty = { gt: 0 }; // Fallback
       }
    }

    const [total, items] = await Promise.all([
      db.attachment.count({ where: whereClause }),
      db.attachment.findMany({
        where: whereClause,
        orderBy: { timestamp: "desc" },
        skip,
        take: limit,
      })
    ]);

    return { total, items };
  },

  async create(data: CreatePLMasterInput) {
    return await db.attachment.create({
      data: {
        ...data,
        no_do: data.no_do || "",
        no_order: data.no_order || "",
        status: false,
        active: true
      }
    });
  }
};
