"use client";
import React from "react";
import Image from "next/image";
import { useAqualog } from "@/hooks/useAqualog";

export default function Fishbowl() {

  const { fishesBowl, loading, mensaje } = useAqualog();

  const peces = fishesBowl ?? [];

  const maximo = 20;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-200 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          🐟 Mi Pecera
        </h1>

        {/* Contador */}
        <p className="text-center text-lg text-gray-700 mb-6">
          {peces.length} / {maximo} peces en tu pecera
        </p>

        {/* Acuario visual */}
        <div className="bg-white/80 border-4 border-blue-400 rounded-3xl shadow-xl p-8 relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {peces.map((pez, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-200 rounded-xl shadow-md p-4 hover:scale-105 transition-transform"
              >
                <Image
                  src={pez.img}
                  alt={pez.common_name}
                  width={240}
                  height={100}
                  className="object-contain"
                />
                <p className="font-semibold text-gray-800">{pez.common_name}</p>
                <p className="text-gray-600">📍 {pez.habitat}</p>
                <p className="text-gray-600">🌎 {pez.origin}</p>
                <p className="text-gray-600">💰 {pez.weight}</p>
                <p className="text-gray-600">📏 {pez.size}</p>
              </div>
            ))}

            {/* Espacios vacíos para llegar al máximo */}
            {Array.from({ length: maximo - peces.length }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-4"
              >
                <span className="text-gray-400">Vacío</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
