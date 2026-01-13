import { dbAsset } from "@/lib/db";
import { AreaSearchParams, CreateAreaInput, UpdateAreaInput } from "../domain/types";

export const AreaRepository = {
  async findAll(params: AreaSearchParams) {
    const { page, limit, search } = params;
    const skip = limit > 0 ? (page - 1) * limit : undefined;
    const take = limit > 0 ? limit : undefined;

    const where: any = {};
    if (search) {
      where.OR = [{ name: { contains: search } }];
    }

    const [data, total] = await Promise.all([
      dbAsset.areas.findMany({
        where,
        take,
        skip,
        orderBy: { name: "asc" },
      }),
      dbAsset.areas.count({ where }),
    ]);

    return { data, total };
  },

  async findById(id: bigint) {
    return await dbAsset.areas.findUnique({ where: { id } });
  },

  async create(data: CreateAreaInput) {
    return await dbAsset.areas.create({
      data: {
        name: data.name,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  },

  async update(id: bigint, data: UpdateAreaInput) {
    return await dbAsset.areas.update({
      where: { id },
      data: {
        name: data.name,
        updated_at: new Date(),
      },
    });
  },

  async delete(id: bigint) {
    return await dbAsset.areas.delete({ where: { id } });
  }
};
