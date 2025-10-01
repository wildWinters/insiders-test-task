"use client";

import { useState, useEffect } from "react";
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
import { db } from "@/shared/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  addDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useAuthStore } from "@/shared/store/use-auth-store";

interface Book {
  id: string;
  name: string;
  author: string;
  description: string;
  ownerId?: string;
  ownerEmail?: string;
}

export default function BooksPagev2() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [books, setBooks] = useState<Book[]>([]);
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [sendingBookId, setSendingBookId] = useState<string | null>(null);

  const LIMIT = 10;

  // ---- Завантаження книг ----
  const fetchBooks = async () => {
    try {
      let q = query(
        collection(db, "books"),
        orderBy("name", sort),
        limit(LIMIT)
      );
      if (page > 1 && lastDoc) {
        q = query(
          collection(db, "books"),
          orderBy("name", sort),
          startAfter(lastDoc),
          limit(LIMIT)
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

      if (user) {
        setMyBooks(filteredBooks.filter((b) => b.ownerId === user.uid));
      } else {
        setMyBooks([]);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    } catch (err) {
      console.error("Помилка при завантаженні книг:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search, sort, user]);

  // ---- Обмін через Firebase ----
  const handleExchange = async (requestedBook: Book) => {
    if (!user) return alert("Ви повинні увійти, щоб обмінюватися книгами");
    if (!selectedBookId) return alert("Оберіть книгу для обміну");

    const offeredBook = myBooks.find((b) => b.id === selectedBookId);
    if (!offeredBook) return;

    if (requestedBook.ownerId === user.uid) {
      return alert("Неможливо зробити обмін на власну книгу");
    }

    setSendingBookId(requestedBook.id);

    try {
      await addDoc(collection(db, "exchangeRequests"), {
        fromUserId: user.uid,
        fromUserName: user.displayName,
        fromUserEmail: user.email,
        toUserId: requestedBook.ownerId,
        toUserEmail: requestedBook.ownerEmail,
        requestedBookId: requestedBook.id,
        requestedBookName: requestedBook.name,
        offeredBookId: offeredBook.id,
        offeredBookName: offeredBook.name,
        createdAt: new Date(),
        status: "pending", // можна додати статус
      });

      alert("Запит на обмін створено у Firebase!");
    } catch (err) {
      console.error(err);
      alert("Не вдалося надіслати запит. Спробуйте пізніше.");
    }

    setSendingBookId(null);
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Список книг</h1>

      {/* Пошук + Сортування */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          placeholder="Пошук за назвою або автором"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />

        <Select
          value={sort}
          onValueChange={(val) => setSort(val as "asc" | "desc")}
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

      {/* Список книг */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => {
          const isOwner = user ? book.ownerId === user.uid : false;

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

                {/* Обмін */}
                {user && !isOwner && myBooks.length > 0 && (
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
          {page} / {totalPages || 1}
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
