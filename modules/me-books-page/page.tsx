"use client";

import { useBooksList } from "./hook/use-book-list";
import { AddBooksForm } from "./add-books-form/components/add-books-form";
import { BooksList } from "./books-list-widget/components/books-list";

export function MyBooksPage() {
  const { books, handleDelete } = useBooksList();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Мої книги</h1>

      <AddBooksForm />
      <BooksList books={books} handleDelete={handleDelete} />
    </div>
  );
}
