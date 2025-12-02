import { act, renderHook } from '@testing-library/react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/interfaces/product';

// Mock de localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

// Producto de prueba
const mockProduct: Product = {
  product_id: 1,
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  img: '/test-image.jpg',
  pcategory_id: 1,
  created_at: new Date(),
  updated_at: new Date(),
};

const mockProduct2: Product = {
  product_id: 2,
  name: 'Test Product 2',
  description: 'Test Description 2',
  price: 49.99,
  img: '/test-image2.jpg',
  pcategory_id: 2,
  created_at: new Date(),
  updated_at: new Date(),
};

describe('useCart Hook', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    
    // Resetear el store a estado inicial
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.clear();
    });
  });

  describe('initial state', () => {
    it('should have empty productos array initially', () => {
      const { result } = renderHook(() => useCart());
      
      expect(result.current.productos).toEqual([]);
      expect(result.current.productos).toHaveLength(0);
    });
  });

  describe('addProducto', () => {
    it('should add a new product to cart', () => {
      const { result } = renderHook(() => useCart());
      
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
      });
      
      expect(result.current.productos).toHaveLength(1);
      expect(result.current.productos[0]).toEqual({
        ...mockProduct,
        cantidad: 2,
        imagen: mockProduct.img,
        stock: 10,
      });
    });

    it('should not add product when cantidad is 0 or negative', () => {
      const { result } = renderHook(() => useCart());
      
      // Caso cantidad 0
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 0, 10);
      });
      
      expect(result.current.productos).toHaveLength(0);
      
      // Caso cantidad negativa
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, -1, 10);
      });
      
      expect(result.current.productos).toHaveLength(0);
    });

    it('should update quantity when adding existing product', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto por primera vez
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
      });
      
      expect(result.current.productos[0].cantidad).toBe(2);
      
      // Agregar más del mismo producto
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 3, 10);
      });
      
      expect(result.current.productos).toHaveLength(1);
      expect(result.current.productos[0].cantidad).toBe(5);
    });

    it('should respect stock limit when adding existing product', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto con stock 5
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 3, 5);
      });
      
      expect(result.current.productos[0].cantidad).toBe(3);
      
      // Intentar agregar más del stock disponible
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 5, 5);
      });
      
      // No debería exceder el stock total (5)
      expect(result.current.productos[0].cantidad).toBe(5);
    });

    it('should respect stock limit when adding new product', () => {
      const { result } = renderHook(() => useCart());
      
      // Intentar agregar más cantidad que el stock disponible
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 10, 5);
      });
      
      // Debería limitar a stock (5)
      expect(result.current.productos[0].cantidad).toBe(5);
    });

    it('should handle undefined imagen parameter', () => {
      const { result } = renderHook(() => useCart());
      
      act(() => {
        result.current.addProducto(mockProduct, undefined, 1, 10);
      });
      
      expect(result.current.productos).toHaveLength(1);
      // La propiedad 'imagen' debe ser undefined
      expect(result.current.productos[0].imagen).toBeUndefined();
    });

    it('should add multiple different products', () => {
      const { result } = renderHook(() => useCart());
      
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
        result.current.addProducto(mockProduct2, mockProduct2.img, 1, 5);
      });
      
      expect(result.current.productos).toHaveLength(2);
      expect(result.current.productos[0].product_id).toBe(1);
      expect(result.current.productos[1].product_id).toBe(2);
    });
  });

  describe('removeProducto', () => {
    it('should remove product from cart', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar dos productos
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
        result.current.addProducto(mockProduct2, mockProduct2.img, 1, 5);
      });
      
      expect(result.current.productos).toHaveLength(2);
      
      // Remover el primer producto
      act(() => {
        result.current.removeProducto(1);
      });
      
      expect(result.current.productos).toHaveLength(1);
      expect(result.current.productos[0].product_id).toBe(2);
    });

    it('should do nothing when removing non-existent product', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar un producto
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
      });
      
      expect(result.current.productos).toHaveLength(1);
      
      // Intentar remover producto que no existe
      act(() => {
        result.current.removeProducto(999);
      });
      
      expect(result.current.productos).toHaveLength(1);
      expect(result.current.productos[0].product_id).toBe(1);
    });

    it('should remove correct product by product_id', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar varios productos
      const products = [
        { ...mockProduct, product_id: 1 },
        { ...mockProduct2, product_id: 2 },
        { ...mockProduct, product_id: 3, name: 'Product 3' },
      ];
      
      act(() => {
        products.forEach(p => {
          result.current.addProducto(p, p.img, 1, 10);
        });
      });
      
      expect(result.current.productos).toHaveLength(3);
      
      // Remover solo el producto con id 2
      act(() => {
        result.current.removeProducto(2);
      });
      
      expect(result.current.productos).toHaveLength(2);
      expect(result.current.productos.map(p => p.product_id)).toEqual([1, 3]);
    });
  });

  describe('updateCantidad', () => {
    it('should update quantity of existing product', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
      });
      
      expect(result.current.productos[0].cantidad).toBe(2);
      
      // Actualizar cantidad
      act(() => {
        result.current.updateCantidad(1, 5);
      });
      
      expect(result.current.productos[0].cantidad).toBe(5);
    });

    it('should respect stock limit when updating quantity', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto con stock 10
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
      });
      
      // Intentar actualizar a cantidad mayor que stock
      act(() => {
        result.current.updateCantidad(1, 15);
      });
      
      // No debería exceder el stock (10)
      expect(result.current.productos[0].cantidad).toBe(10);
    });

    it('should not update quantity to negative value', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
      });
      
      // Intentar actualizar a cantidad negativa
      act(() => {
        result.current.updateCantidad(1, -5);
      });
      
      // Debería limitar a 0 y luego ser removido por el filter
      expect(result.current.productos).toHaveLength(0);
    });

    it('should remove product when quantity is updated to 0', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
      });
      
      expect(result.current.productos).toHaveLength(1);
      
      // Actualizar cantidad a 0
      act(() => {
        result.current.updateCantidad(1, 0);
      });
      
      // Debería ser removido del carrito
      expect(result.current.productos).toHaveLength(0);
    });

    it('should remove product when quantity is updated to less than 1 (negative)', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
      });
      
      // Actualizar cantidad a -1 (debería convertirse a 0 y luego ser removido)
      act(() => {
        result.current.updateCantidad(1, -1);
      });
      
      // Debería ser removido del carrito
      expect(result.current.productos).toHaveLength(0);
    });

    it('should do nothing when updating non-existent product', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
      });
      
      const initialState = [...result.current.productos];
      
      // Intentar actualizar producto que no existe
      act(() => {
        result.current.updateCantidad(999, 5);
      });
      
      // No debería cambiar nada
      expect(result.current.productos).toEqual(initialState);
    });

    it('should handle multiple products when updating quantity', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar dos productos
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
        result.current.addProducto(mockProduct2, mockProduct2.img, 1, 5);
      });
      
      // Actualizar solo el primer producto
      act(() => {
        result.current.updateCantidad(1, 5);
      });
      
      expect(result.current.productos[0].cantidad).toBe(5);
      expect(result.current.productos[1].cantidad).toBe(1);
    });
  });

  describe('clear', () => {
    it('should clear all products from cart', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar varios productos
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10);
        result.current.addProducto(mockProduct2, mockProduct2.img, 1, 5);
      });
      
      expect(result.current.productos).toHaveLength(2);
      
      // Limpiar carrito
      act(() => {
        result.current.clear();
      });
      
      expect(result.current.productos).toHaveLength(0);
      expect(result.current.productos).toEqual([]);
    });

    it('should handle clear on empty cart', () => {
      const { result } = renderHook(() => useCart());
      
      expect(result.current.productos).toHaveLength(0);
      
      // Limpiar carrito vacío
      act(() => {
        result.current.clear();
      });
      
      expect(result.current.productos).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    it('should handle product without image', () => {
      const { result } = renderHook(() => useCart());
      
      const productWithoutImage = {
        ...mockProduct,
        img: '',
      };
      
      act(() => {
        result.current.addProducto(productWithoutImage, '', 1, 10);
      });
      
      expect(result.current.productos[0].imagen).toBe('');
    });

    it('should maintain data immutability', () => {
      const { result } = renderHook(() => useCart());
      
      const originalProduct = { ...mockProduct };
      
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 1, 10);
      });
      
      // Modificar el producto original no debería afectar al carrito
      originalProduct.name = 'Modified Name';
      
      expect(result.current.productos[0].name).toBe('Test Product');
      expect(result.current.productos[0].name).not.toBe('Modified Name');
    });

    it('should handle concurrent modifications', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto inicialmente
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 1, 10);
      });
      
      // Realizar múltiples operaciones
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 10); // Ahora cantidad: 3
        result.current.updateCantidad(1, 5); // Actualizar a 5 (dentro del límite)
        result.current.addProducto(mockProduct, mockProduct.img, 3, 10); // Ahora cantidad: 8
        result.current.updateCantidad(1, 2); // Actualizar a 2
      });
      
      expect(result.current.productos[0].cantidad).toBe(2);
    });

    it('should respect stock when adding to existing product multiple times', () => {
      const { result } = renderHook(() => useCart());
      
      // Agregar producto con stock 5
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 1, 5);
      });
      
      // Intentar agregar más varias veces
      act(() => {
        result.current.addProducto(mockProduct, mockProduct.img, 2, 5); // Ahora 3
        result.current.addProducto(mockProduct, mockProduct.img, 3, 5); // Intentar llegar a 6, pero límite 5
      });
      
      expect(result.current.productos[0].cantidad).toBe(5);
    });
  });
});