'use client';

import { useState } from 'react';
import { AdminProduct } from '@/interfaces/admin';
import ProductsTable from '@/components/molecules/productsTable';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import axios from 'axios';

interface ProductsListProps {
  initialProducts: AdminProduct[];
}

export default function ProductsList({ initialProducts }: ProductsListProps) {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto? Esto también eliminará sus categorías y stock en bodegas.')) {
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

      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      // Encontrar el producto para obtener sus categorías
      const product = products.find(p => p.product_id === id);
      
      // Eliminar categorías del producto una por una
      if (product?.categories && product.categories.length > 0) {
        await Promise.all(
          product.categories.map(cat =>
            axios.delete(`https://back.mar-abierto.online/product-pcategory/${id}/${cat.pcategory_id}`, { headers })
          )
        );
      }
      
      // Eliminar stock de bodegas
      await axios.delete(`https://back.mar-abierto.online/warehouse-product/${id}`, { headers });
      
      // Eliminar el producto
      await axios.delete(`https://back.mar-abierto.online/products/${id}`, { headers });
      
      setProducts(products.filter((p) => p.product_id !== id));
      alert('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        alert('Error al eliminar el producto: ' + message);
      } else {
        alert('Error al eliminar el producto');
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
        <p className="text-gray-600 mt-2">Gestiona el inventario de productos</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Nuevo Producto</span>
        </Link>
      </div>

      <ProductsTable products={filteredProducts} onDelete={handleDelete} />

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No se encontraron productos</p>
        </div>
      )}
    </div>
  );
}
