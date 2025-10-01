"use client";

import { useState } from "react";
import { Book, Book as TBook } from "@/modules/me-books-page/types/t-book";

export function useBookExchange(myBooks: TBook[]) {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [sendingBookId, setSendingBookId] = useState<string | null>(null);

  const handleExchange = async (requestedBook: Book) => {
    if (!selectedBookId) return alert("Оберіть книгу для обміну");
    const offeredBook = myBooks.find((b) => b.id === selectedBookId);
    if (!offeredBook) return;

    setSendingBookId(requestedBook.id);
    await new Promise((res) => setTimeout(res, 500));
    setSendingBookId(null);
    alert("Запит на обмін надіслано!");
  };

  return {
    selectedBookId,
    setSelectedBookId,
    sendingBookId,
    handleExchange,
  };
}
