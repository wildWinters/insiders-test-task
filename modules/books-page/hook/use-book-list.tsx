"use client";

import { useState, useEffect } from "react";
import { db } from "@/shared/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useAuthStore } from "@/shared/store/use-auth-store";

export interface Book {
  id: string;
  name: string;
  author: string;
  description: string;
  ownerId?: string;
}

export function useBooksList(limitCount = 10) {
  const { user } = useAuthStore();

  const [books, setBooks] = useState<Book[]>([]);
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const fetchBooks = async () => {
    if (!user) return;

    let q = query(
      collection(db, "books"),
      orderBy("name", sort),
      limit(limitCount)
    );

    if (page > 1 && lastDoc) {
      q = query(
        collection(db, "books"),
        orderBy("name", sort),
        startAfter(lastDoc),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(q);
    const fetchedBooks: Book[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Book),
    }));

    const filteredBooks = search
      ? fetchedBooks.filter(
          (b) =>
            b.name.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase())
        )
      : fetchedBooks;

    setBooks(filteredBooks);
    setTotal(filteredBooks.length);
    setMyBooks(filteredBooks.filter((b) => b.ownerId === user.uid));
    setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
  };

  useEffect(() => {
    fetchBooks().catch(console.error);
  }, [page, search, sort, user]);

  const totalPages = Math.ceil(total / limitCount);

  return {
    books,
    myBooks,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    sort,
    setSort,
    fetchBooks,
  };
}
