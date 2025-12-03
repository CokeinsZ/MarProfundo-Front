import { useState, useEffect } from 'react';
import { DashboardMetrics, RecentOrder, TopProduct } from '@/interfaces/admin';
import axios from 'axios';

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
      
      if (!token) {
        setError('No hay token de autenticación');
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMetrics(response.data.metrics);
      setRecentOrders(response.data.recentOrders);
      setTopProducts(response.data.topProducts);
    } catch (err) {
      setError('Error al cargar los datos del dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    metrics,
    recentOrders,
    topProducts,
    loading,
    error,
    refresh: fetchDashboardData,
  };
}
