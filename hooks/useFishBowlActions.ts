"use client";
import axios from "axios";
import { useState } from "react";

export function useFishBowlActions() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const getToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; accessToken=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return localStorage.getItem("token");
  };

  // -------------------------
  // 📌 Agregar pez al usuario
  // -------------------------
  const addFish = async (user_id: number, fish_id: number, formData: any) => {
    const controller = new AbortController();

    try {
      setLoading(true);
      setMensaje(null);

      const token = getToken();
      if (!token) return { success: false, message: "No hay sesión activa" };

      const payload = {
        user_id,
        fish_id,
        origin: formData.origin,
        size: formData.size,
        weight: formData.weight,
        is_favorite: formData.is_favorite ?? false,
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user-fish`,
        payload,
        {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMensaje("Pez agregado correctamente ✔");
      return { success: true, data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        setMensaje(Array.isArray(msg) ? msg.join(", ") : msg || error.message);
      } else {
        setMensaje((error as Error).message);
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // ❌ Eliminar pez del usuario
  // -------------------------
  const removeFish = async (user_id: number, fish_id: number) => {
    const controller = new AbortController();

    try {
      setLoading(true);
      setMensaje(null);

      const token = getToken();
      if (!token) return { success: false, message: "No hay sesión activa" };

      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user-fish/${user_id}/${fish_id}`,
        {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensaje("Pez eliminado correctamente ❌");
      return { success: true, data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        setMensaje(Array.isArray(msg) ? msg.join(", ") : msg || error.message);
      } else {
        setMensaje((error as Error).message);
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { addFish, removeFish, loading, mensaje };
}
