"use client";
import React from "react";
import Image from "next/image";
import { useAqualog } from "@/hooks/useAqualog";
export default function Aqualog() {

  const { fishesAcualog, loading, mensaje } = useAqualog();
  const peces = fishesAcualog ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-6">
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
                      <Image
                        src={pez.fish.img}
                        alt={pez.fish.common_name}
                        width={240}
                        height={100}
                        className="object-contain"
                      />
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
                      <p className="text-gray-600 italic">Falta por descubrir</p>
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
