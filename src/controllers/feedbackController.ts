import { Request, Response } from 'express';
import { FeedbackModel } from '../models/Feedback';

export const getFeedback = async (req: Request, res: Response) => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: feedbacks.length, data: feedbacks });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { name, rollNo, userType, rating, category, message } = req.body;

    if (!message || !rating) {
      return res.status(400).json({ success: false, message: 'Message and Rating are required.' });
    }

    const newFeedback = await FeedbackModel.create({
      name: name || 'Anonymous',
      rollNo: rollNo || undefined,
      userType: userType || 'Student',
      rating: Number(rating) || 5,
      category: category || 'General Service',
      message
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your feedback has been saved to MongoDB for college administration review.',
      data: newFeedback
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
