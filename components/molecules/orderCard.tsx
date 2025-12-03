"use client";
import { useState } from "react";
import { useOrderDetail } from "@/hooks/useOrderDetail"; 

interface OrderCardProps {
  orderId: number;
  date: string;
  initialStatus: string;
}

export const OrderCard = ({ orderId, date, initialStatus }: OrderCardProps) => {
  const { order: orderDetail, orderStats, loading } = useOrderDetail(orderId.toString());
  const [isOpen, setIsOpen] = useState(false); 

  const mainProduct = orderDetail?.products?.[0];
  const uniqueProductsCount = (orderDetail?.products?.length || 0) - 1;
  
  const orderTitle = mainProduct 
    ? `${mainProduct.name} ${uniqueProductsCount > 0 ? `y ${uniqueProductsCount} productos más...` : ''}`
    : `Pedido #${orderId}`;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'received': return { label: 'Recibido', color: 'bg-green-100 text-green-700 border-green-200' };
      case 'sent':     return { label: 'Enviado', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'canceled': return { label: 'Cancelado', color: 'bg-red-100 text-red-700 border-red-200' };
      default:         return { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    }
  };

  const statusInfo = getStatusConfig(orderDetail?.order?.status || initialStatus);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center cursor-pointer group"
      >
        <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-white border border-gray-200 overflow-hidden flex items-center justify-center relative">
          {loading ? (
            <div className="animate-pulse bg-gray-100 h-full w-full" />
          ) : mainProduct?.img ? (
            <img src={mainProduct.img} alt={mainProduct.name} className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
          ) : (
            <span className="text-2xl">📦</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-gray-900 truncate pr-2 text-lg group-hover:text-blue-600 transition-colors">
                {loading ? <span className="animate-pulse bg-gray-200 text-transparent rounded">Cargando...</span> : orderTitle}
              </h4>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs">ID: {orderId}</span>
            </div>
            <div className="mt-1">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border inline-block ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right pl-4 border-l border-gray-100 sm:border-l-0 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 mt-2 sm:mt-0 w-full sm:w-auto flex justify-between sm:block items-center">
          <span className="sm:hidden text-gray-500 text-sm font-medium">Total:</span>
          <div className="flex flex-col items-end">
            {loading ? (
               <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <>
                <p className="text-xl font-bold text-blue-600">${orderStats.totalMoney.toLocaleString('es-CO')}</p>
                <p className="text-xs text-gray-500 font-medium">
                  {orderStats.totalItems} {orderStats.totalItems === 1 ? 'artículo' : 'artículos'}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* DETALLES */}
      {isOpen && orderDetail?.products && (
        <div className="border-t border-gray-100 bg-gray-50 p-4 animate-fade-in-down">
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detalle de productos</h5>
          <div className="space-y-3">
            {orderDetail.products.map((product, index) => {
              const qty = product.quantity || 1;
              return (
                <div key={`${product.product_id}-${index}`} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-white overflow-hidden flex-shrink-0 border border-gray-200 flex items-center justify-center">
                      {product.img ? (
                        <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-xs">📷</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        ${product.price.toLocaleString('es-CO')} x {qty} u.
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-700">
                      ${(product.price * qty).toLocaleString('es-CO')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
             <span className="text-sm text-gray-500">Gastos de envío e impuestos incluidos</span>
             <span className="text-lg font-bold text-blue-600">Total: ${orderStats.totalMoney.toLocaleString('es-CO')}</span>
          </div>
        </div>
      )}
    </div>
  );
};