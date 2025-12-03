"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { OrderListItem } from "@/interfaces/order";

export function useUserOrders(userId: string | number | undefined) {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        setError('No hay sesión activa');
        setLoading(false);
        return;
      }

      const response = await axios.get(`https://back.mar-abierto.online/orders/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setOrders(response.data || []);
    } catch (err) {
      console.error(err);
      setOrders([]); 
      setError('Error al cargar historial');
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refetch: fetchOrders };
}