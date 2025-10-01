"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/shared/shad-cn/button";
import { Card, CardContent } from "@/shared/shad-cn/card";
import Link from "next/link";

interface Book {
  id: string;
  name: string;
  author: string;
  description: string;
}


const allBooks: Book[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Book ${i + 1}`,
  author: `Author ${i % 10}`,
  description: `Опис книги ${i + 1}`,
}));

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!params?.id) return;

    const found = allBooks.find((b) => b.id === params.id);
    setBook(found || null);
  }, [params]);

  if (!book) return <p className="p-6">Книга не знайдена</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        Назад до списку
      </Button>

      <Card>
        <CardContent>
          <h1 className="text-3xl font-bold mb-4">{book.name}</h1>
          <p className="text-gray-600 mb-2">Автор: {book.author}</p>
          <p className="text-gray-700">{book.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
