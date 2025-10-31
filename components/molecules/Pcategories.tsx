"use client";
import React from "react";
import { useCategories } from "@/hooks/usePCategories";
import { PCategory } from "@/interfaces/pCategory";
import Link from "next/link";

function emojiForCategory(name: string) {
  const n = name.toLowerCase();
  if (n.includes("caña") || n.includes("cañas")) return "🎣";
  if (n.includes("carretes") || n.includes("carrete")) return "🧭";
  if (n.includes("señuelo") || n.includes("carnad")) return "🐟";
  if (n.includes("aliment") || n.includes("pez")) return "🍤";
  if (n.includes("filtro") || n.includes("filtros")) return "💧";
  if (n.includes("estanq") || n.includes("liner")) return "🏞️";
  if (n.includes("anzuel") || n.includes("terminal")) return "🪝";
  if (n.includes("accesor")) return "🔧";
  return "📦";
}

export default function Pcategories() {
  const { pCategories } = useCategories();

  const list: PCategory[] = Array.isArray(pCategories) && pCategories.length > 0
    ? pCategories
    : [
        { pcategory_id: 0, name: "Cañas" },
        { pcategory_id: 1, name: "Señuelos y carnadas" },
        { pcategory_id: 2, name: "Mi Pecera" },
      ]; 

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Nuestras Categorías
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {list.map((cat) => (
          <div
            key={cat.pcategory_id}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
          >
            <Link href={`/pCategories/${cat.pcategory_id}`}>
              <div className="text-4xl text-blue-600 mb-4">{emojiForCategory(cat.name)}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{cat.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}