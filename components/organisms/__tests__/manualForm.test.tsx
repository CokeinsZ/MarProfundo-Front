import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ManualFormComponent from '../manualForm';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockCreateManual = jest.fn();
const mockCreateBlocks = jest.fn();
jest.mock('@/hooks/useManualForm', () => ({
  useManualForm: () => ({
    createManual: mockCreateManual,
    createBlocks: mockCreateBlocks,
    loading: false,
  }),
}));


jest.mock('lucide-react', () => ({
  Plus: (props: any) => <svg data-testid="plus-icon" {...props}>Plus</svg>,
  Trash2: (props: any) => <svg data-testid="trash-icon" {...props}>Trash2</svg>,
  MoveUp: (props: any) => <svg data-testid="move-up-icon" {...props}>MoveUp</svg>,
  MoveDown: (props: any) => <svg data-testid="move-down-icon" {...props}>MoveDown</svg>,
}));

const mockUseForm = jest.fn();
const mockUseFieldArray = jest.fn();
jest.mock('react-hook-form', () => ({
  useForm: () => mockUseForm(),
  useFieldArray: () => mockUseFieldArray(),
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));


jest.mock('@/schemas/manual', () => ({
  manualSchema: {},
  ManualFormData: {},
}));

describe('ManualFormComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configurar mocks por defecto
    mockCreateManual.mockResolvedValue({ manual_id: '123' });
    mockCreateBlocks.mockResolvedValue({ success: true });
    
    mockUseForm.mockReturnValue({
      register: jest.fn().mockReturnValue({}),
      control: {},
      handleSubmit: (fn: any) => (e: any) => {
        e?.preventDefault?.();
        fn({ 
          title: 'Test Manual', 
          thumbnail: 'https://example.com/image.jpg', 
          blocks: [] 
        });
      },
      formState: { errors: {} },
    });
    
    mockUseFieldArray.mockReturnValue({
      fields: [
        { id: '1', index: 0, type: 'text', content: 'Bloque 1' },
        { id: '2', index: 1, type: 'h2', content: 'Título 1' },
      ],
      append: jest.fn(),
      remove: jest.fn(),
      move: jest.fn(),
    });
  });

  const renderComponent = (props = {}) => {
    return render(<ManualFormComponent manual={undefined} blocks={[]} {...props} />);
  };

  it('renders form with correct structure', () => {
    renderComponent();
    
    expect(screen.getByText('Información del Manual')).toBeInTheDocument();
    expect(screen.getByText('Bloques de Contenido')).toBeInTheDocument();
    expect(screen.getByText('Agregar Bloque')).toBeInTheDocument();
    expect(screen.getByText('Crear Manual')).toBeInTheDocument();
  });

  it('handles successful form submission', async () => {
    renderComponent();
    
    const submitButton = screen.getByText('Crear Manual');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockCreateManual).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/admin/manuals');
    });
  });
});