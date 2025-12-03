import { useState, useEffect } from 'react';
import axios from 'axios';
import { Manual } from '@/interfaces/manual';

export function useManuals() {
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManuals = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Manual[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/manuals/`
        );
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

    fetchManuals();
  }, []);

  return { manuals, loading, error };
}
