import  z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Некоректний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;