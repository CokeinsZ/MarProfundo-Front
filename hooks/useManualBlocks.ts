import { useState, useEffect } from 'react';
import axios from 'axios';
import { ManualBlock } from '@/interfaces/manual';

export function useManualBlocks(manualId: number) {
  const [blocks, setBlocks] = useState<ManualBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<ManualBlock[]>(
          `https://back.mar-abierto.online/manual-blocks/manual/${manualId}`
        );
        setBlocks(data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError('Error al cargar el contenido del manual');
        }
      } finally {
        setLoading(false);
      }
    };

    if (manualId) {
      fetchBlocks();
    }
  }, [manualId]);

  return { blocks, loading, error };
}
