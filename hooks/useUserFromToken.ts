import { useState, useEffect } from "react";
import { User } from "@/interfaces/user";

export function useUserFromToken() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUserFromToken = async (): Promise<User | null> => {
    try {
      // Obtener el token de las cookies
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
      
      if (!tokenCookie) {
        setError("No se encontró token de autenticación");
        return null;
      }

      const token = tokenCookie.split('=')[1];
      
      // Decodificar el token JWT (parte del payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Extraer información del usuario del payload
      const userData: User = {
        user_id: payload.user_id || payload.sub,
        name: payload.name || '',
        last_name: payload.last_name || '',
        national_id: payload.national_id || '',
        email: payload.email || '',
        password: '', // No incluimos la contraseña por seguridad
        phone: payload.phone || '',
        address: payload.address || '',
        status: payload.status || 'active',
        role: payload.role || 'user'
      };

      return userData;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      setError("Error al obtener información del usuario");
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const userData = await getUserFromToken();
      setUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const refetchUser = async () => {
    setLoading(true);
    const userData = await getUserFromToken();
    setUser(userData);
    setLoading(false);
  };

  return { user, loading, error, refetchUser };
}