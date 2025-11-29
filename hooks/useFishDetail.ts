"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Fish } from "@/interfaces/fish";

export function useFishDetail(fishId: string | null) {
  const [fish, setFish] = useState<Fish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fishId) {
      fetchFish(fishId);
    } else {
      setLoading(false);
    }
  }, [fishId]);

  const fetchFish = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`https://back.mar-abierto.online/fishes/${id}`);
      setFish(response.data);
    } catch (err) {
      setError('Error al cargar el pez');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fish,
    loading,
    error,
    refetch: () => fishId && fetchFish(fishId),
  };
}
