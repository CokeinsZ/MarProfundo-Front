import { useState } from 'react';
import axios from 'axios';
import { ManualBlock } from '@/interfaces/manual';

interface CreateManualData {
  title: string;
  thumbnail: string;
}

interface CreateBlocksData {
  manual_id: number;
  blocks: Omit<ManualBlock, 'block_id' | 'manual_id'>[];
}

export function useManualForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createManual = async (data: CreateManualData) => {
    try {
      setLoading(true);
      setError(null);
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
      
      const response = await axios.post(
        'https://back.mar-abierto.online/manuals/',
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        setError(message);
        throw new Error(message);
      }
      throw new Error('Error al crear el manual');
    } finally {
      setLoading(false);
    }
  };



  const createBlocks = async (data: CreateBlocksData) => {
    try {
      setLoading(true);
      setError(null);
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
      
      await axios.post(
        'https://back.mar-abierto.online/manual-blocks/bulk/',
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        setError(message);
        throw new Error(message);
      }
      throw new Error('Error al crear los bloques');
    } finally {
      setLoading(false);
    }
  };

  const deleteBlock = async (blockId: number) => {
    try {
      setLoading(true);
      setError(null);
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
      
      await axios.delete(
        `https://back.mar-abierto.online/manual-blocks/${blockId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        setError(message);
        throw new Error(message);
      }
      throw new Error('Error al eliminar el bloque');
    } finally {
      setLoading(false);
    }
  };

  return { createManual, createBlocks, deleteBlock, loading, error };
}
