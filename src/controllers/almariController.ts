import { Request, Response } from 'express';
import { db } from '../config/db';
import { Almari } from '../types';

export const getAlmaris = (req: Request, res: Response) => {
  const almaris = db.get('almaris');
  return res.json({ success: true, count: almaris.length, data: almaris });
};

export const createAlmari = (req: Request, res: Response) => {
  const { almariCode, name, department, locationDesc, shelves } = req.body;

  if (!almariCode || !name) {
    return res.status(400).json({ success: false, message: 'Almari Code and Name are required.' });
  }

  const newAlmari: Almari = {
    id: `alm-${Date.now()}`,
    almariCode,
    name,
    department: department || 'General',
    locationDesc: locationDesc || 'Main Hall',
    shelves: Array.isArray(shelves) && shelves.length > 0 ? shelves : ['Shelf 1 (Top)', 'Shelf 2 (Middle)', 'Shelf 3 (Bottom)']
  };

  db.update('almaris', (current) => [newAlmari, ...current]);

  return res.status(201).json({
    success: true,
    message: `Almari "${newAlmari.almariCode} (${newAlmari.name})" created successfully.`,
    data: newAlmari
  });
};

export const updateAlmari = (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: Partial<Almari> = req.body;
  const almaris = db.get('almaris');
  const index = almaris.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Almari not found' });
  }

  const updated: Almari = {
    ...almaris[index],
    ...updateData,
    id: almaris[index].id
  };

  db.update('almaris', (current) => current.map((a) => (a.id === id ? updated : a)));

  return res.json({
    success: true,
    message: `Almari "${updated.almariCode}" updated successfully.`,
    data: updated
  });
};

export const deleteAlmari = (req: Request, res: Response) => {
  const { id } = req.params;
  const almaris = db.get('almaris');
  const exists = almaris.some((a) => a.id === id);

  if (!exists) {
    return res.status(404).json({ success: false, message: 'Almari not found' });
  }

  db.update('almaris', (current) => current.filter((a) => a.id !== id));

  return res.json({ success: true, message: 'Almari deleted successfully.' });
};
