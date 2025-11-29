'use client';

import { useState } from 'react';
import { OrderListItem } from '@/interfaces/order';
import OrdersTable from '@/components/molecules/ordersTable';
import { Search } from 'lucide-react';

interface OrdersListProps {
  initialOrders: OrderListItem[];
}

export default function OrdersList({ initialOrders }: OrdersListProps) {
  const [orders] = useState<OrderListItem[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.order_id.toString().includes(searchTerm) ||
      order.user_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Pedidos</h1>
        <p className="text-gray-600 mt-2">Gestiona todos los pedidos de la tienda</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por ID o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="received">Recibido</option>
          <option value="sent">Enviado</option>
          <option value="canceled">Cancelado</option>
        </select>
      </div>

      <OrdersTable orders={filteredOrders} />

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow mt-6">
          <p className="text-gray-500">No se encontraron pedidos</p>
        </div>
      )}
    </div>
  );
}
