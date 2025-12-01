export interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  salesGrowth: number;
  ordersGrowth: number;
}

export interface RecentOrder {
  order_id: string;
  user_name: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

export interface TopProduct {
  product_id: number;
  name: string;
  total_sold: number;
  total_revenue: number;
  img?: string;
}

export interface ProductForm {
  name: string;
  description: string;
  price: number;
  img: string;
  categories: number[];
  warehouses: { warehouse_id: number; quantity: number }[];
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  img: string;
}

export interface Warehouse {
  id: number;
  city: string;
  name: string;
  status: string;
  address: string;
}

export interface WarehouseStock {
  stock: number;
  warehouse: Warehouse;
}

export interface AdminProduct {
  product_id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  created_at: string;
  updated_at: string;
  categories: { pcategory_id: number; name: string }[];
  warehouses: WarehouseStock[];
  stock?: number;
}
