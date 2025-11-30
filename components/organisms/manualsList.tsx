'use client';

import { useAdminManuals } from '@/hooks/useAdminManuals';
import ManualsTable from '@/components/molecules/manualsTable';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

export default function ManualsList() {
  const { manuals, loading, error, deleteManual } = useAdminManuals();
  const [search, setSearch] = useState('');

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este manual?')) return;
    
    try {
      await deleteManual(id);
      alert('Manual eliminado exitosamente');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar el manual');
    }
  };

  const filteredManuals = manuals.filter((manual) =>
    manual.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar manuales..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Link
          href="/admin/manuals/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Nuevo Manual
        </Link>
      </div>

      {filteredManuals.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No se encontraron manuales</p>
        </div>
      ) : (
        <ManualsTable manuals={filteredManuals} onDelete={handleDelete} />
      )}
    </div>
  );
}
