import { Request, Response } from 'express';
import { LibrarySettingsModel } from '../models/LibrarySettings';
import { INITIAL_SETTINGS } from '../data/seedData';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await LibrarySettingsModel.findOne();
    if (!settings) {
      settings = await LibrarySettingsModel.create(INITIAL_SETTINGS);
    }
    return res.json({ success: true, data: settings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = await LibrarySettingsModel.findOne();
    if (!settings) {
      settings = await LibrarySettingsModel.create({
        ...INITIAL_SETTINGS,
        ...req.body
      });
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    return res.json({
      success: true,
      message: 'Library configuration & rules updated successfully in MongoDB.',
      data: settings
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addStaffMember = async (req: Request, res: Response) => {
  try {
    const { name, designation, shift, desk, phone, email } = req.body;
    if (!name || !designation) {
      return res.status(400).json({ success: false, message: 'Name and designation are required.' });
    }

    let settings = await LibrarySettingsModel.findOne();
    if (!settings) {
      settings = await LibrarySettingsModel.create(INITIAL_SETTINGS);
    }

    settings.staffMembers.push({ name, designation, shift: shift || 'Morning', desk: desk || 'General Desk', phone, email });
    await settings.save();

    return res.status(201).json({
      success: true,
      message: `Staff member "${name}" added to library directory.`,
      data: settings
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStaffMember = async (req: Request, res: Response) => {
  try {
    const { index } = req.params;
    const idx = Number(index);

    let settings = await LibrarySettingsModel.findOne();
    if (!settings) {
      return res.status(404).json({ success: false, message: 'Settings not found' });
    }

    settings.staffMembers.splice(idx, 1);
    await settings.save();

    return res.json({
      success: true,
      message: 'Staff member removed from directory.',
      data: settings
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
