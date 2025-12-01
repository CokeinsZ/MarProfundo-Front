'use client';

import { useState } from 'react';
import { Fish } from '@/interfaces/fish';
import FishesTable from '@/components/molecules/fishesTable';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import axios from 'axios';

interface FishesListProps {
  initialFishes: Fish[];
}

export default function FishesList({ initialFishes }: FishesListProps) {
  const [fishes, setFishes] = useState<Fish[]>(initialFishes);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este pez?')) {
      return;
    }

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        alert('No hay sesión activa. Por favor inicia sesión.');
        return;
      }

      await axios.delete(`https://back.mar-abierto.online/fishes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setFishes(fishes.filter((f) => f.fish_id !== id));
      alert('Pez eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar pez:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        alert('Error al eliminar el pez: ' + message);
      } else {
        alert('Error al eliminar el pez');
      }
    }
  };

  const filteredFishes = fishes.filter((fish) =>
    fish.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fish.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fish.diet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Aqualog - Especies de Peces</h1>
        <p className="text-gray-600 mt-2">Gestiona la base de datos de especies</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre o dieta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Link
          href="/admin/fishes/new"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Nueva Especie</span>
        </Link>
      </div>

      <FishesTable fishes={filteredFishes} onDelete={handleDelete} />

      {filteredFishes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow mt-6">
          <p className="text-gray-500">No se encontraron especies</p>
        </div>
      )}
    </div>
  );
}
