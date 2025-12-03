"use client";
import { useEffect, useState } from "react";
import { Fish } from "@/interfaces/fish";

export const useFishDetail = (id: string) => {
  const [fish, setFish] = useState<Fish | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchFish = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/fishes/${id}`
        );

        if (!res.ok) {
          setErrorMsg("No se pudo obtener la información del pez.");
          setFish(null);
          return;
        }

        const data = await res.json();

        // Aseguramos formato consistente
        setFish({
          fish_id: Number(data.fish_id),
          common_name: String(data.common_name ?? "Pez"),
          scientific_name: String(data.scientific_name ?? "Nombre científico"),
          habitat: String(data.habitat ?? "Desconocido"),
          mean_size: String(data.mean_size ?? "0"),
          mean_weight: String(data.mean_weight ?? "0"),
          diet: String(data.diet ?? "Desconocida"),
          img: String(
            data.img ?? "https://placehold.co/600x400?text=Sin+Imagen+del+Pez"
          ),
        });
      } catch (err: unknown) {
        console.error("Error cargando pez:", err);
        setErrorMsg("Hubo un error al obtener la información del pez.");
      } finally {
        setLoading(false);
      }
    };

    fetchFish();
  }, [id]);

  return {
    fish,
    loading,
    errorMsg,
  };
};
