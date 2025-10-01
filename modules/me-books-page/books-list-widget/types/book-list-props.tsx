import { Book } from "../../types/t-book";

export interface BooksListProps {
  books: Book[];
  handleDelete: (id: string) => void;
}
