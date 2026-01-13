import { dbAsset } from "@/lib/db";
import { DepartmentSearchParams, CreateDepartmentInput, UpdateDepartmentInput } from "../domain/types";

export const DepartmentRepository = {
  async findAll(params: DepartmentSearchParams) {
    const { page, limit, search } = params;
    const skip = limit > 0 ? (page - 1) * limit : undefined;
    const take = limit > 0 ? limit : undefined;

    const where: any = {};
    if (search) {
      where.OR = [{ name: { contains: search } }];
    }

    const [data, total] = await Promise.all([
      dbAsset.departments.findMany({
        where,
        take,
        skip,
        orderBy: { name: "asc" },
      }),
      dbAsset.departments.count({ where }),
    ]);

    return { data, total };
  },

  async findById(id: bigint) {
    return await dbAsset.departments.findUnique({ where: { id } });
  },

  async create(data: CreateDepartmentInput) {
    return await dbAsset.departments.create({
      data: {
        name: data.name,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  },

  async update(id: bigint, data: UpdateDepartmentInput) {
    return await dbAsset.departments.update({
      where: { id },
      data: {
        name: data.name,
        updated_at: new Date(),
      },
    });
  },

  async delete(id: bigint) {
    return await dbAsset.departments.delete({ where: { id } });
  }
};
