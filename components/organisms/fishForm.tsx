'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fish, FishFormData } from '@/interfaces/fish';
import { Save, X } from 'lucide-react';
import Link from 'next/link';
import { fishFormSchema } from '@/schemas/fish';
import { useFishForm } from '@/hooks/useFishForm';

interface FishFormProps {
  fish?: Fish;
}

export default function FishFormComponent({ fish }: FishFormProps) {
  const { loading, createFish, updateFish, handleValidationError } = useFishForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FishFormData>({
    resolver: zodResolver(fishFormSchema),
    defaultValues: fish
      ? {
          common_name: fish.common_name,
          scientific_name: fish.scientific_name,
          habitat: fish.habitat,
          mean_size: parseFloat(fish.mean_size),
          mean_weight: parseFloat(fish.mean_weight),
          diet: fish.diet,
          img: fish.img,
        }
      : {
          common_name: '',
          scientific_name: '',
          habitat: '',
          mean_size: 0,
          mean_weight: 0,
          diet: '',
          img: '',
        },
  });

  const onSubmit = async (data: FishFormData) => {
    if (fish) {
      await updateFish(fish.fish_id, data);
    } else {
      await createFish(data);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {fish ? 'Editar Especie' : 'Nueva Especie'}
        </h1>
        <p className="text-gray-600 mt-2">
          {fish ? 'Actualiza la información de la especie' : 'Completa los datos de la nueva especie'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit, handleValidationError)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="common_name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Común *
              </label>
              <input
                id="common_name"
                type="text"
                {...register('common_name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Trucha arcoíris"
              />
              {errors.common_name && <p className="text-red-600 text-sm mt-1">{errors.common_name.message}</p>}
            </div>

            <div>
              <label htmlFor="scientific_name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Científico *
              </label>
              <input
                id="scientific_name"
                type="text"
                {...register('scientific_name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Oncorhynchus mykiss"
              />
              {errors.scientific_name && (
                <p className="text-red-600 text-sm mt-1">{errors.scientific_name.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="habitat" className="block text-sm font-medium text-gray-700 mb-2">
              Hábitat *
            </label>
            <textarea
              id="habitat"
              {...register('habitat')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe el hábitat natural..."
            />
            {errors.habitat && <p className="text-red-600 text-sm mt-1">{errors.habitat.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="mean_size" className="block text-sm font-medium text-gray-700 mb-2">
                Tamaño Promedio (cm) *
              </label>
              <input
                id="mean_size"
                type="number"
                step="0.1"
                {...register('mean_size', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              {errors.mean_size && <p className="text-red-600 text-sm mt-1">{errors.mean_size.message}</p>}
            </div>

            <div>
              <label htmlFor="mean_weight" className="block text-sm font-medium text-gray-700 mb-2">
                Peso Promedio (kg) *
              </label>
              <input
                id="mean_weight"
                type="number"
                step="0.01"
                {...register('mean_weight', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
              {errors.mean_weight && <p className="text-red-600 text-sm mt-1">{errors.mean_weight.message}</p>}
            </div>

            <div>
              <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-2">
                Dieta *
              </label>
              <input
                id="diet"
                type="text"
                {...register('diet')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Carnívoro"
              />
              {errors.diet && <p className="text-red-600 text-sm mt-1">{errors.diet.message}</p>}
            </div>
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

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link
              href="/admin/fishes"
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
