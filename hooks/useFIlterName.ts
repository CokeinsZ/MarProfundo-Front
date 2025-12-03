"use client";

import { useEffect, useState } from "react";

export type ResultadoBusqueda =
  | {
      tipo: "producto";
      id: number;
      name: string;
      price: number;
      img: string;
      name_display: string;
    }
  | {
      tipo: "pez";
      id: number;
      common_name: string;
      scientific_name: string;
      img: string;
      name_display: string;
    };

export const useFilterName = (query: string) => {
  const [data, setData] = useState<ResultadoBusqueda[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setData([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);

      const normalized = query
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      try {
        const [productsRes, fishesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/fishes`),
        ]);

        const products = await productsRes.json();
        const fishes = await fishesRes.json();

        const filteredProducts: ResultadoBusqueda[] = products
          .filter((p: any) => p.name?.toLowerCase().includes(normalized))
          .slice(0, 6)
          .map((p: any) => ({
            tipo: "producto",
            id: Number(p.product_id),               // 🔥 FIX CORRECTO
            name: String(p.name ?? "Producto"),
            price: Number(p.price ?? 0),
            img: String(p.img ?? "https://placehold.co/300x300"),
            name_display: String(p.name ?? "Producto"),
          }));

        const filteredFishes: ResultadoBusqueda[] = fishes
          .filter((f: any) => f.common_name?.toLowerCase().includes(normalized))
          .slice(0, 6)
          .map((f: any) => ({
            tipo: "pez",
            id: Number(f.fish_id), // 🔥 FIX CORRECTO
            common_name: String(f.common_name ?? "Pez"),
            scientific_name: String(f.scientific_name ?? "Nombre científico"),
            img: String(f.img ?? "https://placehold.co/300x300"),
            name_display: String(f.common_name ?? "Pez"),
          }));

        setData([...filteredProducts, ...filteredFishes]);
      } catch (error) {
        console.error("Error buscando:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 400);
    return () => clearTimeout(debounce);
  }, [query]);

  return { data, loading };
};

