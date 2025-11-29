'use client';

import FishesList from '@/components/organisms/fishesList';
import { useFishes } from '@/hooks/useFishes';

export default function AqualogPage() {
  const { fishes, loading, error } = useFishes();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando especies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return <FishesList initialFishes={fishes} />;
}
