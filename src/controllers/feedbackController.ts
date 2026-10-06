import { Request, Response } from 'express';
import { db } from '../config/db';
import { Feedback } from '../types';

export const getFeedback = (req: Request, res: Response) => {
  const feedbacks = db.get('feedback');
  return res.json({ success: true, count: feedbacks.length, data: feedbacks });
};

export const submitFeedback = (req: Request, res: Response) => {
  const { name, rollNo, userType, rating, category, message } = req.body;

  if (!message || !rating) {
    return res.status(400).json({ success: false, message: 'Message and Rating are required.' });
  }

  const newFeedback: Feedback = {
    id: `fb-${Date.now()}`,
    name: name || 'Anonymous',
    rollNo: rollNo || undefined,
    userType: userType || 'Student',
    rating: Number(rating) || 5,
    category: category || 'General Service',
    message,
    createdAt: new Date().toISOString()
  };

  db.update('feedback', (current) => [newFeedback, ...current]);

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your feedback has been delivered to the Chief Librarian & College Administration.',
    data: newFeedback
  });
};
