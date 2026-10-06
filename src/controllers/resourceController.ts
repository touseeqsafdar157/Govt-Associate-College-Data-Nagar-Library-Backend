import { Request, Response } from 'express';
import { DigitalResourceModel } from '../models/DigitalResource';

export const getResources = async (req: Request, res: Response) => {
  try {
    const { search, type, classGrade } = req.query;
    const filter: any = {};

    if (type && type !== 'All') {
      filter.type = type;
    }

    if (classGrade && classGrade !== 'All') {
      filter.classGrade = new RegExp(String(classGrade), 'i');
    }

    if (search) {
      const q = String(search).trim();
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { subject: { $regex: q, $options: 'i' } },
        { boardOrUniversity: { $regex: q, $options: 'i' } }
      ];
    }

    const resources = await DigitalResourceModel.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: resources.length, data: resources });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createResource = async (req: Request, res: Response) => {
  try {
    const resData = req.body;

    if (!resData.title || !resData.subject) {
      return res.status(400).json({ success: false, message: 'Title and Subject are required.' });
    }

    const newResource = await DigitalResourceModel.create({
      ...resData,
      viewsCount: 0
    });

    return res.status(201).json({
      success: true,
      message: `Digital resource "${newResource.title}" added to MongoDB archives.`,
      data: newResource
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const incrementView = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await DigitalResourceModel.findByIdAndUpdate(
      id,
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    return res.json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await DigitalResourceModel.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Resource removed from MongoDB.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
