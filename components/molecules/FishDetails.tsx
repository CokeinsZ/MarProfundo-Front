"use client";
import { useFishDetail } from "@/hooks/useFishDetail";
import Image from "next/image";

export default function FishDetails({ id }: { id: string }) {
  const { fish, loading, errorMsg } = useFishDetail(id);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-500">{errorMsg}</p>
      </div>
    );
  }

  if (!fish) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>No se encontró el pez.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Imagen */}
      <div className="md:col-span-1 flex items-center justify-center">
        <div className="w-full h-64 md:h-72 relative rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          {fish.img ? (
            <Image
              src={fish.img}
              alt={fish.common_name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <p className="text-gray-600">Sin imagen</p>
          )}
        </div>
      </div>

      {/* Detalles */}
      <div className="md:col-span-2 flex flex-col gap-4">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {fish.common_name}
            </h1>
            <p className="text-sm text-gray-500 italic mt-1">
              {fish.scientific_name}
            </p>
          </div>

        </header>

        <section className="prose prose-sm max-w-none">
          <h2 className="text-lg font-semibold text-gray-700">Descripción</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            <p>
              <strong>Hábitat:</strong> {fish.habitat}
            </p>
            <p>
              <strong>Dieta:</strong> {fish.diet}
            </p>
            <p>
              <strong>Tamaño promedio:</strong> {fish.mean_size} cm
            </p>
            <p>
              <strong>Peso promedio:</strong> {fish.mean_weight} kg
            </p>
          </div>
        </section>

        <footer className="mt-auto flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Información obtenida desde la base marina.
          </p>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md text-sm transition-all">
            Ver más especies
          </button>
        </footer>
      </div>
    </article>
  );
}
