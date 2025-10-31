import { useState } from "react";
import { Product } from "@/interfaces/product";
import axios from "axios";

export function useCategoryProducts() {
  const [productos, setProductos] = useState< Product[] | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (category: string) => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setMensaje("");

      const url = "http://back.mar-abierto.online/products/filter/category";
      const { data } = await axios.post(url, category, { signal: controller.signal });

      const mapped: Product[] = data?.map((item: Product) => ({
        product_id: Number(item?.product_id ?? 0),
        name: String(item?.name ?? "Nombre"),
        description: String(item?.description ?? "Descripción"),
        price: Number(item?.price ?? 0),
        img: String(item?.img ?? "https://placehold.co/300x300"),
      }));

      setProductos(mapped);
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      const message =
        (axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : (error as Error)?.message) || "Error desconocido";
      setMensaje("Error al registrar: " + message);
    } finally {
      setLoading(false);
      controller.abort();
    }
  };

  return { fetchData, productos, loading, mensaje };
}