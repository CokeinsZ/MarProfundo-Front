import { useState, useEffect } from 'react';
import axios from 'axios';
import { Manual } from '@/interfaces/manual';

export function useAdminManuals() {
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchManuals = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Manual[]>('https://back.mar-abierto.online/manuals/');
      setManuals(data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError('Error al cargar los manuales');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManuals();
  }, []);

  const deleteManual = async (id: number) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
      await axios.delete(`https://back.mar-abierto.online/manuals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchManuals();
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.message || err.message);
      }
      throw new Error('Error al eliminar el manual');
    }
  };

  return { manuals, loading, error, deleteManual, refetch: fetchManuals };
}
