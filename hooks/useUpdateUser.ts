import { useState } from "react";
import axios from "axios";

export function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const updateUser = async (userId: number | string, userData: any) => {
    const controller = new AbortController();
    
    try {
      setLoading(true);
      setMensaje(null);

      const getTokenFromCookies = () => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; accessToken=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
      };

      const finalToken = getTokenFromCookies() || localStorage.getItem("token");

      if (!finalToken) {
        setMensaje("No se encontró sesión activa.");
        return { success: false, data: null };
      }

      const url = `https://back.mar-abierto.online/users/${userId}`;

      const { data } = await axios.patch(url, userData, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${finalToken}`,
          "Content-Type": "application/json",
        },
      });

      return { success: true, data: data };

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        const finalMsg = Array.isArray(serverMessage) ? serverMessage.join(", ") : serverMessage;
        setMensaje(finalMsg || error.message);
      } else {
        setMensaje((error as Error)?.message ?? "Error desconocido");
      }
      return { success: false, data: null };
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, mensaje };
}