"use client";

import { useState, useEffect } from "react";
import { db } from "@/shared/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthStore } from "@/shared/store/use-auth-store";
import { Book } from "../types/t-book";

export function useBooksList() {
  const { user } = useAuthStore();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, "books"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const userBooks: Book[] = querySnapshot.docs.map(
          (docSnap) =>
            ({
              id: docSnap.id,
              ...docSnap.data(),
            }) as Book
        );
        setBooks(userBooks);
      } catch (err) {
        console.error("Помилка завантаження книг:", err);
      }
    };

    fetchBooks();
  }, [user?.uid]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "books", id));
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Помилка видалення книги:", err);
      alert("Помилка видалення книги");
    }
  };

  return { books, setBooks, handleDelete };
}
