import { useState } from "react";
import axios from "axios";
import { LoginDTO } from "@/interfaces/user";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const loginUser = async (credentials: LoginDTO) => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setMensaje(null);

      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;
      const { data } = await axios.post(url, credentials, { signal: controller.signal });

      if (!data) {
        setMensaje("Error en la respuesta del servidor.");
        return null;
      }

      // Intentar extraer información del usuario
      const accessToken = data.token ?? null;
      const role = data.role ?? null;

      if (!accessToken || !role) {
        setMensaje("Error en la respuesta del servidor.");
        return null;
      }

      const maxAge = 60 * 60 * 24 * 7; // 7 días
      document.cookie = `accessToken=${accessToken}; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure`;

      setToken(String(accessToken));
      setRole(data?.role ? String(data.role) : null);
      return accessToken;
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : (error as Error)?.message ?? "Error desconocido";
      setMensaje("Error al iniciar sesión: " + message);
      return null;
    } finally {
      setLoading(false);
      controller.abort();
    }
  };

  return { loginUser, loading, mensaje, token, role };
}