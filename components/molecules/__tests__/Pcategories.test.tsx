import React from 'react';
import { render, screen } from '@testing-library/react';
import Pcategories from '../Pcategories';

// Mock del hook useCategories con factory function
const mockUseCategories = jest.fn();
jest.mock('@/hooks/usePCategories', () => ({
  useCategories: () => mockUseCategories(),
}));

// Mock de next/link usando componente funcional
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="category-link">
      {children}
    </a>
  ),
}));

describe('Pcategories Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configurar mock por defecto
    mockUseCategories.mockReturnValue({
      pCategories: [],
      loading: false,
      mensaje: '',
    });
  });

  it('renders default categories when pCategories is empty array', () => {
    render(<Pcategories />);

    expect(screen.getByText('Nuestras Categorías')).toBeInTheDocument();
    expect(screen.getByText('Cañas')).toBeInTheDocument();
    expect(screen.getByText('Señuelos y carnadas')).toBeInTheDocument();
    expect(screen.getByText('Mi Pecera')).toBeInTheDocument();
    
    const links = screen.getAllByTestId('category-link');
    expect(links).toHaveLength(3);
  });

  it('renders categories from hook when available', () => {
    const mockCategories = [
      { pcategory_id: 1, name: 'Cañas de Pesca' },
      { pcategory_id: 2, name: 'Carretes Profesionales' },
      { pcategory_id: 3, name: 'Señuelos Artificiales' },
    ];

    mockUseCategories.mockReturnValue({
      pCategories: mockCategories,
      loading: false,
      mensaje: '',
    });

    render(<Pcategories />);

    expect(screen.getByText('Nuestras Categorías')).toBeInTheDocument();
    mockCategories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });

    const links = screen.getAllByTestId('category-link');
    expect(links).toHaveLength(3);
  });
});