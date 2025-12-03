"use client";
import { useEffect, useState } from "react";
import { Fish } from "@/interfaces/fish";
import axios from "axios";

export function useFishesPromo() {
  const [fishes, setFishes] = useState<Fish[] | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
        try {
        setLoading(true);
        setMensaje("");

        const url = `${process.env.NEXT_PUBLIC_API_URL}/fishes`;
        const { data } = await axios.get(url, { signal: controller.signal });

        console.log("Fishes data:", data);

        const mapped: Fish[] = data?.map((item: Fish) => ({
            fish_id: Number(item?.fish_id ?? 0),
            common_name: String(item?.common_name ?? "Nombre"),
            scientific_name: String(item?.scientific_name ?? "Nombre científico"),
            habitat: String(item?.habitat ?? "Habitat"),
            mean_size: Number(item?.mean_size ?? 0),
            mean_weight: Number(item?.mean_weight ?? 0),
            diet: String(item?.diet ?? "Dieta"),
            img: String(item?.img ?? "https://placehold.co/300x300"),
        }));

        setFishes(mapped);
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

  return { fishes, loading, mensaje };
}