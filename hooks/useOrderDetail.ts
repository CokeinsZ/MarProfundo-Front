"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { OrderDetail } from "@/interfaces/order";

export function useOrderDetail(orderId: string | null) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrder = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        setError('No hay sesión activa');
        return;
      }

      const response = await axios.get(`https://back.mar-abierto.online/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setOrder(response.data);
    } catch (err) {
      setError('Error al cargar el pedido');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No hay sesión activa');
      }

      await axios.patch(
        `https://back.mar-abierto.online/orders/${orderId}/status`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Recargar el pedido después de actualizar
      if (order) {
        await fetchOrder(orderId.toString());
      }

      return true;
    } catch (err) {
      console.error('Error al actualizar el estado:', err);
      throw err;
    }
  };

  return {
    order,
    loading,
    error,
    updateStatus,
    refetch: () => orderId && fetchOrder(orderId),
  };
}
