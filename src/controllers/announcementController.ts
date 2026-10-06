import { Request, Response } from 'express';
import { db } from '../config/db';
import { LibraryAnnouncement } from '../types';

export const getAnnouncements = (req: Request, res: Response) => {
  const announcements = db.get('announcements');
  return res.json({ success: true, count: announcements.length, data: announcements });
};

export const createAnnouncement = (req: Request, res: Response) => {
  const { title, content, category, isUrgent } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and Content are required.' });
  }

  const newAnn: LibraryAnnouncement = {
    id: `ann-${Date.now()}`,
    title,
    content,
    category: category || 'Notice',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    isUrgent: Boolean(isUrgent)
  };

  db.update('announcements', (current) => [newAnn, ...current]);

  return res.status(201).json({
    success: true,
    message: 'Library notice published successfully.',
    data: newAnn
  });
};

export const deleteAnnouncement = (req: Request, res: Response) => {
  const { id } = req.params;
  db.update('announcements', (current) => current.filter((a) => a.id !== id));
  return res.json({ success: true, message: 'Notice dismissed.' });
};
