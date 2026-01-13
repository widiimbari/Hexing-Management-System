export interface CreateConsumableInput {
  item_name: string;
  brand_type?: string;
  qty_estimated: number;
  price_estimated: number;
  purchase_link?: string;
  remarks?: string;
  document_number: string;
  status: string;
  request_date: Date;
  item_image?: string;
}

export interface ConsumableFilter {
  search?: string;
}
