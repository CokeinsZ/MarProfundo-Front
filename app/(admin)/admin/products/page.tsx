'use client';

import ProductsList from '@/components/organisms/productsList';
import { useAdminProducts } from '@/hooks/useAdminProducts';

export default function ProductsPage() {
  const { products, loading, error } = useAdminProducts();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Cargando productos...</div>
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

  return <ProductsList initialProducts={products} />;
}
