'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminProduct, ProductForm } from '@/interfaces/admin';
import { AlertCircle, Save, X, Plus, Trash2 } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header más simple */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#e1850c] -mb-2">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full">
          <form onSubmit={handleSubmit(onSubmit, handleValidationError)} className="space-y-6 sm:space-y-8">
            {/* Nombre del Producto */}
            <div className="group">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 transition-all duration-200 group-hover:text-blue-600">
                Nombre del Producto *
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-white text-gray-700 placeholder-gray-500"
                placeholder="Ej: Caña telescópica 2.7m profesional"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 sm:mt-2 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div className="group">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 transition-all duration-200 group-hover:text-blue-600">
                Descripción *
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical min-h-[100px] hover:border-blue-400 bg-white text-gray-700 placeholder-gray-500"
                placeholder="Describe las características, ventajas y usos del producto..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1 sm:mt-2 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Precio e Imagen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="group">
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 transition-all duration-200 group-hover:text-blue-600">
                  Precio *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register('price', { valueAsNumber: true })}
                    className="w-full pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-white text-gray-700 placeholder-gray-500"
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1 sm:mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="group">
                <label htmlFor="img" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 transition-all duration-200 group-hover:text-blue-600">
                  URL de la Imagen *
                </label>
                <input
                  id="img"
                  type="url"
                  {...register('img')}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-white text-gray-700 placeholder-gray-500"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {errors.img && (
                  <p className="text-red-500 text-sm mt-1 sm:mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.img.message}
                  </p>
                )}
              </div>
            </div>

            {/* Categorías */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 transition-all duration-200 group-hover:text-blue-600">
                Categorías *
              </label>
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {categories.map((category) => (
                      <label 
                        key={category.pcategory_id} 
                        className="flex items-center space-x-2 p-2 sm:p-3 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer group/checkbox"
                      >
                        <div className="relative">
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
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                            field.value?.includes(category.pcategory_id) 
                              ? 'bg-blue-500 border-blue-500' 
                              : 'border-gray-300 bg-white group-hover/checkbox:border-blue-400'
                          }`}>
                            {field.value?.includes(category.pcategory_id) && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 group-hover/checkbox:text-blue-600 transition-colors duration-200">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.categories && (
                <p className="text-red-500 text-sm mt-1 sm:mt-2 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.categories.message}
                </p>
              )}
            </div>

            {/* Stock por Bodega */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
                <label className="block text-sm font-semibold text-gray-700 transition-all duration-200 group-hover:text-blue-600">
                  Stock por Bodega *
                </label>
                <button
                  type="button"
                  onClick={() => append({ warehouse_id: 0, quantity: 1 })}
                  className="flex items-center space-x-1 text-[#e1850c] hover:text-blue-600 transition-all duration-200 text-sm font-medium self-start sm:self-auto group/button"
                >
                  <Plus size={16} className="transition-transform duration-200 group-hover/button:scale-110" />
                  <span className="border-b border-transparent hover:border-blue-600 transition-all duration-200">
                    Agregar Bodega
                  </span>
                </button>
              </div>
              
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-300 hover:border-blue-400 transition-all duration-200 group/warehouse">
                    <div className="flex-1 w-full">
                      <select
                        {...register(`warehouses.${index}.warehouse_id`, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm hover:border-blue-400 bg-white text-gray-700"
                      >
                        <option value={0}>Selecciona una bodega</option>
                        {warehouses.map((warehouse) => (
                          <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.name} - {warehouse.city}
                          </option>
                        ))}
                      </select>
                      {errors.warehouses?.[index]?.warehouse_id && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.warehouses[index]?.warehouse_id?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full sm:w-24">
                      <input
                        type="number"
                        {...register(`warehouses.${index}.quantity`, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm hover:border-blue-400 bg-white text-gray-700 placeholder-gray-500"
                        placeholder="Cantidad"
                      />
                      {errors.warehouses?.[index]?.quantity && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.warehouses[index]?.quantity?.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 self-center group/delete"
                    >
                      <Trash2 size={18} className="transition-transform duration-200 group-hover/delete:scale-110" />
                    </button>
                  </div>
                ))}
              </div>
              {errors.warehouses && typeof errors.warehouses.message === 'string' && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.warehouses.message}
                </p>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/products"
                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 text-sm sm:text-base font-medium order-2 sm:order-1 group/cancel"
              >
                <X size={18} className="transition-transform duration-200 group-hover/cancel:scale-110" />
                <span>Cancelar</span>
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#e1850c] text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm sm:text-base font-medium order-1 sm:order-2 group/submit transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} className="transition-transform duration-200 group-hover/submit:scale-110" />
                    <span>Guardar Producto</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
