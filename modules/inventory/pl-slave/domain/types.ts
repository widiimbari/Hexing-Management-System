export interface PLSlaveSearchParams {
  page: number;
  limit: number;
  search?: string;
}

export interface CreatePLSlaveInput {
  nomor: string;
  type: string;
  no_do: string;
  no_order: string;
  tgl_order: Date;
  area: string;
  timestamp: Date;
}

export interface PLSlaveDto {
  id: number;
  nomor: string;
  type: string;
  no_do: string | null;
  no_order: string | null;
  tgl_order: Date | null;
  area: string;
  timestamp: Date | null;
  active: boolean;
  total: number;
}

export interface PLSlaveListResult {
  data: PLSlaveDto[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
