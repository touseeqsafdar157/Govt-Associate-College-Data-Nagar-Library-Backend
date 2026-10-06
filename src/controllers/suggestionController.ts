import { Request, Response } from 'express';
import { SuggestionModel } from '../models/Suggestion';

export const getSuggestions = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const filter: any = {};
    if (status) filter.status = status;

    const suggestions = await SuggestionModel.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: suggestions.length, data: suggestions });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createSuggestion = async (req: Request, res: Response) => {
  try {
    const { title, author, suggestedByRollNo, suggestedByName, studentClass, department, reason } = req.body;

    if (!title || !author) {
      return res.status(400).json({ success: false, message: 'Title and Author are required.' });
    }

    const newSug = await SuggestionModel.create({
      title,
      author,
      suggestedByRollNo: suggestedByRollNo || 'Patron',
      suggestedByName: suggestedByName || 'Student',
      studentClass: studentClass || 'General',
      department: department || 'General',
      reason: reason || 'Recommended for college study',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Book purchase suggestion submitted to MongoDB for Principal & Librarian review.',
      data: newSug
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSuggestionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Procured', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid suggestion status.' });
    }

    const updated = await SuggestionModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Suggestion not found' });
    }

    return res.json({
      success: true,
      message: `Book request marked as ${status} in MongoDB.`,
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSuggestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await SuggestionModel.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Suggestion removed.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
