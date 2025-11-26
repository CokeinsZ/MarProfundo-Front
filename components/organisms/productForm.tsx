'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminProduct, ProductForm } from '@/interfaces/admin';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { PCategory } from '@/interfaces/pCategory';
import { Warehouse } from '@/hooks/useWarehouses';
import { productFormSchema } from '@/schemas/product';
import { useProductForm } from '@/hooks/useProductForm';

interface ProductFormProps {
  product?: AdminProduct;
  categories: PCategory[];
  warehouses: Warehouse[];
}

export default function ProductFormComponent({ product, categories, warehouses }: ProductFormProps) {
  const { loading, createProduct, updateProduct, handleValidationError } = useProductForm();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          img: product.img,
          categories: product.categories?.map(c => c.pcategory_id) || [],
          warehouses: product.warehouses?.map(w => ({
            warehouse_id: w.warehouse.id,
            quantity: w.stock,
          })) || [],
        }
      : {
          name: '',
          description: '',
          price: 0,
          img: '',
          categories: [],
          warehouses: [],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'warehouses',
  });

  const onSubmit = async (data: ProductForm) => {
    if (product) {
      const currentCategories = product.categories?.map(c => c.pcategory_id) || [];
      await updateProduct(product.product_id, data, currentCategories);
    } else {
      await createProduct(data);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {product ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
        <p className="text-gray-600 mt-2">
          {product ? 'Actualiza la información del producto' : 'Completa los datos del nuevo producto'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit, handleValidationError)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Caña telescópica 2.7m"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe las características del producto..."
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-2">
                URL de la Imagen *
              </label>
              <input
                id="img"
                type="url"
                {...register('img')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {errors.img && <p className="text-red-600 text-sm mt-1">{errors.img.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categorías *
            </label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <label key={category.pcategory_id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value?.includes(category.pcategory_id)}
                        onChange={(e) => {
                          const value = field.value || [];
                          if (e.target.checked) {
                            field.onChange([...value, category.pcategory_id]);
                          } else {
                            field.onChange(value.filter((id: number) => id !== category.pcategory_id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.categories && (
              <p className="text-red-600 text-sm mt-1">{errors.categories.message}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Stock por Bodega *
              </label>
              <button
                type="button"
                onClick={() => append({ warehouse_id: 0, quantity: 1 })}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus size={16} />
                <span>Agregar bodega</span>
              </button>
            </div>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <select
                      {...register(`warehouses.${index}.warehouse_id`, { valueAsNumber: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={0}>Selecciona una bodega</option>
                      {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name} - {warehouse.city}
                        </option>
                      ))}
                    </select>
                    {errors.warehouses?.[index]?.warehouse_id && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.warehouses[index]?.warehouse_id?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      {...register(`warehouses.${index}.quantity`, { valueAsNumber: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Cantidad"
                    />
                    {errors.warehouses?.[index]?.quantity && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.warehouses[index]?.quantity?.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            {errors.warehouses && typeof errors.warehouses.message === 'string' && (
              <p className="text-red-600 text-sm mt-1">{errors.warehouses.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link
              href="/admin/products"
              className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={20} />
              <span>Cancelar</span>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              <Save size={20} />
              <span>{loading ? 'Guardando...' : 'Guardar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
