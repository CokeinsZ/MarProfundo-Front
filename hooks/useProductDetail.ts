"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product, Warehouse_Product} from "@/interfaces/product";

export function useProductDetail(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [Warehouse_Product, setWarehouse_Product] = useState<Warehouse_Product | null>(null);
  const [hasStock, setHasStock] = useState<boolean>(false);
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

        const product_url = `https://back.mar-abierto.online/products/${id}`;
        const productResp = await axios.get(product_url, { signal: controller.signal });
        const data = productResp.data ?? {};
        

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
        const warehousesToQuery = [1,2 ]
        const fetches = warehousesToQuery.map((wid) =>
          axios
            .get(`https://back.mar-abierto.online/warehouse-product/${wid}`, { signal: controller.signal })
            .then((r) => ({ wid, data: r.data }))
            .catch((e) => {
              return { wid, data: [] };
            })
        );
        const results = await Promise.all(fetches);

        const perWarehouse: Warehouse_Product[] = results.map(({ wid, data }: any) => {
          const arr = Array.isArray(data) ? data : [];
          const normalized = arr.map((it: any) => ({
            warehouse_id: Number(it.warehouse_id ?? it.warehouseId ?? wid ?? 0),
            product_id: Number(it.product_id ?? it.productId ?? it.id ?? 0),
            quantity: Number(it.quantity ?? it.qty ?? 0)
          }));

          const found = normalized.find((n) => n.product_id === mapped.product_id);
          return {
            warehouse_id: wid,
            product_id: mapped.product_id,
            quantity: found ? (Number(found.quantity) || 0) : 0
          };
        });

        const totalQuantity = perWarehouse.reduce((acc, cur) => acc + (Number(cur.quantity) || 0), 0);

        const totalWarehouseProduct: Warehouse_Product = {
          warehouse_id: 0 as unknown as number,
          product_id: mapped.product_id,
          quantity: totalQuantity
        } as Warehouse_Product;

        setWarehouse_Product(totalWarehouseProduct);
        setHasStock(totalQuantity > 0);

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

  return { product, Warehouse_Product, hasStock, loading, errorMsg };
}
