"use client";

import React from "react";
import { CartItem } from "@/interfaces/product";
import Link from "next/link";

type ResumeGridProps = {
  title: string;
  action: string;
  ruta: string;
  productos: CartItem[];
  total?: number;
  onContinuar?: () => void;
  disabled?: boolean;
};

export default function ResumeGrid({
  title,
  action,
  ruta,
  productos,
  total: totalProp,
  onContinuar,
  disabled = false,
}: ResumeGridProps) {
  const total = typeof totalProp === "number" ? totalProp : productos.reduce((acc, p) => acc + p.price * p.cantidad, 0);

  return (
    <div className="w-full md:w-80 text-blue-900">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-blue-800">Resumen de la {title}</h2>
      </div>

      <div className="bg-white rounded-xl shadow p-4 relative text-blue-900 border border-blue-200">
        <div className="flex justify-between font-semibold">
          <span>Productos ({productos.length})</span>
          <span>${total.toLocaleString()}</span>
        </div>

        <div className="flex justify-between font-bold border-t pt-3 mt-3 text-blue-900">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </div>

        {disabled ? (
          <button className="block mt-4 w-full bg-blue-300 text-center text-white py-2 rounded cursor-not-allowed" disabled>
            {action}
          </button>
        ) : (
          <Link href={ruta} onClick={() => onContinuar?.()} className="block mt-4 w-full bg-blue-900 text-center text-white py-2 rounded hover:bg-blue-800 transition-colors">
            {action}
          </Link>
        )}
      </div>
    </div>
  );
}
