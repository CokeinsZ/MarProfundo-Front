// components/FishBowlAdmin.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAqualog } from "@/hooks/useAqualog";
import { useFishAdmin, Fish } from "@/hooks/useFishAdmin";
import FishForm from "@/components/molecules/FishForm";

export default function FishBowlAdmin() {
  const { user } = useAqualog();
  const isAdmin = user?.role === "admin";

  const {
    fishes,
    loading,
    mensaje: error,
    fetchFishes,
    createFish,
    updateFish,
    deleteFish,
  } = useFishAdmin();

  const [openCreate, setOpenCreate] = useState(false);
  const [editing, setEditing] = useState<Fish | null>(null);

  // -------------------------
  // Handlers
  // -------------------------
  const handleCreate = async (data: Fish) => {
    await createFish(data);
    setOpenCreate(false);
  };

  const handleUpdate = async (data: Fish) => {
    if (!editing?.fish_id) return;
    await updateFish(editing.fish_id, data);
    setEditing(null);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm(`¿Eliminar pez ${id}? Esta acción no se puede deshacer.`))
      return;
    await deleteFish(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-200 via-sky-200 to-blue-300 py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-blue-900 drop-shadow-md">
            🛠 Admin Peces
          </h1>

          {isAdmin && (
            <button
              onClick={() => setOpenCreate(true)}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md transition-all"
            >
              ➕ Crear Pez
            </button>
          )}
        </div>

        {error && (
          <p className="text-red-700 bg-red-100 px-4 py-2 rounded-lg mb-4 shadow">
            {error}
          </p>
        )}

        {loading && (
          <p className="text-blue-900 font-semibold mb-4 animate-pulse">
            Cargando...
          </p>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {fishes.map((fish) => (
            <div
              key={fish.fish_id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-5 border border-white/40 hover:shadow-xl transition"
            >
              {/* Imagen */}
              <div className="w-full h-44 flex items-center justify-center bg-gradient-to-tr from-sky-300 to-blue-400 rounded-xl shadow-inner">
                <Image
                  src={fish.img}
                  alt={fish.common_name}
                  width={300}
                  height={300}
                  className="object-contain h-36 drop-shadow-md"
                />
              </div>

              <h3 className="text-xl font-bold mt-4 text-blue-800">
                {fish.common_name}
              </h3>
              <p className="text-sm text-gray-700 italic">
                {fish.scientific_name}
              </p>

              {isAdmin && (
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setEditing(fish)}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow transition"
                  >
                    ✏️ Editar
                  </button>

                  <button
                    onClick={() => handleDelete(fish.fish_id)}
                    className="flex-1 px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg shadow transition"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODALES */}
      {openCreate && (
        <FishForm
          onClose={() => setOpenCreate(false)}
          onSubmit={handleCreate}
          submitLabel="Crear"
        />
      )}

      {editing && (
        <FishForm
          initialData={editing}
          onClose={() => setEditing(null)}
          onSubmit={handleUpdate}
          submitLabel="Actualizar"
        />
      )}
    </div>
  );
}
