"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/shared/shad-cn/button";
import { TextField } from "@/shared/ui/text-field";

const bookSchema = z.object({
  name: z.string().min(1, "Вкажіть назву книги"),
  author: z.string().min(1, "Вкажіть автора"),
  photo: z.string().optional(),
});

type BookFormValues = z.infer<typeof bookSchema>;

type Book = {
  id: string;
  name: string;
  author: string;
  photo?: string;
};

export function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: { name: "", author: "", photo: "" },
  });

  const onSubmit = (values: BookFormValues) => {
    setLoading(true);
    const newBook: Book = {
      id: Date.now().toString(),
      name: values.name,
      author: values.author,
      photo: values.photo,
    };
    setBooks([newBook, ...books]);
    reset();
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Мої книги</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <TextField
          label="Назва книги"
          placeholder="Введіть назву"
          error={errors.name}
          {...register("name")}
        />
        <TextField
          label="Автор"
          placeholder="Введіть автора"
          error={errors.author}
          {...register("author")}
        />
        <TextField
          label="Фото (URL)"
          placeholder="https://example.com/photo.jpg"
          error={errors.photo}
          {...register("photo")}
        />

        <Button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 w-full text-white"
        >
          {loading ? "Додаємо..." : "Додати книгу"}
        </Button>
      </form>

      {books.length === 0 ? (
        <p className="text-gray-500">У вас ще немає книг</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                {book.photo && (
                  <img
                    src={book.photo}
                    alt={book.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-semibold">{book.name}</p>
                  <p className="text-gray-600">{book.author}</p>
                </div>
              </div>
              <Button
                onClick={() => handleDelete(book.id)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Видалити
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
