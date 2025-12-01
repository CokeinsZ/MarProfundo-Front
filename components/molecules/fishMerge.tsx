"use client";

import Image from "next/image";
import { useFishes } from "@/hooks/useFishes";

export default function FishMerge() {
  const { fishes, loading, error } = useFishes();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-200 py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Cargando especies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-200 py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-200 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          🐟 Especies Marinas
        </h1>

        <p className="text-center text-lg text-gray-700 mb-6">
          {fishes.length} especies disponibles
        </p>

        <div className="bg-white/80 border-4 border-blue-400 rounded-3xl shadow-xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fishes.map((fish) => (
              <div
                key={fish.fish_id}
                className="flex flex-col items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-200 rounded-xl shadow-md p-4 hover:scale-105 transition-transform"
              >
                <div className="relative w-full h-40 mb-3">
                  <Image
                    src={fish.img}
                    alt={fish.common_name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="font-semibold text-gray-800 text-center">{fish.common_name}</p>
                <p className="text-sm italic text-gray-600 text-center">{fish.scientific_name}</p>
                <p className="text-sm text-gray-600 mt-2">🌊 {fish.habitat}</p>
                <p className="text-sm text-gray-600">📏 {fish.mean_size} cm</p>
                <p className="text-sm text-gray-600">⚖️ {fish.mean_weight} kg</p>
                <p className="text-sm text-gray-600">🍽️ {fish.diet}</p>
              </div>
            ))}
          </div>

          {fishes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay especies disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
