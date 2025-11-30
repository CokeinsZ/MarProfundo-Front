import { Manual } from '@/interfaces/manual';
import Image from 'next/image';
import { Trash2, Calendar } from 'lucide-react';

interface ManualsTableProps {
  manuals: Manual[];
  onDelete: (id: number) => void;
}

export default function ManualsTable({ manuals, onDelete }: ManualsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thumbnail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Creación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manuals.map((manual) => (
              <tr key={manual.manual_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    {manual.thumbnail ? (
                      <Image
                        src={manual.thumbnail}
                        alt={manual.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{manual.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {new Date(manual.created_at).toLocaleDateString('es-ES')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onDelete(manual.manual_id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
