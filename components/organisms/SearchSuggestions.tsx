"use client";

import Link from "next/link";
import { useFilterName } from "@/hooks/useFIlterName";

interface SearchResultsProps {
  query: string;
}

export default function SearchSuggestions({ query }: SearchResultsProps) {
  const { data, loading } = useFilterName(query);
  

  if (loading)
    return <div className="p-4 text-center text-gray-400">Buscando...</div>;

  if (!query.trim())
    return (
      <div className="p-4 text-center text-gray-500">
        Escribe algo para buscar
      </div>
    );

  if (data.length === 0)
    return (
      <div className="p-4 text-center text-gray-400">
        No se encontraron resultados
      </div>
    );

  return (
    <div className="p-4 space-y-6">
      {/* 🐟 PECES */}
      {data.some((d) => d.tipo === "pez") && (
        <div>
          <h3 className="text-sm font-semibold mb-3 text-blue-300">Peces</h3>

          <ul className="space-y-2">
            {data
              .filter((d) => d.tipo === "pez")
              .map((pez) => (
                <li
                  key={`fish-${pez.id}`}
                  className="hover:bg-gray-800 rounded-lg p-2 transition"
                >
                  <Link
                    href={`/fishbowl/${pez.id}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={pez.img}
                      alt={pez.common_name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-white font-medium">
                        {pez.common_name}
                      </p>
                      <p className="text-gray-400 text-xs italic">
                        {pez.scientific_name}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* 🛍️ PRODUCTOS */}
      {data.some((d) => d.tipo === "producto") && (
        <div>
          <h3 className="text-sm font-semibold mb-3 text-green-300">
            Productos
          </h3>

          <ul className="space-y-2">
            {data
              .filter((d) => d.tipo === "producto")
              .map((prod) => (
                <li
                  key={`prod-${prod.id}`}
                  className="hover:bg-gray-800 rounded-lg p-2 transition"
                >
                  <Link
                    href={`/products/${prod.id}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-white font-medium">{prod.name}</p>
                      <p className="text-gray-400 text-xs">
                        ${prod.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
