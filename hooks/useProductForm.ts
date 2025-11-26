"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ProductForm } from '@/interfaces/admin';

export function useProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createProduct = async (data: ProductForm) => {
    console.log('Form submitted with data:', data);
    setLoading(true);
    try {
      console.log('Creando producto...');
      
      // Obtener token de la cookie
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
        'Content-Type': 'application/json'
      };
      
      // 1. Crear el producto
      const productResponse = await axios.post('https://back.mar-abierto.online/products', {
        name: data.name,
        description: data.description,
        price: data.price,
        img: data.img,
      }, { headers });

      const productId = productResponse.data.product_id;

      // 2. Vincular categorías
      await Promise.all(
        data.categories.map(categoryId =>
          axios.post('https://back.mar-abierto.online/product-pcategory', {
            product_id: String(productId),
            pcategory_id: String(categoryId),
          }, { headers })
        )
      );

      // 3. Vincular bodegas con stock
      await Promise.all(
        data.warehouses.map(warehouse =>
          axios.post('https://back.mar-abierto.online/warehouse-product', {
            product_id: productId,
            warehouse_id: warehouse.warehouse_id,
            quantity: warehouse.quantity,
          }, { headers })
        )
      );

      alert('Producto creado exitosamente');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error al guardar producto:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        alert('Error al guardar el producto: ' + message);
      } else {
        alert('Error al guardar el producto: Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId: number, data: ProductForm, currentCategories?: number[]) => {
    console.log('Actualizar producto:', productId, data);
    setLoading(true);
    try {
      // Obtener token de la cookie
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
        'Content-Type': 'application/json'
      };

      // 1. Actualizar el producto
      await axios.patch(`https://back.mar-abierto.online/products/${productId}`, {
        name: data.name,
        description: data.description,
        price: data.price,
        img: data.img,
      }, { headers });

      // 2. Eliminar todas las categorías anteriores una por una
      if (currentCategories && currentCategories.length > 0) {
        await Promise.all(
          currentCategories.map(categoryId =>
            axios.delete(`https://back.mar-abierto.online/product-pcategory/${productId}/${categoryId}`, { headers })
          )
        );
      }

      // 3. Crear las nuevas categorías
      await Promise.all(
        data.categories.map(categoryId =>
          axios.post('https://back.mar-abierto.online/product-pcategory', {
            product_id: String(productId),
            pcategory_id: String(categoryId),
          }, { headers })
        )
      );

      // 4. Eliminar todos los registros de warehouse-product anteriores
      await axios.delete(`https://back.mar-abierto.online/warehouse-product/${productId}`, { headers });

      // 5. Crear los nuevos registros de warehouse-product
      await Promise.all(
        data.warehouses.map(warehouse =>
          axios.post('https://back.mar-abierto.online/warehouse-product', {
            product_id: productId,
            warehouse_id: warehouse.warehouse_id,
            quantity: warehouse.quantity,
          }, { headers })
        )
      );

      alert('Producto actualizado exitosamente');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        alert('Error al actualizar el producto: ' + message);
      } else {
        alert('Error al actualizar el producto: Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleValidationError = (errors: any) => {
    console.log('Errores de validación:', errors);
    alert('Por favor corrige los errores en el formulario antes de guardar');
  };

  return {
    loading,
    createProduct,
    updateProduct,
    handleValidationError,
  };
}
