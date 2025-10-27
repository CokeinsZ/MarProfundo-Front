"use client";

import { useState, useEffect } from "react";

export interface Product {
  product_id: number;
  name: string;
  description?: string;
  price: number;
  img?: string;
}

export function useProductDetail(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        // Simula retardo de red (ej. llamada fetch)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Producto ficticio de prueba
        const fakeProduct: Product = {
          product_id: parseInt(id) || 1,
          name: "Cámara Profesional Canon EOS R6",
          description:
            "Cámara mirrorless de fotograma completo con sensor CMOS de 20MP, grabación 4K y estabilizador de imagen integrado. Ideal para fotografía profesional y video.",
          price: 2299.99
        };

        setProduct(fakeProduct);
      } catch (error) {
        setErrorMsg("Error al cargar el producto" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { product, loading, errorMsg };
}
