"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FishFormData } from '@/interfaces/fish';

export function useFishForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createFish = async (data: FishFormData) => {
    setLoading(true);
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        alert('No hay sesión activa. Por favor inicia sesión.');
        return;
      }

      await axios.post('https://back.mar-abierto.online/fishes', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Pez creado exitosamente');
      router.push('/admin/fishes');
    } catch (error) {
      console.error('Error al crear pez:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        alert('Error al crear el pez: ' + message);
      } else {
        alert('Error al crear el pez');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateFish = async (fishId: number, data: Partial<FishFormData>) => {
    setLoading(true);
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        alert('No hay sesión activa. Por favor inicia sesión.');
        return;
      }

      await axios.put(`https://back.mar-abierto.online/fishes/${fishId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Pez actualizado exitosamente');
      router.push('/admin/fishes');
    } catch (error) {
      console.error('Error al actualizar pez:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        alert('Error al actualizar el pez: ' + message);
      } else {
        alert('Error al actualizar el pez');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteFish = async (fishId: number) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No hay sesión activa');
      }

      await axios.delete(`https://back.mar-abierto.online/fishes/${fishId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return true;
    } catch (error) {
      console.error('Error al eliminar pez:', error);
      throw error;
    }
  };

  const handleValidationError = (errors: any) => {
    console.log('Errores de validación:', errors);
    alert('Por favor corrige los errores en el formulario antes de guardar');
  };

  return {
    loading,
    createFish,
    updateFish,
    deleteFish,
    handleValidationError,
  };
}
