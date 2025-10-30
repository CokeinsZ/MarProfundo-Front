import { useState } from "react";
import axios from "axios";
import { LoginDTO } from "@/interfaces/user";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loginUser = async (credentials: LoginDTO) => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setMensaje(null);

      const url = "http://back.mar-abierto.online/login"; // ajusta si tu endpoint es distinto
      const { data } = await axios.post(url, credentials, { signal: controller.signal });

      // Intentar extraer token desde varias posibles claves
      const accessToken = data?.accessToken ?? data?.token ?? data?.access_token ?? null;

      if (!accessToken) {
        setMensaje("Respuesta de login sin token.");
        return null;
      }

      // Guardar cookie simple (no HttpOnly). Si necesitas HttpOnly, debe establecerla el backend.
      const maxAge = 60 * 60 * 24 * 7; // 7 días
      document.cookie = `accessToken=${accessToken}; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure`;

      setToken(String(accessToken));
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

  return { loginUser, loading, mensaje, token };
}