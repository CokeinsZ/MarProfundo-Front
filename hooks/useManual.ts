import { useState, useEffect } from 'react';
import axios from 'axios';
import { Manual } from '@/interfaces/manual';

export function useManual(manualId: number) {
  const [manual, setManual] = useState<Manual | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManual = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Manual>(
          `https://back.mar-abierto.online/manuals/${manualId}`
        );
        setManual(data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError('Error al cargar el manual');
        }
      } finally {
        setLoading(false);
      }
    };

    if (manualId) {
      fetchManual();
    }
  }, [manualId]);

  return { manual, loading, error };
}
