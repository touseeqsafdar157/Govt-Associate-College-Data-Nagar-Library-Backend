import { Request, Response } from 'express';
import { db } from '../config/db';
import { BookSuggestion } from '../types';

export const getSuggestions = (req: Request, res: Response) => {
  const { status } = req.query;
  let suggestions = db.get('suggestions');

  if (status) {
    suggestions = suggestions.filter((s) => s.status.toLowerCase() === String(status).toLowerCase());
  }

  return res.json({ success: true, count: suggestions.length, data: suggestions });
};

export const createSuggestion = (req: Request, res: Response) => {
  const { title, author, suggestedByRollNo, suggestedByName, studentClass, department, reason } = req.body;

  if (!title || !author) {
    return res.status(400).json({ success: false, message: 'Title and Author are required.' });
  }

  const newSug: BookSuggestion = {
    id: `sug-${Date.now()}`,
    title,
    author,
    suggestedByRollNo: suggestedByRollNo || 'Anonymous',
    suggestedByName: suggestedByName || 'Student Patron',
    studentClass: studentClass || 'General',
    department: department || 'General',
    reason: reason || 'Recommended for college study',
    date: new Date().toISOString().split('T')[0],
    status: 'Pending'
  };

  db.update('suggestions', (current) => [newSug, ...current]);

  return res.status(201).json({
    success: true,
    message: 'Book purchase suggestion submitted to Principal & Librarian for review.',
    data: newSug
  });
};

export const updateSuggestionStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Approved', 'Procured', 'Rejected'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid suggestion status.' });
  }

  const suggestions = db.get('suggestions');
  const sug = suggestions.find((s) => s.id === id);

  if (!sug) {
    return res.status(404).json({ success: false, message: 'Suggestion not found.' });
  }

  const updated: BookSuggestion = { ...sug, status };
  db.update('suggestions', (current) => current.map((s) => (s.id === id ? updated : s)));

  return res.json({
    success: true,
    message: `Book request marked as ${status}.`,
    data: updated
  });
};

export const deleteSuggestion = (req: Request, res: Response) => {
  const { id } = req.params;
  db.update('suggestions', (current) => current.filter((s) => s.id !== id));
  return res.json({ success: true, message: 'Suggestion removed.' });
};
