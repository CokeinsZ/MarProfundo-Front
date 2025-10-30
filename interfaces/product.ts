export interface Product {
  product_id: number;
  name: string;
  description?: string;
  price: number;
  img?: string;
}

export interface Warehouse_Product {
  warehouse_id: number;
  product_id: number;
  quantity: number;
}