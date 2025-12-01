import { Manual } from '@/interfaces/manual';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface ManualsGridProps {
  manuals: Manual[];
}

export default function ManualsGrid({ manuals }: ManualsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {manuals.map((manual) => (
        <Link
          key={manual.manual_id}
          href={`/manuals/${manual.manual_id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="relative w-full h-48 bg-gray-200">
            {manual.thumbnail && (
              <Image
                src={manual.thumbnail}
                alt={manual.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {manual.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span>
                {new Date(manual.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
