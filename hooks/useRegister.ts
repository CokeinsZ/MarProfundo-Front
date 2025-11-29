import { useState } from "react";
import { User, UserRegister } from "@/interfaces/user";
import axios from "axios";

export function useRegister() {
  const [user, setUser] = useState<User | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async (userdata: UserRegister) => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setMensaje("");

      const url = "https://back.mar-abierto.online/users/signup";
      const { data } = await axios.post(url, userdata, { signal: controller.signal });

      if (!data) {
        setMensaje("Error en la respuesta del servidor.");
        return;
      }

      const mapped: User = {
        user_id: Number(data?.user.user_id ?? 0),
        name: String(data?.user.name ?? ""),
        last_name: String(data?.user.last_name ?? ""),
        national_id: String(data?.user.national_id ?? "0"),
        email: String(data?.user.email ?? ""),
        password: String(""), // No devolver la contraseña
        phone: String(data?.user.phone ?? ""),
        address: String(data?.user.address ?? ""),
        status: String(data?.user.status ?? ""),
        role: String(data?.user.role ?? "usuario"),
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