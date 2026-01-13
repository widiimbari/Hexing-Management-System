import { dbAsset } from "@/lib/db";
import { LocationSearchParams, CreateLocationInput, UpdateLocationInput } from "../domain/types";

export const LocationRepository = {
  async findAll(params: LocationSearchParams) {
    const { page, limit, search } = params;
    const skip = limit > 0 ? (page - 1) * limit : undefined;
    const take = limit > 0 ? limit : undefined;

    const where: any = {};
    if (search) {
      where.OR = [{ name: { contains: search } }];
    }

    const [data, total] = await Promise.all([
      dbAsset.locations.findMany({
        where,
        take,
        skip,
        orderBy: { name: "asc" },
      }),
      dbAsset.locations.count({ where }),
    ]);

    return { data, total };
  },

  async findById(id: bigint) {
    return await dbAsset.locations.findUnique({ where: { id } });
  },

  async create(data: CreateLocationInput) {
    return await dbAsset.locations.create({
      data: {
        name: data.name,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  },

  async update(id: bigint, data: UpdateLocationInput) {
    return await dbAsset.locations.update({
      where: { id },
      data: {
        name: data.name,
        updated_at: new Date(),
      },
    });
  },

  async delete(id: bigint) {
    return await dbAsset.locations.delete({ where: { id } });
  }
};
