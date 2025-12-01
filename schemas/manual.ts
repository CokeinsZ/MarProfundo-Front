import { z } from 'zod';

export const manualBlockSchema = z.object({
  index: z.number().min(0, 'El índice debe ser mayor o igual a 0'),
  type: z.enum(['text', 'image', 'video', 'gif', 'h2', 'h3', 'list']),
  content: z.string().min(1, 'El contenido es requerido'),
});

export const manualSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  thumbnail: z.string().url('Debe ser una URL válida'),
  blocks: z.array(manualBlockSchema).optional(),
});

export type ManualFormData = z.infer<typeof manualSchema>;
export type ManualBlockFormData = z.infer<typeof manualBlockSchema>;
