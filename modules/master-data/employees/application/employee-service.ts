import { EmployeeRepository } from "../infrastructure/employee-repository";
import { EmployeeSearchParams, CreateEmployeeInput, UpdateEmployeeInput } from "../domain/types";
import { logActivity } from "@/lib/activity-logger";

export const EmployeeService = {
  async getEmployees(params: EmployeeSearchParams) {
    const { data, total } = await EmployeeRepository.findAll(params);
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

  async createEmployee(data: CreateEmployeeInput, currentUser?: any) {
    const employee = await EmployeeRepository.create(data);
    await logActivity('CREATE', 'Employee', String(employee.id), `Created employee: ${employee.name}`, currentUser);
    return employee;
  },

  async updateEmployee(id: string | bigint, data: UpdateEmployeeInput, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const employee = await EmployeeRepository.update(bigIntId, data);
    await logActivity('UPDATE', 'Employee', String(employee.id), `Updated employee: ${employee.name}`, currentUser);
    return employee;
  },

  async deleteEmployee(id: string | bigint, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const employee = await EmployeeRepository.findById(bigIntId);
    if (!employee) throw new Error("Employee not found");

    await EmployeeRepository.delete(bigIntId);
    await logActivity('DELETE', 'Employee', String(id), `Deleted employee: ${employee.name}`, currentUser);
    return true;
  }
};
