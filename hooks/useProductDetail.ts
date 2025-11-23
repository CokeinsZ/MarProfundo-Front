"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/interfaces/product";

export function useProductDetail(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        if (!id) {
          setProduct(null);
          setErrorMsg("ID de producto inválido");
          return;
        }

        const url = `https://back.mar-abierto.online/products/${id}`;
        const { data } = await axios.get(url, { signal: controller.signal });

        // Intento de mapeo flexible por si la API cambia nombres
        const mapped: Product = {
          product_id:
            Number(data?.product_id ?? data?.id ?? id) || parseInt(id, 10) || 0,
          name: String(data?.name ?? data?.title ?? "Producto"),
          description: data?.description ?? data?.details ?? "",
          price: Number(data?.price ?? data?.amount ?? 0),
          img: data?.img ?? data?.image ?? data?.thumbnail ?? undefined
        };

        setProduct(mapped);
      } catch (error: unknown) {
        if (axios.isCancel(error)) return; // solicitud cancelada
        const message =
          (axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : (error as Error)?.message) || "Error desconocido";
        setErrorMsg("Error al cargar el producto: " + message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };


    fetchData();

    return () => controller.abort();
  }, [id]);

  return { product, loading, errorMsg };
}
