'use client';

import { useParams, useRouter } from 'next/navigation';
import { useManual } from '@/hooks/useManual';
import { useManualBlocks } from '@/hooks/useManualBlocks';
import ManualBlockComponent from '@/components/molecules/manualBlock';
import { ArrowLeft } from 'lucide-react';

export default function ManualDetailPage() {
  const params = useParams();
  const router = useRouter();
  const manualId = Number(params.id);
  
  const { manual, loading: loadingManual } = useManual(manualId);
  const { blocks, loading: loadingBlocks, error } = useManualBlocks(manualId);
  
  const loading = loadingManual || loadingBlocks;

  // Ordenar bloques por índice
  const sortedBlocks = [...blocks].sort((a, b) => a.index - b.index);

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
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => router.push('/manuals')}
            className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Volver a manuales
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/manuals')}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a manuales
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {manual && (
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-bold text-gray-900">
                {manual.title}
              </h1>
            </div>
          )}

          {blocks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Este manual no tiene contenido disponible
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedBlocks.map((block) => (
                <ManualBlockComponent key={block.block_id} block={block} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
