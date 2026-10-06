import { Request, Response } from 'express';
import { BookModel } from '../models/Book';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { search, category, department, language, availableOnly } = req.query;
    const filter: any = {};

    if (category && category !== 'All Categories' && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    if (department) {
      filter.department = new RegExp(`^${department}$`, 'i');
    }

    if (language) {
      filter.language = language;
    }

    if (availableOnly === 'true') {
      filter.availableCopies = { $gt: 0 };
    }

    if (search) {
      const q = String(search).trim();
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { accessionNo: { $regex: q, $options: 'i' } },
        { isbn: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { almariNo: { $regex: q, $options: 'i' } },
        { shelfNo: { $regex: q, $options: 'i' } }
      ];
    }

    const books = await BookModel.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: books.length, data: books });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let book = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      book = await BookModel.findById(id);
    }
    if (!book) {
      book = await BookModel.findOne({ accessionNo: id.toUpperCase() });
    }

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found in database' });
    }

    return res.json({ success: true, data: book });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBookData = req.body;

    if (!newBookData.title || !newBookData.author || !newBookData.accessionNo) {
      return res.status(400).json({ success: false, message: 'Title, Author, and Accession No are required.' });
    }

    const accession = newBookData.accessionNo.toUpperCase().trim();
    const duplicate = await BookModel.findOne({ accessionNo: accession });
    if (duplicate) {
      return res.status(400).json({ success: false, message: `Accession Number ${accession} already exists!` });
    }

    const totalCopies = Number(newBookData.totalCopies) || 1;
    const availableCopies = Number(newBookData.availableCopies ?? totalCopies);

    const newBook = await BookModel.create({
      ...newBookData,
      accessionNo: accession,
      totalCopies,
      availableCopies
    });

    return res.status(201).json({
      success: true,
      message: `Book "${newBook.title}" added to MongoDB catalog successfully.`,
      data: newBook
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let updated = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      updated = await BookModel.findByIdAndUpdate(id, req.body, { new: true });
    }
    if (!updated) {
      updated = await BookModel.findOneAndUpdate({ accessionNo: id.toUpperCase() }, req.body, { new: true });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    return res.json({
      success: true,
      message: `Book "${updated.title}" updated successfully in MongoDB.`,
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let deleted = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await BookModel.findByIdAndDelete(id);
    }
    if (!deleted) {
      deleted = await BookModel.findOneAndDelete({ accessionNo: id.toUpperCase() });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    return res.json({ success: true, message: 'Book deleted from MongoDB catalog.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await BookModel.distinct('category');
    return res.json({ success: true, data: ['All Categories', ...categories] });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
