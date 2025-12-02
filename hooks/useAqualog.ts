"use client";
import { useEffect, useMemo, useState } from "react";
import { UserFish, Fish } from "@/interfaces/fish";
import axios from "axios";
import { useUserFromToken } from "./useUserFromToken";
import { useFishesPromo } from "./useFishesPromo";

interface FishesAcualog {
  fish: Fish;
  isDiscovered: boolean;
}

export interface FishBowlItem {
  fish_id: number;
  common_name: string;
  habitat: string;
  img: string;

  origin: string;
  size?: string;
  weight?: string;
}

export function useAqualog() {
  const [userFishes, setUserFishes] = useState<UserFish[] | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUserFromToken();
  const { fishes } = useFishesPromo();

  const resolveFishId = (fish: Fish) => {
    const maybe = (fish as any).id ?? (fish as any).fish_id ?? (fish as any).fishId;
    return Number(maybe ?? NaN);
  };

  useEffect(() => {
    if (!user?.user_id) {
      setUserFishes(null);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setMensaje("");

        const url = `https://back.mar-abierto.online/user-fish/user/${user.user_id}`;
        const { data } = await axios.get(url, { signal: controller.signal });

        const mapped: UserFish[] = (data ?? []).map((item: any) => ({
          user_id: Number(item?.user_id ?? 0),
          fish_id: Number(item?.fish_id ?? item?.fishId ?? 0),
          origin: String(item?.origin ?? "fishing"),
          size: String(item?.size ?? "0"),
          weight: String(item?.weight ?? "0"),
          is_favorite: Boolean(item?.is_favorite ?? item?.isFavorite ?? false),
        }));

        setUserFishes(mapped);
      } catch (error: unknown) {
        if (axios.isCancel(error)) return;
        const message =
          (axios.isAxiosError(error)
            ? (error.response?.data?.message as string) || error.message
            : (error as Error)?.message) || "Error desconocido";
        setMensaje("Error al obtener peces: " + message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [user?.user_id]);

  const fishesAcualog: FishesAcualog[] = useMemo(() => {
    if (!Array.isArray(fishes) || fishes.length === 0) return [];

    const owned = new Set<number>();
    if (Array.isArray(userFishes)) {
      for (const uf of userFishes) {
        const idNum = Number(uf.fish_id ?? 0);
        if (!Number.isNaN(idNum)) owned.add(idNum);
      }
    }

    return fishes.map((fish) => {
      const fid = resolveFishId(fish);
      const isDiscovered = !Number.isNaN(fid) && owned.has(fid);
      return { fish, isDiscovered };
    });
  }, [fishes, userFishes]);

  const fishesBowl: FishBowlItem[] = useMemo(() => {
    if (!userFishes || !fishes) return [];

    return userFishes
      .map((uf) => {
        const fishData = fishes.find((f) => resolveFishId(f) === uf.fish_id);
        if (!fishData) return null;

        return {
          fish_id: uf.fish_id,
          common_name: fishData.common_name,
          habitat: fishData.habitat,
          img: fishData.img,

          origin: uf.origin,
          size: uf.size,
          weight: uf.weight,
        } as FishBowlItem;
      })
      .filter(Boolean) as FishBowlItem[];
  }, [userFishes, fishes]);

  return { user, loading, mensaje, fishesAcualog , fishesBowl };
}
