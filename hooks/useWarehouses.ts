"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export interface Warehouse {
  id: number;
  name: string;
  city: string;
  address: string;
  status: string;
}

export function useWarehouses() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/warehouse`);
      setWarehouses(response.data || []);
    } catch (err) {
      setError('Error al cargar las bodegas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    warehouses,
    loading,
    error,
    fetchWarehouses,
  };
}
