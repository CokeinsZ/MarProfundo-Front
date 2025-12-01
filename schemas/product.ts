import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(32, 'Máximo 32 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
  img: z.string().url('Debe ser una URL válida'),
  categories: z.array(z.number()).min(1, 'Selecciona al menos una categoría'),
  warehouses: z.array(z.object({
    warehouse_id: z.number().positive('Selecciona una bodega'),
    quantity: z.number().int().min(1, 'La cantidad debe ser al menos 1'),
  })).min(1, 'Agrega al menos una bodega'),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
