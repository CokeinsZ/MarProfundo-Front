'use client';

import FishFormComponent from '@/components/organisms/fishForm';
import { useFishDetail } from '@/hooks/useFishDetail';
import { use } from 'react';

export default function EditFishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { fish, loading, errorMsg } = useFishDetail(id);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando especie...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !fish) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">{errorMsg || 'Especie no encontrada'}</p>
        </div>
      </div>
    );
  }

  return <FishFormComponent fish={fish} />;
}
