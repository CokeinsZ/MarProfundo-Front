"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export interface Fish {
  fish_id?: number;
  id?: number;
  common_name: string;
  scientific_name: string;
  habitat: string;
  mean_size: number;
  mean_weight: number;
  diet: string;
  img: string;
}

export function useFishAdmin() {
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  // -------------------------
  // 📌 Obtener token (igual que tu otro hook)
  // -------------------------
  const getToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; accessToken=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return localStorage.getItem("token");
  };

  // -------------------------
  // 📌 Cargar peces
  // -------------------------
  const fetchFishes = async () => {
    const token = getToken();
    const controller = new AbortController();

    try {
      setLoading(true);
      setMensaje(null);

      const { data } = await axios.get(`${API}/fishes`, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFishes(data || []);
      console.log(data);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        setMensaje(Array.isArray(msg) ? msg.join(", ") : msg || error.message);
      } else {
        setMensaje((error as Error).message);
      }
    } finally {
      setLoading(false);
      {
      }
    }
  };

  // -------------------------
  // 🟢 Crear pez
  // -------------------------
  const createFish = async (payload: Fish) => {
    const token = getToken();
    const controller = new AbortController();

    try {
      setLoading(true);
      setMensaje(null);

      const { data } = await axios.post(`${API}/fishes`, payload, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setFishes((prev) => [data, ...prev]);
      setMensaje("Pez creado correctamente ✔");

      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        setMensaje(Array.isArray(msg) ? msg.join(", ") : msg || error.message);
      } else {
        setMensaje((error as Error).message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // ✏️ Editar pez
  // -------------------------
  const updateFish = async (id: number, payload: Partial<Fish>) => {
    const token = getToken();
    const controller = new AbortController();

    try {
      setLoading(true);
      setMensaje(null);

      const { data } = await axios.put(`${API}/fishes/${id}`, payload, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setFishes((prev) => prev.map((f) => (f.fish_id === id ? data : f)));

      setMensaje("Pez actualizado correctamente ✏️");
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        setMensaje(Array.isArray(msg) ? msg.join(", ") : msg || error.message);
      } else {
        setMensaje((error as Error).message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // ❌ Eliminar pez
  // -------------------------
  const deleteFish = async (id: number) => {
    const token = getToken();
    const controller = new AbortController();

    try {
      setLoading(true);
      setMensaje(null);
      console.log("Deleting fish with id:", id);

      await axios.delete(`${API}/fishes/${id}`, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFishes((prev) => prev.filter((f) => (f.fish_id ?? f.id) !== id));
      setMensaje("Pez eliminado correctamente ❌");

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        setMensaje(Array.isArray(msg) ? msg.join(", ") : msg || error.message);
      } else {
        setMensaje((error as Error).message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFishes();
  }, []);

  return {
    fishes,
    loading,
    mensaje,

    fetchFishes,
    createFish,
    updateFish,
    deleteFish,
  };
}
