'use client';

import ProductFormComponent from '@/components/organisms/productForm';
import { useProduct } from '@/hooks/useProduct';
import { useCategories } from '@/hooks/usePCategories';
import { useWarehouses } from '@/hooks/useWarehouses';
import { use } from 'react';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const { product, loading: loadingProduct, error: errorProduct } = useProduct(id);
  const { pCategories, loading: loadingCategories } = useCategories();
  const { warehouses, loading: loadingWarehouses } = useWarehouses();

  if (loadingProduct || loadingCategories || loadingWarehouses) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (errorProduct) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">{errorProduct}</p>
        </div>
      </div>
    );
  }

  if (!product || !pCategories) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No se encontró el producto</p>
        </div>
      </div>
    );
  }

  return (
    <ProductFormComponent 
      product={product} 
      categories={pCategories} 
      warehouses={warehouses}
    />
  );
}
