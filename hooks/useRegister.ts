import { useState } from "react";
import { User } from "@/interfaces/user";
import axios from "axios";

export function useRegister() {
  const [user, setUser] = useState<User | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async (userdata: User) => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setMensaje("");

      const url = "http://back.mar-abierto.online/signup";
      const { data } = await axios.post(url, userdata, { signal: controller.signal });

      const mapped: User = {
        user_id: Number(data?.user_id ?? data?.id ?? 0),
        name: String(data?.name ?? data?.title ?? "Usuario"),
        last_name: String(data?.last_name ?? data?.lastname ?? "Usuario"),
        national_id: String(data?.national_id ?? data?.id ?? "0"),
        email: String(data?.email ?? "usuario@example.com"),
        password: String(data?.password ?? "123456"),
        phone: String(data?.phone ?? "123456789"),
        address: String(data?.address ?? "Calle 123, 123"),
        status: String(data?.status ?? "activo"),
        rol: String(data?.rol ?? "usuario"),
      };

      setUser(mapped);
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      const message =
        (axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : (error as Error)?.message) || "Error desconocido";
      setMensaje("Error al registrar: " + message);
    } finally {
      setLoading(false);
      controller.abort();
    }
  };

  return { registerUser, user, loading, mensaje };
}