"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { UserListItem } from "@/interfaces/user";

export function useUsers() {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
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

      const response = await axios.get('https://back.mar-abierto.online/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUsers(response.data || []);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
}
