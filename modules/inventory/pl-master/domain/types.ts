export interface PLMasterSearchParams {
  page: number;
  limit: number;
  search?: string;
  availableOnly?: boolean;
}

export interface CreatePLMasterInput {
  nomor: string;
  type: string;
  no_do?: string;
  no_order?: string;
  tgl_order: Date;
  area: string;
  timestamp: Date;
}

export interface PLMasterDto {
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
  tersedia: number;
}

export interface PLMasterListResult {
  data: PLMasterDto[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
