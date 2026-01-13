import { dbAsset } from "@/lib/db";
import { SupplierSearchParams, CreateSupplierInput, UpdateSupplierInput } from "../domain/types";

export const SupplierRepository = {
  async findAll(params: SupplierSearchParams) {
    const { page, limit, search } = params;
    const skip = limit > 0 ? (page - 1) * limit : undefined;
    const take = limit > 0 ? limit : undefined;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { contact_person: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.suppliers.findMany({
        where,
        take,
        skip,
        include: {
          _count: {
            select: { assets: true }
          }
        },
        orderBy: { name: "asc" },
      }),
      dbAsset.suppliers.count({ where }),
    ]);

    return { data, total };
  },

  async findById(id: bigint) {
    return await dbAsset.suppliers.findUnique({ where: { id } });
  },

  async create(data: CreateSupplierInput) {
    return await dbAsset.suppliers.create({
      data: {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  },

  async update(id: bigint, data: UpdateSupplierInput) {
    return await dbAsset.suppliers.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  },

  async delete(id: bigint) {
    return await dbAsset.suppliers.delete({ where: { id } });
  }
};
