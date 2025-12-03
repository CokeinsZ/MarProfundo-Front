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

        const product_url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
        const productResp = await axios.get(product_url, { signal: controller.signal });
        const data = productResp.data ?? {};
        

        const mapped: Product = {
          product_id: data.product_id,
          name: data.name,
          description: data.description,
          price: data.price,
          img: data.img,
          created_at: data.created_at,
          updated_at: data.updated_at
        };

        setProduct(mapped);
        
        // Calcular stock total desde warehouses incluidos en la respuesta
        const warehouses = data.warehouses || [];
        const totalQuantity = warehouses.reduce(
          (sum: number, wh: any) => sum + (Number(wh.stock) || 0),
          0
        );

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
