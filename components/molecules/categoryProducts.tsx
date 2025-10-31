"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useCategoryProducts } from "@/hooks/useCategoryProducts";
import { Product } from "@/interfaces/product";

type Props = { category: string };

export default function CategoryProducts({ category }: Props) {
  const { fetchData, productos, pCategory, loading, mensaje } = useCategoryProducts();

  useEffect(() => {
    if (!category) return;
    fetchData(category);
  }, []);

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Productos en {pCategory?.name}
      </h2>

      {loading && <p className="text-center text-gray-600">Cargando productos...</p>}
      {mensaje && <p className="text-center text-red-600">{mensaje}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {Array.isArray(productos) && productos.length > 0 ? (
          productos.map((p: Product) => (
            <article
              key={p.product_id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-blue-50 flex items-center justify-center">
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
                <h3 className="font-semibold text-gray-800">{p.name}</h3>
                {p.description && <p className="text-sm text-gray-500 mt-1">{p.description}</p>}
                <p className="text-sm text-blue-700 font-bold mt-3">${Number(p.price).toFixed(2)}</p>
              </div>
            </article>
          ))
        ) : (
          !loading && <p className="col-span-full text-center text-gray-500">No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}