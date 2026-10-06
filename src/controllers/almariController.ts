import { Request, Response } from 'express';
import { AlmariModel } from '../models/Almari';

export const getAlmaris = async (req: Request, res: Response) => {
  try {
    const almaris = await AlmariModel.find().sort({ createdAt: 1 });
    return res.json({ success: true, count: almaris.length, data: almaris });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createAlmari = async (req: Request, res: Response) => {
  try {
    const { almariCode, name, department, locationDesc, shelves } = req.body;

    if (!almariCode || !name) {
      return res.status(400).json({ success: false, message: 'Almari Code and Name are required.' });
    }

    const newAlmari = await AlmariModel.create({
      almariCode,
      name,
      department: department || 'General',
      locationDesc: locationDesc || 'Main Hall',
      shelves: Array.isArray(shelves) && shelves.length > 0 ? shelves : ['Shelf 1', 'Shelf 2', 'Shelf 3']
    });

    return res.status(201).json({
      success: true,
      message: `Almari "${newAlmari.almariCode} (${newAlmari.name})" created successfully in MongoDB.`,
      data: newAlmari
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAlmari = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let updated = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      updated = await AlmariModel.findByIdAndUpdate(id, req.body, { new: true });
    }
    if (!updated) {
      updated = await AlmariModel.findOneAndUpdate({ almariCode: id }, req.body, { new: true });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Almari not found' });
    }

    return res.json({
      success: true,
      message: `Almari "${updated.almariCode}" updated successfully.`,
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAlmari = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let deleted = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await AlmariModel.findByIdAndDelete(id);
    }
    if (!deleted) {
      deleted = await AlmariModel.findOneAndDelete({ almariCode: id });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Almari not found' });
    }

    return res.json({ success: true, message: 'Almari deleted from database.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
