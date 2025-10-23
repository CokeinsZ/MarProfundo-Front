"use client";

import React from "react";
import Image from "next/image";
import { useCart, Producto } from "@/hooks/useCart";

export default function Cart() {
  const { productos, updateCantidad, removeProducto, clear } = useCart();

  const incrementar = (p: Producto) => updateCantidad(p.id, p.cantidad + 1);
  const decrementar = (p: Producto) => updateCantidad(p.id, Math.max(1, p.cantidad - 1));

  const total = productos.reduce((s, p) => s + p.precio * p.cantidad, 0);

  if (!productos || productos.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Tu carrito</h2>
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center border">
          <p className="mb-4 text-lg text-gray-600">Tu carrito está vacío.</p>
          <button
            onClick={() => clear()}
            className="mt-2 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg shadow-sm"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Tu carrito</h2>

      <div className="space-y-6">
        {productos.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-6 bg-white border rounded-2xl p-6 shadow-md"
          >
            <div className="w-32 h-32 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-inner">
              {p.imagen ? (
                <Image
                  src={p.imagen}
                  alt={p.nombre}
                  fill
                  sizes="(max-width: 640px) 96px, 128px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">No image</div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">{p.nombre}</h3>
                  <p className="text-sm text-gray-500">Precio unitario: <span className="font-medium text-gray-700">${p.precio.toFixed(2)}</span></p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-lg text-gray-800">${(p.precio * p.cantidad).toFixed(2)}</p>
                  <button
                    onClick={() => removeProducto(p.id)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                    aria-label={`Eliminar ${p.nombre}`}
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => decrementar(p)}
                  className="w-10 h-10 flex items-center justify-center border rounded-lg text-lg hover:bg-gray-50"
                  aria-label={`Disminuir cantidad de ${p.nombre}`}
                >
                  -
                </button>

                <div className="w-12 text-center font-medium text-lg">{p.cantidad}</div>

                <button
                  onClick={() => incrementar(p)}
                  className="w-10 h-10 flex items-center justify-center border rounded-lg text-lg hover:bg-gray-50"
                  aria-label={`Aumentar cantidad de ${p.nombre}`}
                >
                  +
                </button>

                <div className="ml-6 text-sm text-gray-600">Subtotal: <span className="font-semibold text-gray-800">${(p.precio * p.cantidad).toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => clear()}
            className="px-5 py-3 border rounded-lg text-sm bg-white hover:bg-gray-50"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="w-full md:w-auto bg-gradient-to-r from-white to-gray-50 border rounded-2xl p-6 shadow-lg">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-3xl font-extrabold text-gray-900">${total.toFixed(2)}</p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => alert('Ir a checkout (implementa la lógica)')}
              className="flex-1 md:flex-initial px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow"
            >
              Ir a pagar
            </button>

            <button
              onClick={() => alert('Seguir comprando')}
              className="hidden md:inline-block px-6 py-3 border rounded-lg text-sm"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
