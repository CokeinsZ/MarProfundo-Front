"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/interfaces/product";

interface Props {
  id: string;
}

export default function ProductDetails({ id }: Props) {
  const { product, Warehouse_Product, hasStock, loading, errorMsg } = useProductDetail(id);
  const { addProducto } = useCart();
  const [cantidad, setCantidad] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const stock = Warehouse_Product?.quantity ?? 0;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value);

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

  const handleAddToCart = () => {
    if (!product) return;
    if (cantidad <= 0) return;
    if (stock <= 0) return;

    addProducto(product as Product, product.img, cantidad, stock);

    setAdded(true);
    // feedback visual breve
    setTimeout(() => setAdded(false), 1500);
  };
  const increase = () => {
    setCantidad((c) => Math.min(c + 1, stock));
  };

  const decrease = () => {
    setCantidad((c) => Math.max(1, c - 1));
  };

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
              {hasStock && stock > 0 ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  En stock ({stock})
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
                  No disponible
                </span>
              )}
            </div>
          </div>
        </header>

        <section className="prose prose-sm max-w-none">
          <h2 className="sr-only">Descripción</h2>
          <p className="text-gray-700">{product.description ?? "No hay descripción disponible."}</p>
        </section>

        {/* Cantidad selector */}
        <div className="flex items-center gap-4 mt-2">
          <div className="text-sm text-gray-600">Cantidad</div>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={decrease}
              aria-label="Disminuir cantidad"
              className="px-3 py-2 disabled:opacity-50"
              disabled={cantidad <= 1}
            >
              −
            </button>
            <div className="px-4 py-2 min-w-[48px] text-center">{cantidad}</div>
            <button
              onClick={increase}
              aria-label="Aumentar cantidad"
              className="px-3 py-2 disabled:opacity-50"
              disabled={cantidad >= stock}
            >
              +
            </button>
          </div>

          <div className="text-sm text-gray-500">
            {stock > 0 ? `${stock} disponibles` : "Sin stock"}
          </div>
        </div>

        <footer className="mt-auto flex items-center justify-between">
          <div className="text-sm text-gray-500">¿Necesitas ayuda? Contacta soporte.</div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-all">
              Ver más
            </button>
            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md text-sm transition-all flex items-center gap-2 ${
                stock <= 0 ? "opacity-50 cursor-not-allowed hover:bg-indigo-600" : ""
              }`}
              disabled={stock <= 0}
            >
              {added ? "Añadido ✓" : "Añadir al carrito"}
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}
