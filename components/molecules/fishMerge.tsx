"use client";

import Image from "next/image";
import Link from "next/link";
import { useFishes } from "@/hooks/useFishes";
import { Fish } from "@/interfaces/fish"; 

export default function FishMerge() {
  const { fishes, loading, error } = useFishes();

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <p className="text-gray-500 text-lg">Cargando peces...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Peces disponibles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fishes.map((fish: Fish) => (
          <Link
            key={fish.fish_id} 
            href={`/fish/${fish.fish_id}`}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 block"
          >
            <div className="relative w-full h-48">
              <Image
                src={fish.img}
                alt={fish.common_name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {fish.common_name}
              </h2>
              <p className="italic text-gray-600">{fish.scientific_name}</p>

              <div className="mt-3 text-sm text-gray-700">
                <p>
                  <strong>Hábitat:</strong> {fish.habitat}
                </p>
                <p>
                  <strong>Tamaño:</strong> {fish.mean_size} cm
                </p>
                <p>
                  <strong>Peso:</strong> {fish.mean_weight} kg
                </p>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Ver detalles
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
