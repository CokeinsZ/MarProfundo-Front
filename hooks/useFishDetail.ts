"use client";
import { useEffect, useState } from "react";

export interface Fish {
  id: number;
  common_name: string;
  scientific_name: string;
  habitat: string;
  mean_size: number;
  mean_weight: number;
  diet: string;
  img: string;
}

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
        const res = await fetch(`https://back.mar-abierto.online/fishes/${id}`);

        if (!res.ok) {
          setErrorMsg("No se pudo obtener la información del pez.");
          setFish(null);
          return;
        }

        const data = await res.json();

        // Aseguramos formato consistente
        setFish({
          id: Number(data.id),
          common_name: String(data.common_name ?? "Pez"),
          scientific_name: String(data.scientific_name ?? "Nombre científico"),
          habitat: String(data.habitat ?? "Desconocido"),
          mean_size: Number(data.mean_size ?? 0),
          mean_weight: Number(data.mean_weight ?? 0),
          diet: String(data.diet ?? "Desconocida"),
          img: String(
            data.img ?? "https://placehold.co/600x400?text=Sin+Imagen+del+Pez"
          ),
        });
      } catch (error) {
        console.error("Error cargando pez:", error);
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
