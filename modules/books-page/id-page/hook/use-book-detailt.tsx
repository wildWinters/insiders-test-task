"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/shared/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface Book {
  id: string;
  name: string;
  author: string;
  description: string;
}

export function useBookDetail() {
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "books", params.id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...docSnap.data() } as Book);
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error("Помилка отримання книги:", err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params?.id]);

  return { book, loading };
}
