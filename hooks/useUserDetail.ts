"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/interfaces/user";

export function useUserDetail(userId: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        setError('No hay sesión activa');
        return;
      }

      const response = await axios.get(`https://back.mar-abierto.online/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
    } catch (err) {
      setError('Error al cargar el usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (userId: number, status: string) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No hay sesión activa');
      }

      await axios.patch(
        `https://back.mar-abierto.online/users/${userId}/status`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Recargar el usuario después de actualizar
      if (user) {
        await fetchUser(userId.toString());
      }

      return true;
    } catch (err) {
      console.error('Error al actualizar el estado:', err);
      throw err;
    }
  };

  const updateRole = async (userId: number, role: string) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No hay sesión activa');
      }

      await axios.patch(
        `https://back.mar-abierto.online/users/${userId}/role`,
        { role },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Recargar el usuario después de actualizar
      if (user) {
        await fetchUser(userId.toString());
      }

      return true;
    } catch (err) {
      console.error('Error al actualizar el rol:', err);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    updateStatus,
    updateRole,
    refetch: () => userId && fetchUser(userId),
  };
}
