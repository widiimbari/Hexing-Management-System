import { dbAsset } from "@/lib/db";
import { CategorySearchParams, CreateCategoryInput, UpdateCategoryInput } from "../domain/types";

export const CategoryRepository = {
  async findAll(params: CategorySearchParams) {
    const { page, limit, search } = params;
    
    const skip = limit > 0 ? (page - 1) * limit : undefined;
    const take = limit > 0 ? limit : undefined;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.categories.findMany({
        where,
        take,
        skip,
        include: {
          _count: {
            select: { assets: true }
          }
        },
        orderBy: {
          name: "asc",
        },
      }),
      dbAsset.categories.count({ where }),
    ]);

    return { data, total };
  },

  async create(data: CreateCategoryInput) {
    return await dbAsset.categories.create({
      data: {
        name: data.name,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  },

  async update(id: bigint, data: UpdateCategoryInput) {
    return await dbAsset.categories.update({
      where: { id },
      data: {
        name: data.name,
        updated_at: new Date(),
      },
    });
  },

  async findById(id: bigint) {
    return await dbAsset.categories.findUnique({
      where: { id },
    });
  },

  async delete(id: bigint) {
    return await dbAsset.categories.delete({
      where: { id },
    });
  }
};
