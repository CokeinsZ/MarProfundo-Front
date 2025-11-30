import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/interfaces/user"; // Asegúrate de tener esta interfaz o usa 'any'

export function useUserDetail() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      
      const getTokenFromCookies = () => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; accessToken=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
      };
      
      const token = getTokenFromCookies() || localStorage.getItem("token");

      if (!token) {
        throw new Error("No hay sesión activa");
      }

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload);
      const userId = decoded.sub;

      if (!userId) {
        throw new Error("Token inválido");
      }

      const url = `https://back.mar-abierto.online/users/${userId}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(data);
      setError(null);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al cargar usuario");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);


  return { user, loading, error, refetch: fetchUser };
}