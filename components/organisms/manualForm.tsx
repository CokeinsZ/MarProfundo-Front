'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manualSchema, ManualFormData } from '@/schemas/manual';
import { useManualForm } from '@/hooks/useManualForm';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { Manual, ManualBlock } from '@/interfaces/manual';

interface ManualFormComponentProps {
  manual?: Manual;
  blocks?: ManualBlock[];
}

export default function ManualFormComponent({ manual, blocks = [] }: ManualFormComponentProps) {
  const router = useRouter();
  const { createManual, createBlocks, loading } = useManualForm();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ManualFormData>({
    resolver: zodResolver(manualSchema),
    defaultValues: {
      title: manual?.title || '',
      thumbnail: manual?.thumbnail || '',
      blocks: blocks.map(b => ({ index: b.index, type: b.type, content: b.content })),
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'blocks',
  });

  const onSubmit = async (data: ManualFormData) => {
    try {
      // Crear manual
      const newManual = await createManual({
        title: data.title,
        thumbnail: data.thumbnail,
      });
      const manualId = newManual.manual_id;

      // Crear bloques
      if (data.blocks && data.blocks.length > 0 && manualId) {
        const blocksData = data.blocks.map((block, index) => ({
          index,
          type: block.type,
          content: block.content,
        }));

        await createBlocks({
          manual_id: manualId,
          blocks: blocksData,
        });
      }

      alert('Manual guardado exitosamente');
      router.push('/admin/manuals');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al guardar el manual');
    }
  };

  const addBlock = () => {
    append({
      index: fields.length,
      type: 'text',
      content: '',
    });
  };

  const removeBlock = (index: number) => {
    remove(index);
  };

  const moveBlock = (from: number, to: number) => {
    if (to < 0 || to >= fields.length) return;
    move(from, to);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Información del Manual</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              {...register('title')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail (URL)
            </label>
            <input
              type="url"
              {...register('thumbnail')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Bloques de Contenido</h2>
          <button
            type="button"
            onClick={addBlock}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Plus size={20} />
            Agregar Bloque
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Bloque {index + 1}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => moveBlock(index, index - 1)}
                    disabled={index === 0}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                  >
                    <MoveUp size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(index, index + 1)}
                    disabled={index === fields.length - 1}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                  >
                    <MoveDown size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeBlock(index)}
                    className="p-1 text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo
                  </label>
                  <select
                    {...register(`blocks.${index}.type` as const)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="text">Texto</option>
                    <option value="h2">Título H2</option>
                    <option value="h3">Título H3</option>
                    <option value="list">Lista</option>
                    <option value="image">Imagen</option>
                    <option value="gif">GIF</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contenido
                  </label>
                  <textarea
                    {...register(`blocks.${index}.content` as const)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder='Para listas, usa formato JSON: ["item 1", "item 2"]'
                  />
                  {errors.blocks?.[index]?.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.blocks[index]?.content?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay bloques. Haz clic en &quot;Agregar Bloque&quot; para comenzar.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/manuals')}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Crear Manual'}
        </button>
      </div>
    </form>
  );
}
