import { DepartmentRepository } from "../infrastructure/department-repository";
import { DepartmentSearchParams, CreateDepartmentInput, UpdateDepartmentInput } from "../domain/types";
import { logActivity } from "@/lib/activity-logger";

export const DepartmentService = {
  async getDepartments(params: DepartmentSearchParams) {
    const { data, total } = await DepartmentRepository.findAll(params);
    return {
      data: data as any,
      metadata: {
        total,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(total / params.limit),
      },
    };
  },

  async createDepartment(data: CreateDepartmentInput, currentUser?: any) {
    const department = await DepartmentRepository.create(data);
    await logActivity('CREATE', 'Department', String(department.id), `Created department: ${department.name}`, currentUser);
    return department;
  },

  async updateDepartment(id: string | bigint, data: UpdateDepartmentInput, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const department = await DepartmentRepository.update(bigIntId, data);
    await logActivity('UPDATE', 'Department', String(department.id), `Updated department: ${department.name}`, currentUser);
    return department;
  },

  async deleteDepartment(id: string | bigint, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const department = await DepartmentRepository.findById(bigIntId);
    if (!department) throw new Error("Department not found");

    await DepartmentRepository.delete(bigIntId);
    await logActivity('DELETE', 'Department', String(id), `Deleted department: ${department.name}`, currentUser);
    return true;
  }
};
