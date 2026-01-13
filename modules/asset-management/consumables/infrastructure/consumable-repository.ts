import { dbAsset } from "@/lib/db";
import { CreateConsumableInput, ConsumableFilter } from "../domain/types";

export const ConsumableRepository = {
  findAll: async (filter: ConsumableFilter) => {
    const where: any = {};
    if (filter.search) {
      where.OR = [
        { item_name: { contains: filter.search, mode: 'insensitive' } },
        { brand_type: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    return await dbAsset.consumables.findMany({
      where,
      include: {
        usage_history: true
      },
      orderBy: { request_date: 'desc' },
    });
  },

  findLastDocument: async (prefix: string) => {
    return await dbAsset.consumables.findFirst({
      where: {
        document_number: {
          startsWith: prefix
        }
      },
      orderBy: {
        document_number: 'desc'
      }
    });
  },

  create: async (data: CreateConsumableInput) => {
    return await dbAsset.consumables.create({
      data
    });
  }
};
