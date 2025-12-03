"use client";

import React, { useState } from "react";
import { Fish } from "@/interfaces/fish";

interface FishFormData {
  origin: string;
  size: string;
  weight: string;
  is_favorite: boolean;
}

export default function FishFormModal({
  fish,
  onClose,
  onSubmit,
}: {
  fish: Fish | null;
  onClose: () => void;
  onSubmit: (data: FishFormData) => void;
}) {
  const [origin, setOrigin] = useState("fishing");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
        {/* Título */}
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">
          Agregar {fish?.common_name} 🐟
        </h2>

        {/* Formulario */}
        <div className="space-y-5">
          {/* Origen */}
          <div>
            <label className="font-semibold text-gray-800 mb-1 block">
              Origen
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-lg bg-gray-50
                         focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-900"
            >
              <option value="fishing">Fishing</option>
              <option value="bought">Bought</option>
              <option value="trade">Trade</option>
            </select>
          </div>

          {/* Tamaño */}
          <div>
            <label className="font-semibold text-gray-800 mb-1 block">
              Tamaño
            </label>
            <input
              type="text"
              placeholder="Ej: 10cm, 2m..."
              className="w-full p-3 border border-gray-400 rounded-lg bg-gray-50
                         focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-900"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>

          {/* Peso */}
          <div>
            <label className="font-semibold text-gray-800 mb-1 block">
              Peso
            </label>
            <input
              type="text"
              placeholder="Ej: 500g, 8kg..."
              className="w-full p-3 border border-gray-400 rounded-lg bg-gray-50
                         focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-900"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* Favorito */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600 cursor-pointer"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />
            <label className="text-gray-900 text-lg cursor-pointer">
              Marcar como favorito ⭐
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancelar
          </button>

          <button
            onClick={() =>
              onSubmit({
                origin,
                size,
                weight,
                is_favorite: isFavorite,
              })
            }
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
