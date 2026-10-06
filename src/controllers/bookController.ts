import { Request, Response } from 'express';
import { db } from '../config/db';
import { Book } from '../types';

export const getBooks = (req: Request, res: Response) => {
  const { search, category, department, language, availableOnly } = req.query;
  let books = db.get('books');

  if (category && category !== 'All Categories' && category !== 'All') {
    books = books.filter((b) => b.category.toLowerCase() === String(category).toLowerCase());
  }

  if (department) {
    books = books.filter((b) => b.department.toLowerCase() === String(department).toLowerCase());
  }

  if (language) {
    books = books.filter((b) => b.language.toLowerCase() === String(language).toLowerCase());
  }

  if (availableOnly === 'true') {
    books = books.filter((b) => b.availableCopies > 0);
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    books = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.accessionNo.toLowerCase().includes(q) ||
        b.isbn.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.almariNo.toLowerCase().includes(q) ||
        b.shelfNo.toLowerCase().includes(q)
    );
  }

  return res.json({ success: true, count: books.length, data: books });
};

export const getBookById = (req: Request, res: Response) => {
  const { id } = req.params;
  const books = db.get('books');
  const book = books.find((b) => b.id === id || b.accessionNo.toLowerCase() === id.toLowerCase());

  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  return res.json({ success: true, data: book });
};

export const createBook = (req: Request, res: Response) => {
  const newBookData: Partial<Book> = req.body;

  if (!newBookData.title || !newBookData.author || !newBookData.accessionNo) {
    return res.status(400).json({ success: false, message: 'Title, Author, and Accession No are required.' });
  }

  const books = db.get('books');
  const duplicate = books.find((b) => b.accessionNo.toLowerCase() === newBookData.accessionNo?.toLowerCase());
  if (duplicate) {
    return res.status(400).json({ success: false, message: `Accession Number ${newBookData.accessionNo} already exists!` });
  }

  const newBook: Book = {
    id: `b-${Date.now()}`,
    accessionNo: newBookData.accessionNo,
    title: newBookData.title,
    author: newBookData.author,
    isbn: newBookData.isbn || 'N/A',
    category: newBookData.category || 'General',
    department: newBookData.department || 'General',
    almariNo: newBookData.almariNo || 'Almari #01',
    shelfNo: newBookData.shelfNo || 'Shelf 1',
    publisher: newBookData.publisher || 'Unknown Publisher',
    edition: newBookData.edition || '1st Edition',
    year: Number(newBookData.year) || new Date().getFullYear(),
    totalCopies: Number(newBookData.totalCopies) || 1,
    availableCopies: Number(newBookData.availableCopies ?? newBookData.totalCopies ?? 1),
    language: (newBookData.language as any) || 'English',
    condition: (newBookData.condition as any) || 'Good',
    isReferenceOnly: Boolean(newBookData.isReferenceOnly),
    coverUrl: newBookData.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60',
    description: newBookData.description || '',
    priceRs: Number(newBookData.priceRs) || 0,
    callNumber: newBookData.callNumber || '000 GEN'
  };

  db.update('books', (current) => [newBook, ...current]);

  return res.status(201).json({
    success: true,
    message: `Book "${newBook.title}" added to catalog successfully.`,
    data: newBook
  });
};

export const updateBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: Partial<Book> = req.body;
  const books = db.get('books');
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  const updatedBook: Book = {
    ...books[index],
    ...updateData,
    id: books[index].id // Ensure ID remains immutable
  };

  db.update('books', (current) => current.map((b) => (b.id === id ? updatedBook : b)));

  return res.json({
    success: true,
    message: `Book "${updatedBook.title}" updated successfully.`,
    data: updatedBook
  });
};

export const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const books = db.get('books');
  const exists = books.some((b) => b.id === id);

  if (!exists) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  db.update('books', (current) => current.filter((b) => b.id !== id));

  return res.json({ success: true, message: 'Book deleted successfully.' });
};

export const getCategories = (req: Request, res: Response) => {
  const books = db.get('books');
  const categories = Array.from(new Set(books.map((b) => b.category)));
  return res.json({ success: true, data: ['All Categories', ...categories] });
};
