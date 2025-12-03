"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useCategoryProducts } from "@/hooks/useCategoryProducts";
import { Product } from "@/interfaces/product";
import Link from "next/link";

type Props = { category: string };

export default function CategoryProducts({ category }: Props) {
  const { fetchData, productos, pCategory, loading, mensaje } =
    useCategoryProducts();

  // ✅ Corrección: volver a llamar si cambia la categoría
  useEffect(() => {
    if (!category) return;
    fetchData(category);
  }, [category]);

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Productos en {pCategory?.name}
      </h2>

      {loading && (
        <p className="text-center text-gray-400">Cargando productos...</p>
      )}
      {mensaje && <p className="text-center text-red-500">{mensaje}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {Array.isArray(productos) && productos.length > 0
          ? productos.map((p: Product) => (
              <Link
                key={p.product_id}
                href={`/products/${p.product_id}`}
                className="block"
              >
                <article className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-800 flex items-center justify-center">
                    {p.img ? (
                      <div className="w-full h-full p-4 flex items-center justify-center">
                        <Image
                          src={p.img}
                          alt={p.name}
                          width={320}
                          height={200}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-6xl">📦</div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold">{p.name}</h3>

                    {p.description && (
                      <p className="text-sm text-gray-300 mt-1">
                        {p.description}
                      </p>
                    )}

                    <p className="text-sm text-blue-400 font-bold mt-3">
                      ${Number(p.price).toFixed(2)}
                    </p>
                  </div>
                </article>
              </Link>
            ))
          : !loading && (
              <p className="col-span-full text-center text-gray-400">
                No hay productos en esta categoría.
              </p>
            )}
      </div>
    </div>
  );
}
