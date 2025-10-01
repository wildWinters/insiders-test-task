"use client";

import { useEffect, useState } from "react";
import { Input } from "@/shared/shad-cn/input";
import { Button } from "@/shared/shad-cn/button";
import { Card, CardContent } from "@/shared/shad-cn/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shad-cn/select";
import { useRouter } from "next/navigation";

interface Book {
  id: string;
  name: string;
  author: string;
  description: string;
  ownerId?: string; 
}


const currentUser = {
  id: "1",
  name: "Ostap",
  email: "ostap@example.com",
};

// Імітація бекенду
const fetchBooks = async (
  page = 1,
  limit = 10,
  search = "",
  sort: "asc" | "desc" = "asc"
): Promise<{ books: Book[]; total: number }> => {
  const allBooks: Book[] = Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Book ${i + 1}`,
    author: `Author ${i % 10}`,
    description: `Опис книги ${i + 1}`,
    ownerId: ((i % 5) + 1).toString(), 
  }));

  let filtered = allBooks.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  filtered = filtered.sort((a, b) =>
    sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const books = filtered.slice(start, end);

  return new Promise((resolve) =>
    setTimeout(() => resolve({ books, total }), 300)
  );
};

const sendExchangeRequest = async (
  toEmail: string,
  fromName: string,
  fromEmail: string,
  offeredBook: Book,
  requestedBook: Book
) => {
  console.log("Відправка запиту на обмін:", {
    toEmail,
    fromName,
    fromEmail,
    offeredBook,
    requestedBook,
  });
  return new Promise((res) => setTimeout(res, 500));
};

export function BooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [sendingBookId, setSendingBookId] = useState<string | null>(null);

  const LIMIT = 10;
  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    fetchBooks(page, LIMIT, search, sort)
      .then((data) => {
        setBooks(data.books);
        setTotal(data.total);

        // Беремо книги поточного користувача
        const mine = data.books.filter((b) => b.ownerId === currentUser.id);
        setMyBooks(mine);
      })
      .catch(console.error);
  }, [page, search, sort]);

  const handleExchange = async (requestedBook: Book) => {
    if (!selectedBookId) return alert("Оберіть книгу для обміну");
    const offeredBook = myBooks.find((b) => b.id === selectedBookId);
    if (!offeredBook) return;

    setSendingBookId(requestedBook.id);
    await sendExchangeRequest(
      requestedBook.ownerId + "@example.com",
      currentUser.name,
      currentUser.email,
      offeredBook,
      requestedBook
    );
    setSendingBookId(null);
    alert("Запит на обмін надіслано!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Список книг</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          placeholder="Пошук за назвою або автором"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />

        <Select
          value={sort}
          onValueChange={(value) => setSort(value as "asc" | "desc")}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Сортування" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">А → Я</SelectItem>
            <SelectItem value="desc">Я → А</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => {
          const isOwner = book.ownerId === currentUser.id;
          return (
            <Card
              key={book.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => router.push(`/books/${book.id}`)}
            >
              <CardContent>
                <h3 className="text-lg font-bold">{book.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Автор: {book.author}
                </p>
                <p className="text-gray-700 mb-2">{book.description}</p>

                {!isOwner && myBooks.length > 0 && (
                  <>
                    <Select
                      value={selectedBookId || ""}
                      onValueChange={(val) => setSelectedBookId(val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Оберіть вашу книгу для обміну" />
                      </SelectTrigger>
                      <SelectContent>
                        {myBooks.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExchange(book);
                      }}
                      disabled={sendingBookId === book.id || !selectedBookId}
                    >
                      {sendingBookId === book.id
                        ? "Відправка..."
                        : "Запросити обмін"}
                    </Button>
                  </>
                )}

                {isOwner && (
                  <p className="text-red-500 font-bold mt-2">
                    Це ваша книга — обмін недоступний
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-2 justify-center mt-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Назад
        </Button>
        <span className="px-2 py-1">
          {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Вперед
        </Button>
      </div>
    </div>
  );
}
