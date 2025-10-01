import z from "zod";

export const bookSchema = z.object({
  name: z.string().min(1, "Вкажіть назву книги"),
  author: z.string().min(1, "Вкажіть автора"),
  photo: z.string().optional(),
});


export type BookFormValues = z.infer<typeof bookSchema>;