'use client';

import MetricCard from '@/components/atoms/metricCard';
import RecentOrdersTable from '@/components/molecules/recentOrdersTable';
import TopProductsCard from '@/components/molecules/topProductsCard';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';

export default function AdminDashboard() {
  const { metrics, recentOrders, topProducts, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bienvenido al panel de administración</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Ventas Totales"
          value={`$${metrics.totalSales.toLocaleString()}`}
          icon={DollarSign}
          change={metrics.salesGrowth}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Pedidos"
          value={metrics.totalOrders}
          icon={ShoppingCart}
          change={metrics.ordersGrowth}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Productos"
          value={metrics.totalProducts}
          icon={Package}
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Usuarios"
          value={metrics.totalUsers}
          icon={Users}
          iconColor="text-orange-600"
        />
      </div>

      {/* Sección de tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={recentOrders} />
        </div>
        <div>
          <TopProductsCard products={topProducts} />
        </div>
      </div>
    </div>
  );
}
