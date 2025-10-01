"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "@/shared/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthStore } from "@/shared/store/use-auth-store";
import { bookSchema, BookFormValues } from "../add-books-form/schema/book-schema";
import { Book } from "../types/t-book";

export function useBooksForm(
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
) {
  const { user } = useAuthStore();
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

  const onSubmit = async (values: BookFormValues) => {
    if (!user?.uid) {
      alert("Спочатку увійдіть у систему");
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "books"), {
        ...values,
        userId: user.uid,
      });
      setBooks((prev) => [{ id: docRef.id, ...values }, ...prev]);
      reset();
    } catch (err) {
      console.error("Помилка додавання книги:", err);
      alert("Помилка додавання книги");
    } finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, errors, onSubmit, loading };
}
