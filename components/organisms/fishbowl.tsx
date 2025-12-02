"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAqualog } from "@/hooks/useAqualog";
import { useFishBowlActions } from "@/hooks/useFishBowlActions";
import FishFormModal from "@/components/molecules/FishFormModal";

export default function Fishbowl() {
  const { user, fishesAcualog, fishesBowl, mensaje } = useAqualog();
  const { addFish, removeFish, loading, mensaje: msg } = useFishBowlActions();

  const [selectedFish, setSelectedFish] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-200 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          🐟 Mi Pecera
        </h1>

        {mensaje && <p className="text-center text-red-600 mb-4">{mensaje}</p>}
        {msg && <p className="text-center text-green-600 mb-4">{msg}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fishesAcualog.map(({ fish, isDiscovered }) => (
            <div
              key={fish.fish_id}
              className={`rounded-xl p-6 flex flex-col items-center text-center shadow-md border
              ${
                isDiscovered
                  ? "bg-white border-blue-300"
                  : "bg-gray-200 border-gray-400 opacity-60"
              }`}
            >
              <Image
                src={fish.img}
                alt={fish.common_name}
                width={200}
                height={150}
                className="object-contain mb-4"
              />

              <h2 className="text-xl font-bold text-blue-900">
                {fish.common_name}
              </h2>

              <p className="italic text-gray-700 mb-2">
                {fish.scientific_name}
              </p>

              {isDiscovered ? (
                <button
                  onClick={async () => {
                    
                  }}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                >
                  Eliminar
                </button>
              ) : (
                <button
                  onClick={() => setSelectedFish(fish)}
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                >
                  Agregar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedFish && user && (
        <FishFormModal
          fish={selectedFish}
          onClose={() => setSelectedFish(null)}
          onSubmit={async (formData) => {
            await addFish(user.user_id, selectedFish.fish_id, formData);
            setSelectedFish(null);
          }}
        />
      )}
    </div>
  );
}
