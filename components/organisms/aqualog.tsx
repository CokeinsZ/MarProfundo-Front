"use client";
import React from "react";
import Image from "next/image";
import { useAqualog } from "@/hooks/useAqualog";

export default function Aqualog() {
  const { user, fishesAcualog, loading, mensaje } = useAqualog();
  const peces = fishesAcualog ?? [];

  const total = peces.length;
  const descubiertos = peces.filter((p) => p.isDiscovered).length;
  const progreso = total > 0 ? Math.round((descubiertos / total) * 100) : 0;

  const nivel = Math.floor(descubiertos / 5) + 1;

  const logros = [
    { id: 1, nombre: "Primer pez", unlocked: descubiertos >= 1, icon: "🐟" },
    {
      id: 2,
      nombre: "Explorador Marino",
      unlocked: descubiertos >= 10,
      icon: "🌊",
    },
    {
      id: 3,
      nombre: "Biólogo Amateur",
      unlocked: descubiertos >= 20,
      icon: "🔬",
    },
    {
      id: 4,
      nombre: "Maestro Acuático",
      unlocked: descubiertos >= 40,
      icon: "🏆",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-6">
        {/* PERFIL */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-blue-200">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/9263/9263706.png"
                  alt="User Avatar"
                  width={200}
                  height={200}
                  className="object-contain w-full h-full"
                />
              </div>

              <p className="text-blue-900 font-bold text-lg mt-2">
                {user?.email || "Usuario"}
              </p>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Perfil de Explorador
              </h2>

              <p className="text-lg text-gray-700 mb-2">
                🎯 <strong>Nivel:</strong> {nivel}
              </p>

              <p className="text-lg text-gray-700">
                🐠 <strong>Peces descubiertos:</strong> {descubiertos} / {total}
              </p>

              <div className="w-full bg-gray-300 rounded-full h-4 mt-4">
                <div
                  style={{ width: `${progreso}%` }}
                  className="h-4 rounded-full bg-blue-500 transition-all"
                ></div>
              </div>

              <p className="text-right text-sm text-blue-700 font-bold mt-1">
                {progreso}% completado
              </p>

              <h3 className="text-xl font-bold text-blue-800 mt-6 mb-2">
                🏅 Logros
              </h3>

              <div className="flex flex-wrap gap-3">
                {logros.map((logro) => (
                  <div
                    key={logro.id}
                    className={`px-4 py-2 rounded-full border shadow-sm flex items-center gap-2 ${
                      logro.unlocked
                        ? "bg-blue-100 border-blue-400 text-blue-800"
                        : "bg-gray-200 border-gray-400 text-gray-500 opacity-60"
                    }`}
                  >
                    <span className="text-2xl">{logro.icon}</span>
                    <span className="text-sm font-semibold">
                      {logro.nombre}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LISTA DE PECES */}
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
          🐟 Aqualog
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {peces.map((pez, i) => {
            const discovered = pez.isDiscovered;

            return (
              <div
                key={i}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform border-4 ${
                  discovered ? "border-blue-300" : "border-gray-400 opacity-70"
                }`}
              >

                <div className="h-40 flex items-center justify-center bg-gradient-to-tr from-blue-200 to-blue-400">
                  <div className="w-full h-full flex items-center justify-center p-4">
                    {discovered ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image
                          src={pez.fish.img}
                          alt={pez.fish.common_name}
                          width={300}
                          height={300}
                          className="
                            object-contain
                            w-auto
                            h-full
                            max-h-28
                          "
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-700">
                        <span className="text-6xl font-bold">?</span>
                      </div>
                    )}
                  </div>
                </div>


                <div className="p-4 text-center">
                  {discovered ? (
                    <>
                      <h2 className="text-xl font-bold text-gray-800">
                        {pez.fish.common_name}
                      </h2>
                      <p className="text-gray-600">📍 {pez.fish.habitat}</p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-800">???</h2>
                      <p className="text-gray-600 italic">
                        Falta por descubrir
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
