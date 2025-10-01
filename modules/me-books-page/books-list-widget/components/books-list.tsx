"use client";
import { Button } from "@/shared/shad-cn/button";
import { BooksListProps } from "../types/book-list-props";

export function BooksList({ books, handleDelete }: BooksListProps) {
  return (
    <>
      {books.length > 0 && (
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
      {books.length === 0 && (
        <p className="text-gray-500">У вас ще немає книг</p>
      )}
    </>
  );
}
