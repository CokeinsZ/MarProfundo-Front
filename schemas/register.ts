import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string(),
  last_name: z.string(),
  national_id: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  status: z.string().optional(),
  rol: z.string().optional(),
});