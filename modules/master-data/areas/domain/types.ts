export interface AreaSearchParams {
  page: number;
  limit: number;
  search?: string;
}

export interface CreateAreaInput {
  name: string;
}

export interface UpdateAreaInput {
  name: string;
}

export interface AreaDto {
  id: bigint | string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
