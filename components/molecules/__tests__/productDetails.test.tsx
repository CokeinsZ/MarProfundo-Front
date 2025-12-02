import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductDetails from '../productDetails';
import { Product } from '@/interfaces/product';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock de los hooks
const mockUseProductDetail = jest.fn();
const mockUseCart = jest.fn();
jest.mock('@/hooks/useProductDetail', () => ({
  useProductDetail: () => mockUseProductDetail(),
}));

jest.mock('@/hooks/useCart', () => ({
  useCart: () => mockUseCart(),
}));

// Tipos para los mocks
const mockProduct: Product = {
  product_id: 1,
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  img: '/test-image.jpg',
  created_at: new Date(),
  updated_at: new Date(),
};

describe('ProductDetails Component', () => {
  const mockAddProducto = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configurar mock por defecto
    mockUseCart.mockReturnValue({
      addProducto: mockAddProducto,
    });
  });

  it('renders loading state when loading is true', () => {
    mockUseProductDetail.mockReturnValue({
      product: null,
      Warehouse_Product: null,
      hasStock: false,
      loading: true,
      errorMsg: null,
    });

    const { container } = render(<ProductDetails id="1" />);

    const pulseElement = container.querySelector('.animate-pulse');
    expect(pulseElement).toBeTruthy();
  });

  it('renders error message when errorMsg exists', () => {
    const errorMessage = 'Error loading product';
    mockUseProductDetail.mockReturnValue({
      product: null,
      Warehouse_Product: null,
      hasStock: false,
      loading: false,
      errorMsg: errorMessage,
    });

    render(<ProductDetails id="1" />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
  });

  it('renders not found message when product is null', () => {
    mockUseProductDetail.mockReturnValue({
      product: null,
      Warehouse_Product: null,
      hasStock: false,
      loading: false,
      errorMsg: null,
    });

    render(<ProductDetails id="1" />);

    expect(screen.getByText('No se encontró el producto.')).toBeInTheDocument();
  });

  it('renders product details correctly with stock', () => {
    mockUseProductDetail.mockReturnValue({
      product: mockProduct,
      Warehouse_Product: {
        quantity: 10,
        warehouse_id: 1,
        product_id: 1,
      },
      hasStock: true,
      loading: false,
      errorMsg: null,
    });

    render(<ProductDetails id="1" />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description!)).toBeInTheDocument();

    expect(screen.getByText(/\$\s*99,99/)).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('En stock (10)')).toBeInTheDocument();
    
    expect(screen.getByText('Añadir al carrito')).toBeInTheDocument();
    expect(screen.getByText('Ver más')).toBeInTheDocument();
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10 disponibles')).toBeInTheDocument();
  });

  it('renders product details without stock', () => {
    mockUseProductDetail.mockReturnValue({
      product: mockProduct,
      Warehouse_Product: {
        quantity: 0,
        warehouse_id: 1,
        product_id: 1,
      },
      hasStock: false,
      loading: false,
      errorMsg: null,
    });

    render(<ProductDetails id="1" />);

    expect(screen.getByText('No disponible')).toBeInTheDocument();
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
    
    const addButton = screen.getByText('Añadir al carrito');
    expect(addButton).toBeDisabled();
  });

  it('increases quantity when plus button is clicked', () => {
    mockUseProductDetail.mockReturnValue({
      product: mockProduct,
      Warehouse_Product: {
        quantity: 10,
        warehouse_id: 1,
        product_id: 1,
      },
      hasStock: true,
      loading: false,
      errorMsg: null,
    });

    render(<ProductDetails id="1" />);

    const increaseButton = screen.getByLabelText('Aumentar cantidad');
    fireEvent.click(increaseButton);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    
    for (let i = 0; i < 8; i++) {
      fireEvent.click(increaseButton);
    }
    
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(increaseButton).toBeDisabled();
  });

  it('decreases quantity when minus button is clicked', () => {
    mockUseProductDetail.mockReturnValue({
      product: mockProduct,
      Warehouse_Product: {
        quantity: 10,
        warehouse_id: 1,
        product_id: 1,
      },
      hasStock: true,
      loading: false,
      errorMsg: null,
    });

    render(<ProductDetails id="1" />);

    const increaseButton = screen.getByLabelText('Aumentar cantidad');
    const decreaseButton = screen.getByLabelText('Disminuir cantidad');
    
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    
    expect(screen.getByText('3')).toBeInTheDocument();
    
    fireEvent.click(decreaseButton);
    fireEvent.click(decreaseButton);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(decreaseButton).toBeDisabled();
  });

  it('calls addProducto when Add to Cart button is clicked', async () => {
    mockUseProductDetail.mockReturnValue({
      product: mockProduct,
      Warehouse_Product: {
        quantity: 10,
        warehouse_id: 1,
        product_id: 1,
      },
      hasStock: true,
      loading: false,
      errorMsg: null,
    });

    render(<ProductDetails id="1" />);

    const addButton = screen.getByText('Añadir al carrito');
    fireEvent.click(addButton);
    
    expect(mockAddProducto).toHaveBeenCalledWith(
      mockProduct,
      mockProduct.img,
      1,
      10
    );
    
    // Verificar que el botón muestra "Añadido ✓" temporalmente
    expect(screen.getByText('Añadido ✓')).toBeInTheDocument();
    
    // Esperar a que vuelva al estado original
    await waitFor(() => {
      expect(screen.getByText('Añadir al carrito')).toBeInTheDocument();
    }, { timeout: 1600 });
  });

  it('does not call addProducto when stock is 0', () => {
    mockUseProductDetail.mockReturnValue({
      product: mockProduct,
      Warehouse_Product: {
        quantity: 0,
        warehouse_id: 1,
        product_id: 1,
      },
      hasStock: false,
      loading: false,
      errorMsg: null,
    });

    render(<ProductDetails id="1" />);

    const addButton = screen.getByText('Añadir al carrito');
    fireEvent.click(addButton);
    
    expect(mockAddProducto).not.toHaveBeenCalled();
  });

  it('shows fallback when product has no image', () => {
    const productWithoutImage = {
      ...mockProduct,
      img: '',
    };

    mockUseProductDetail.mockReturnValue({
      product: productWithoutImage,
      Warehouse_Product: {
        quantity: 10,
        warehouse_id: 1,
        product_id: 1,
      },
      hasStock: true,
      loading: false,
      errorMsg: null,
    });

    render(<ProductDetails id="1" />);

    expect(screen.getByText('Sin imagen')).toBeInTheDocument();
  });

  it('shows fallback when product has no description', () => {
    const productWithoutDescription = {
      ...mockProduct,
      description: null,
    };

    mockUseProductDetail.mockReturnValue({
      product: productWithoutDescription,
      Warehouse_Product: {
        quantity: 10,
        warehouse_id: 1,
        product_id: 1,
      },
      hasStock: true,
      loading: false,
      errorMsg: null,
    });

    render(<ProductDetails id="1" />);

    expect(screen.getByText('No hay descripción disponible.')).toBeInTheDocument();
  });

  describe('Currency formatting', () => {
    it('formats price correctly for COP currency', () => {
      const productWithDecimal = {
        ...mockProduct,
        price: 1234.56,
      };

      mockUseProductDetail.mockReturnValue({
        product: productWithDecimal,
        Warehouse_Product: {
          quantity: 10,
          warehouse_id: 1,
          product_id: 1,
        },
        hasStock: true,
        loading: false,
        errorMsg: null,
      });

      render(<ProductDetails id="1" />);

      // Verificar formato COP
      expect(screen.getByText(/\$\s*1\.234,56/)).toBeInTheDocument();
    });

    it('formats price correctly for integer values in COP', () => {
      const productWithInteger = {
        ...mockProduct,
        price: 100,
      };

      mockUseProductDetail.mockReturnValue({
        product: productWithInteger,
        Warehouse_Product: {
          quantity: 10,
          warehouse_id: 1,
          product_id: 1,
        },
        hasStock: true,
        loading: false,
        errorMsg: null,
      });

      render(<ProductDetails id="1" />);

      expect(screen.getByText(/\$\s*100,00/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for buttons', () => {
      mockUseProductDetail.mockReturnValue({
        product: mockProduct,
        Warehouse_Product: {
          quantity: 10,
          warehouse_id: 1,
          product_id: 1,
        },
        hasStock: true,
        loading: false,
        errorMsg: null,
      });

      render(<ProductDetails id="1" />);

      expect(screen.getByLabelText('Aumentar cantidad')).toBeInTheDocument();
      expect(screen.getByLabelText('Disminuir cantidad')).toBeInTheDocument();
    });

    it('has proper semantic structure', () => {
      mockUseProductDetail.mockReturnValue({
        product: mockProduct,
        Warehouse_Product: {
          quantity: 10,
          warehouse_id: 1,
          product_id: 1,
        },
        hasStock: true,
        loading: false,
        errorMsg: null,
      });

      render(<ProductDetails id="1" />);

      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: mockProduct.name })).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('has correct grid classes for responsive layout', () => {
      mockUseProductDetail.mockReturnValue({
        product: mockProduct,
        Warehouse_Product: {
          quantity: 10,
          warehouse_id: 1,
          product_id: 1,
        },
        hasStock: true,
        loading: false,
        errorMsg: null,
      });

      render(<ProductDetails id="1" />);

      const article = screen.getByRole('article');
      expect(article).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3');
    });
  });
});