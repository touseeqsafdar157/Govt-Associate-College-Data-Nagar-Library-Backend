import { Request, Response } from 'express';
import { db } from '../config/db';
import { DigitalResource } from '../types';

export const getResources = (req: Request, res: Response) => {
  const { search, type, classGrade } = req.query;
  let resources = db.get('resources');

  if (type && type !== 'All') {
    resources = resources.filter((r) => r.type === type);
  }

  if (classGrade && classGrade !== 'All') {
    resources = resources.filter((r) => r.classGrade.includes(String(classGrade)));
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    resources = resources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.boardOrUniversity.toLowerCase().includes(q)
    );
  }

  return res.json({ success: true, count: resources.length, data: resources });
};

export const createResource = (req: Request, res: Response) => {
  const resData: Partial<DigitalResource> = req.body;

  if (!resData.title || !resData.subject) {
    return res.status(400).json({ success: false, message: 'Title and Subject are required.' });
  }

  const newResource: DigitalResource = {
    id: `dr-${Date.now()}`,
    title: resData.title,
    type: (resData.type as any) || 'Past Paper',
    subject: resData.subject,
    classGrade: resData.classGrade || '1st Year (General)',
    boardOrUniversity: resData.boardOrUniversity || 'BISE Lahore',
    year: resData.year || '2024',
    pages: Number(resData.pages) || 10,
    fileSizeMb: Number(resData.fileSizeMb) || 2.5,
    downloadUrl: resData.downloadUrl || '#',
    viewsCount: 0
  };

  db.update('resources', (current) => [newResource, ...current]);

  return res.status(201).json({
    success: true,
    message: `Digital resource "${newResource.title}" added to archives.`,
    data: newResource
  });
};

export const incrementView = (req: Request, res: Response) => {
  const { id } = req.params;
  const resources = db.get('resources');
  const resItem = resources.find((r) => r.id === id);

  if (!resItem) {
    return res.status(404).json({ success: false, message: 'Resource not found' });
  }

  const updated: DigitalResource = {
    ...resItem,
    viewsCount: resItem.viewsCount + 1
  };

  db.update('resources', (current) => current.map((r) => (r.id === id ? updated : r)));

  return res.json({ success: true, data: updated });
};

export const deleteResource = (req: Request, res: Response) => {
  const { id } = req.params;
  db.update('resources', (current) => current.filter((r) => r.id !== id));
  return res.json({ success: true, message: 'Resource removed.' });
};
