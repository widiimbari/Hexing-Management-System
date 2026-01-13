export interface BrandSearchParams {
  page: number;
  limit: number;
  search?: string;
}

export interface CreateBrandInput {
  name: string;
}

export interface UpdateBrandInput {
  name: string;
}

export interface BrandDto {
  id: bigint | string;
  name: string;
  created_at: Date;
  updated_at: Date;
  _count?: {
    assets: number;
  };
}

export interface BrandListResult {
  data: BrandDto[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
