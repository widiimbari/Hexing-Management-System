export interface EmployeeSearchParams {
  page: number;
  limit: number;
  search?: string;
}

export interface CreateEmployeeInput {
  employee_id: string;
  name: string;
  department_id: bigint;
}

export interface UpdateEmployeeInput extends Partial<CreateEmployeeInput> {}

export interface EmployeeDto {
  id: bigint | string;
  employee_id: string;
  name: string;
  department_id: bigint | string;
  created_at: Date;
  updated_at: Date;
  department?: {
    name: string;
  };
}
