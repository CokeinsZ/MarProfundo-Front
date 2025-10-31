import { useEffect, useState } from "react";
import { PCategory } from "@/interfaces/pCategory";
import axios from "axios";

export function useCategories() {
  const [pCategories, setPCategories] = useState<PCategory[] | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        setMensaje("");

        const url = "http://back.mar-abierto.online/pcategories";
        const { data } = await axios.get(url, {
          data: {
            "max": 99,
            "page": 1
          }, 
          signal: controller.signal
        });

        const mapped: PCategory[] = data?.map((item: PCategory) => ({
          pcategory_id: Number(item?.pcategory_id ?? 0),
          name: String(item?.name ?? "Nombre"),
        }));

        setPCategories(mapped);
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
    fetchData();

    return () => controller.abort();
  }, []);

  return { pCategories, loading, mensaje };
}