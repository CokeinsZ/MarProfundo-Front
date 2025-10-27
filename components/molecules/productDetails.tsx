"use client";
import React from "react";
import Image from "next/image";
import { useProductDetail } from "@/hooks/useProductDetail";

interface Props {
  id: string;
}

export default function ProductDetails({ id }: Props) {
  const { product, loading, errorMsg } = useProductDetail(id);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-500">{errorMsg}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>No se encontró el producto.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Image */}
      <div className="md:col-span-1 flex items-center justify-center">
        <div className="w-full h-64 md:h-72 relative rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          {product.img ? (
            <Image
              src={product.img}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="text-gray-500">Sin imagen</div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="md:col-span-2 flex flex-col gap-4">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">ID: {product.product_id}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-indigo-600">
              {formatCurrency(product.price)}
            </div>
            <div className="mt-2 flex items-center justify-end gap-2">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                En stock
              </span>
              <button
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md text-sm transition-all"
                onClick={() => {
                  alert(`${product.name} añadido al carrito`);
                }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </header>

        <section className="prose prose-sm max-w-none">
          <h2 className="sr-only">Descripción</h2>
          <p className="text-gray-700">{product.description ?? "No hay descripción disponible."}</p>
        </section>

        <footer className="mt-auto flex items-center justify-between">
          <div className="text-sm text-gray-500">¿Necesitas ayuda? Contacta soporte.</div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-all">
              Ver más
            </button>
            <button className="px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-sm transition-all">
              Comprar ahora
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}
