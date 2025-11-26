'use client';

import ProductFormComponent from '@/components/organisms/productForm';
import { useCategories } from '@/hooks/usePCategories';
import { useWarehouses } from '@/hooks/useWarehouses';

export default function NewProductPage() {
  const { pCategories, loading: loadingCategories } = useCategories();
  const { warehouses, loading: loadingWarehouses } = useWarehouses();

  if (loadingCategories || loadingWarehouses) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (!pCategories || !warehouses) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">Error al cargar datos necesarios</div>
      </div>
    );
  }

  return <ProductFormComponent categories={pCategories} warehouses={warehouses} />;
}
