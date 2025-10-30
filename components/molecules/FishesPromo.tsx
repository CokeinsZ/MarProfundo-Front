"use client";
import React from "react";
import Image from "next/image";
import { useFishesPromo } from "@/hooks/useFishesPromo";
import { Fish } from "@/interfaces/fish";

export default function FishesPromo() {
  const { fishes } = useFishesPromo();

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Peces por Atrapar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(fishes) && fishes.length > 0 ? (
          fishes.map((f: Fish) => (
            <div
              key={f.fish_id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-blue-100 flex items-center justify-center">
                {f.img ? (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={f.img}
                      alt={f.common_name}
                      width={240}
                      height={160}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-6xl">🐟</span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{f.common_name}</h3>
                <p className="text-sm text-gray-500 italic">{f.scientific_name}</p>
                <p className="text-sm text-gray-600 mt-2">Hábitat: {f.habitat}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No hay peces para mostrar.</p>
        )}
      </div>
    </div>
  );
}