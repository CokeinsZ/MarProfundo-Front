import { Fish } from '@/interfaces/fish';
import Image from 'next/image';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';

interface FishesTableProps {
  fishes: Fish[];
  onDelete: (id: number) => void;
}

export default function FishesTable({ fishes, onDelete }: FishesTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imagen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre Común
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre Científico
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tamaño (cm)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peso (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dieta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fishes.map((fish) => (
              <tr key={fish.fish_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    {fish.img ? (
                      <Image
                        src={fish.img}
                        alt={fish.common_name}
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
                  <div className="text-sm font-medium text-gray-900">{fish.common_name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm italic text-gray-600">{fish.scientific_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {fish.mean_size} cm
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {fish.mean_weight} kg
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs break-words">{fish.diet}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/fishes/edit/${fish.fish_id}`}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => onDelete(fish.fish_id)}
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
