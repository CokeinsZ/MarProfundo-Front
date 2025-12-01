'use client';

import { useState } from 'react';
import { OrderDetail } from '@/interfaces/order';
import { useOrderDetail } from '@/hooks/useOrderDetail';
import Image from 'next/image';
import { Package, User, Calendar, CreditCard } from 'lucide-react';

interface OrderDetailViewProps {
  orderId: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  received: 'bg-blue-100 text-blue-800 border-blue-300',
  sent: 'bg-green-100 text-green-800 border-green-300',
  canceled: 'bg-red-100 text-red-800 border-red-300',
};

const statusLabels = {
  pending: 'Pendiente',
  received: 'Recibido',
  sent: 'Enviado',
  canceled: 'Cancelado',
};

export default function OrderDetailView({ orderId }: OrderDetailViewProps) {
  const { order, loading, error, updateStatus } = useOrderDetail(orderId);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;

    setUpdating(true);
    try {
      await updateStatus(order.order.order_id, newStatus);
      alert('Estado actualizado exitosamente');
    } catch (err) {
      alert('Error al actualizar el estado');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando pedido...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error || 'Pedido no encontrado'}</p>
        </div>
      </div>
    );
  }

  const total = order.products.reduce((sum, product) => sum + product.price * (product.quantity || 1), 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Pedido #{order.order.order_id}</h1>
        <p className="text-gray-600 mt-2">
          Realizado el {new Date(order.order.created_at).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información del pedido */}
        <div className="lg:col-span-2 space-y-6">
          {/* Estado */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Package className="mr-2" size={24} />
              Estado del Pedido
            </h2>
            <div className="flex items-center justify-between">
              <span className={`px-4 py-2 inline-flex text-sm font-semibold rounded-lg border-2 ${statusColors[order.order.status]}`}>
                {statusLabels[order.order.status]}
              </span>
              <select
                value={order.order.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="pending">Pendiente</option>
                <option value="received">Recibido</option>
                <option value="sent">Enviado</option>
                <option value="canceled">Cancelado</option>
              </select>
            </div>
          </div>

          {/* Productos */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Productos</h2>
            </div>
            <div className="divide-y">
              {order.products.map((product) => (
                <div key={product.product_id} className="p-6 flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {product.img ? (
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                    <p className="text-sm text-gray-600 mt-1">Cantidad: {product.quantity || 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${product.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">c/u</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-blue-600">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del cliente */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <User className="mr-2" size={24} />
              Cliente
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-semibold text-gray-900">{order.user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{order.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="text-gray-900">{order.user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Documento</p>
                <p className="text-gray-900">{order.user.national_id}</p>
              </div>
              {order.user.address && (
                <div>
                  <p className="text-sm text-gray-500">Dirección</p>
                  <p className="text-gray-900">{order.user.address}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2" size={24} />
              Fechas
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Creado</p>
                <p className="text-gray-900">
                  {new Date(order.order.created_at).toLocaleString('es-ES')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última actualización</p>
                <p className="text-gray-900">
                  {new Date(order.order.updated_at).toLocaleString('es-ES')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
