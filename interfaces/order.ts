export interface Order {
  order_id: number;
  user_id: number;
  status: 'pending' | 'received' | 'sent' | 'canceled';
  created_at: string;
  updated_at: string;
}

export interface OrderProduct {
  product_id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  created_at: string;
  updated_at: string;
  quantity?: number;
}

export interface OrderUser {
  user_id: string;
  name: string;
  national_id: string;
  address: string;
  phone: string;
  email: string;
}

export interface OrderDetail {
  order: Order;
  products: OrderProduct[];
  user: OrderUser;
}

export interface OrderListItem extends Order {
  user_name?: string;
  total?: number;
  products_count?: number;
}
