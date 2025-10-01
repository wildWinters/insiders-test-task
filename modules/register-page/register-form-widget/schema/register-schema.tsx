import z from "zod";
export const registerSchema = z.object({
  name: z.string().min(2, "Мінімум 2 символи"),
  email: z.string().email("Некоректний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
