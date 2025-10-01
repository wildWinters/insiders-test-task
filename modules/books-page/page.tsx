"use client";

import { Button } from "@/shared/shad-cn/button";
import { Card, CardContent } from "@/shared/shad-cn/card";
import { Input } from "@/shared/shad-cn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shad-cn/select";
import { useBooksList } from "./hook/use-book-list";
import { useBookExchange } from "./hook/use-book-exchange";
import { useRouter } from "next/navigation";

export function BooksPage() {
  const router = useRouter();
  const {
    books,
    myBooks,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    sort,
    setSort,
  } = useBooksList();

  const { selectedBookId, setSelectedBookId, sendingBookId, handleExchange } =
    useBookExchange(myBooks);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => {
          const isOwner = myBooks.some((b) => b.id === book.id);
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
                      onValueChange={setSelectedBookId}
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
