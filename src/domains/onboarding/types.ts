import { z } from "zod/v4";

export const schoolInfoSchema = z.object({
  name: z.string().trim().min(1),
  streetAddress: z.string().trim().min(1),
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  zipCode: z.string().trim().min(1),
  country: z.string().trim().min(1).optional(),
});

export const initialRegisterSchema = z.object({
  adminFirstName: z.string().trim().min(1),
  adminLastName: z.string().trim().min(1),
  adminEmail: z.string().trim().email(),
  adminPassword: z.string().min(8),
  schoolInfo: schoolInfoSchema,
});


export type InitialRegister = z.infer<typeof initialRegisterSchema>;