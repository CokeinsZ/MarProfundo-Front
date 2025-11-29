"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Fish } from "@/interfaces/fish";

export function useFishes() {
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFishes();
  }, []);

  const fetchFishes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('https://back.mar-abierto.online/fishes');
      setFishes(response.data || []);
    } catch (err) {
      setError('Error al cargar los peces');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fishes,
    loading,
    error,
    refetch: fetchFishes,
  };
}
