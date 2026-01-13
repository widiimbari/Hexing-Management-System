export interface LocationSearchParams {
  page: number;
  limit: number;
  search?: string;
}

export interface CreateLocationInput {
  name: string;
}

export interface UpdateLocationInput {
  name: string;
}

export interface LocationDto {
  id: bigint | string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
