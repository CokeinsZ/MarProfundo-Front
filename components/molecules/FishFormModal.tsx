"use client";
import React, { useState } from "react";

export default function FishFormModal({
  fish,
  onClose,
  onSubmit,
}: {
  fish: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const [origin, setOrigin] = useState("fishing");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
          Agregar {fish.common_name} 🐟
        </h2>

        {/* Formulario */}
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Origen</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option value="fishing">Fishing</option>
              <option value="bought">Bought</option>
              <option value="trade">Trade</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Tamaño</label>
            <input
              type="text"
              placeholder="Ej: 10cm, 2m..."
              className="w-full mt-1 p-2 border rounded-lg"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Peso</label>
            <input
              type="text"
              placeholder="Ej: 500g, 8kg..."
              className="w-full mt-1 p-2 border rounded-lg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />
            <label>Marcar como favorito ⭐</label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
