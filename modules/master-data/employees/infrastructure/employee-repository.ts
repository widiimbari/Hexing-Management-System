import { dbAsset } from "@/lib/db";
import { EmployeeSearchParams, CreateEmployeeInput, UpdateEmployeeInput } from "../domain/types";

export const EmployeeRepository = {
  async findAll(params: EmployeeSearchParams) {
    const { page, limit, search } = params;
    const skip = limit > 0 ? (page - 1) * limit : undefined;
    const take = limit > 0 ? limit : undefined;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { employee_id: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      dbAsset.employees.findMany({
        where,
        take,
        skip,
        include: {
          department: { select: { name: true } }
        },
        orderBy: { name: "asc" },
      }),
      dbAsset.employees.count({ where }),
    ]);

    return { data, total };
  },

  async findById(id: bigint) {
    return await dbAsset.employees.findUnique({ where: { id } });
  },

  async create(data: CreateEmployeeInput) {
    return await dbAsset.employees.create({
      data: {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  },

  async update(id: bigint, data: UpdateEmployeeInput) {
    return await dbAsset.employees.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  },

  async delete(id: bigint) {
    return await dbAsset.employees.delete({ where: { id } });
  }
};
