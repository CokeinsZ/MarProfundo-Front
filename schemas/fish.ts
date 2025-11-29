import { z } from 'zod';

export const fishFormSchema = z.object({
  common_name: z.string().min(3, 'El nombre común debe tener al menos 3 caracteres'),
  scientific_name: z.string().min(3, 'El nombre científico debe tener al menos 3 caracteres'),
  habitat: z.string().min(10, 'El hábitat debe tener al menos 10 caracteres'),
  mean_size: z.number().positive('El tamaño debe ser mayor a 0'),
  mean_weight: z.number().positive('El peso debe ser mayor a 0'),
  diet: z.string().min(3, 'La dieta debe tener al menos 3 caracteres'),
  img: z.string().url('Debe ser una URL válida'),
});

export type FishFormData = z.infer<typeof fishFormSchema>;
