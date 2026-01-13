export interface SupplierSearchParams {
  page: number;
  limit: number;
  search?: string;
}

export interface CreateSupplierInput {
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface UpdateSupplierInput extends Partial<CreateSupplierInput> {}

export interface SupplierDto extends CreateSupplierInput {
  id: bigint | string;
  created_at: Date;
  updated_at: Date;
  _count?: {
    assets: number;
  };
}
