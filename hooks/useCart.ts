import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface Producto {
    
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string; 
}

interface CartState {
  productos: Producto[];
  addProducto: (p: Producto, imagen : string) => void;
  removeProducto: (id: number) => void;
  updateCantidad: (id: number, cantidad: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      productos: [],
      addProducto: (p, imagen) =>
        set((state) => {
          const existente = state.productos.find((x) => x.id === p.id);
          if (existente) {
            return {
              productos: state.productos.map((x) =>
                x.id === p.id ? { ...x, cantidad: x.cantidad + 1 } : x     ),
            };
          }
          return { productos: [...state.productos, { ...p, imagen }] };
        }),
      removeProducto: (id) =>
        set((state) => ({
          productos: state.productos.filter((x) => x.id !== id),
        })),
      updateCantidad: (id, cantidad) =>
        set((state) => ({
          productos: state.productos.map((x) =>
            x.id === id ? { ...x, cantidad } : x
          ),
        })),
      clear: () => set({ productos: [] }),
    }),
    {
      name: "cart-products",
    }
  )
);
