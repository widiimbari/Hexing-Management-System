export interface ProductSearchParams {
  page: number;
  limit: number;
  startSerial?: string | null;
  endSerial?: string | null;
  searchScope: string;
  startDate?: string | null;
  endDate?: string | null;
  type?: string | null;
}

export interface ProductDto {
  id: number;
  serial: string;
  module_serial: string | null;
  timestamp: Date | null;
  type: string | null;
  box_id: number | null;
  attachment_id: number | null;
  attachment2_id: number | null;
  
  // Flattened fields
  box_serial: string;
  pallet_serial: string;
  attachment_nomor: string;
  attachment2_nomor: string;
  area: string;
  status: string;
}

export interface ProductListResult {
  data: ProductDto[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
