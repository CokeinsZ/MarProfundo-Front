import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/interfaces/product";

interface CartItem extends Product {
  cantidad: number;
  imagen?: string;
  stock: number;
}

interface CartState {
  productos: CartItem[];
  addProducto: (p: Product, imagen: string | undefined, cantidad: number, stock: number) => void;
  removeProducto: (product_id: number) => void;
  updateCantidad: (product_id: number, cantidad: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      productos: [],

      addProducto: (p, imagen, cantidad, stock) =>
        set((state) => {
          if (cantidad <= 0) return state;

          const existente = state.productos.find(
            (x) => x.product_id === p.product_id
          );

          if (existente) {
            const nuevaCantidad = Math.min(existente.cantidad + cantidad, existente.stock);
            return {
              productos: state.productos.map((x) =>
                x.product_id === p.product_id ? { ...x, cantidad: nuevaCantidad } : x
              ),
            };
          }

          const cantidadInicial = Math.min(cantidad, stock);

          return {
            productos: [
              ...state.productos,
              { ...p, cantidad: cantidadInicial, imagen, stock },
            ],
          };
        }),

      removeProducto: (product_id) =>
        set((state) => ({
          productos: state.productos.filter((x) => x.product_id !== product_id),
        })),

      updateCantidad: (product_id, cantidad) =>
        set((state) => ({
          productos: state.productos
            .map((x) => {
              if (x.product_id !== product_id) return x;
              const nueva = Math.min(Math.max(0, cantidad), x.stock);
              return { ...x, cantidad: nueva };
            })
            .filter((x) => x.cantidad > 0), 
        })),

      clear: () => set({ productos: [] }),
    }),
    {
      name: "cart-products",
    }
  )
);
