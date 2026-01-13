export interface CategorySearchParams {
  page: number;
  limit: number;
  search?: string;
}

export interface CreateCategoryInput {
  name: string;
}

export interface UpdateCategoryInput {
  name: string;
}

export interface CategoryDto {
  id: bigint | string;
  name: string;
  created_at: Date;
  updated_at: Date;
  _count?: {
    assets: number;
  };
}

export interface CategoryListResult {
  data: CategoryDto[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
