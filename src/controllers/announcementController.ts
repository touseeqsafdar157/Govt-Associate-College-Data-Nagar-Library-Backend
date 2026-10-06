import { Request, Response } from 'express';
import { AnnouncementModel } from '../models/Announcement';

export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await AnnouncementModel.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: announcements.length, data: announcements });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { title, content, category, isUrgent } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and Content are required.' });
    }

    const newAnn = await AnnouncementModel.create({
      title,
      content,
      category: category || 'Notice',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isUrgent: Boolean(isUrgent)
    });

    return res.status(201).json({
      success: true,
      message: 'Library notice published successfully to MongoDB.',
      data: newAnn
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await AnnouncementModel.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Notice dismissed.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
