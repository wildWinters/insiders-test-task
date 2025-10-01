"use client";

import { Button } from "@/shared/shad-cn/button";
import { TextField } from "@/shared/ui/text-field";
import { mockBookFormFields } from "../mock/mock-book-form-fields";
import { useBooksList } from "../../hook/use-book-list";
import { useBooksForm } from "../../hook/use-book-form";

export function AddBooksForm() {
  const { setBooks } = useBooksList();

  const { register, handleSubmit, errors, onSubmit, loading } =
    useBooksForm(setBooks);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      {mockBookFormFields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          placeholder={field.placeholder}
          error={errors[field.name as keyof typeof errors]}
          {...register(field.name as keyof typeof errors)}
        />
      ))}

      <Button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 w-full text-white"
      >
        {loading ? "Додаємо..." : "Додати книгу"}
      </Button>
    </form>
  );
}
