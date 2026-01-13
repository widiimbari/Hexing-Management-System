import { dbAsset } from "@/lib/db";
import { BrandSearchParams, CreateBrandInput, UpdateBrandInput } from "../domain/types";

export const BrandRepository = {
  async findAll(params: BrandSearchParams) {
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
      dbAsset.brands.findMany({
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
      dbAsset.brands.count({ where }),
    ]);

    return { data, total };
  },

  async create(data: CreateBrandInput) {
    return await dbAsset.brands.create({
      data: {
        name: data.name,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  },

  async update(id: bigint, data: UpdateBrandInput) {
    return await dbAsset.brands.update({
      where: { id },
      data: {
        name: data.name,
        updated_at: new Date(),
      },
    });
  },

  async findById(id: bigint) {
    return await dbAsset.brands.findUnique({
      where: { id },
    });
  },

  async delete(id: bigint) {
    return await dbAsset.brands.delete({
      where: { id },
    });
  }
};
