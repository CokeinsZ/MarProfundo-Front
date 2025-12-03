import { useState, useEffect } from 'react';
import { AdminProduct } from '@/interfaces/admin';
import axios from 'axios';

export function useAdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            max: 20,
            page: 1,
          },
        }
      );

      // Calcular stock total para cada producto
      const productsWithStock = response.data.map((product: AdminProduct) => {
        const totalStock = product.warehouses?.reduce(
          (sum, wh) => sum + (wh.stock || 0),
          0
        ) || 0;
        
        return {
          ...product,
          stock: totalStock
        };
      });
      
      setProducts(productsWithStock);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return {
    products,
    loading,
    error,
    fetchProducts
  };
}
