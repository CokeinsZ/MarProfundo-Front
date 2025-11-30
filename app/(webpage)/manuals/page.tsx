'use client';

import { useManuals } from '@/hooks/useManuals';
import ManualsGrid from '@/components/molecules/manualsGrid';
import { BookOpen } from 'lucide-react';

export default function ManualsPage() {
  const { manuals, loading, error } = useManuals();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen size={48} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Manuales y Guías
          </h1>
          <p className="text-lg text-gray-600">
            Aprende todo sobre los peces y su cuidado
          </p>
        </div>

        {manuals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay manuales disponibles en este momento
            </p>
          </div>
        ) : (
          <ManualsGrid manuals={manuals} />
        )}
      </div>
    </div>
  );
}
