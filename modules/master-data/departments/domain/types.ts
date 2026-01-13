export interface DepartmentSearchParams {
  page: number;
  limit: number;
  search?: string;
}

export interface CreateDepartmentInput {
  name: string;
}

export interface UpdateDepartmentInput {
  name: string;
}

export interface DepartmentDto {
  id: bigint | string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
