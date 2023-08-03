export interface IBook {
  book_id: number;
  book_name: string;
  book_author: string;
  book_genre: string;
  description: string;
  publication_date: number;
  book_status: "Available" | "Borrowed";
}

export interface BookState {
  id: string | any;
  title: string | undefined;
  author: string | undefined;
}
