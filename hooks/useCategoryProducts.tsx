import { useState } from "react";
import { Product } from "@/interfaces/product";
import axios from "axios";
import { PCategory } from "@/interfaces/pCategory";

export function useCategoryProducts() {
  const [productos, setProductos] = useState< Product[] | null>(null);
  const [pCategory, setPCategory] = useState<PCategory | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (category: string) => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setMensaje("");

      const url = `${process.env.NEXT_PUBLIC_API_URL}/product-pcategory/by-pcategory/${category}`;
      const { data } = await axios.get(url, { signal: controller.signal });

      console.log("Category Products data:", data);

      const mapped: Product[] = data?.products.map((item: Product) => ({
        product_id: Number(item?.product_id ?? 0),
        name: String(item?.name ?? "Nombre"),
        description: String(item?.description ?? "Descripción"),
        price: Number(item?.price ?? 0),
        img: String(item?.img ?? "https://placehold.co/300x300"),
      }));

      setProductos(mapped);
      setPCategory({
        pcategory_id: data?.category.pcategory_id,
        name: data?.category.name,
      });
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

  return { fetchData, productos, pCategory, loading, mensaje };
}