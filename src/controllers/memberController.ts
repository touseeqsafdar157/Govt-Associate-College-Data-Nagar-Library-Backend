import { Request, Response } from 'express';
import { db } from '../config/db';
import { Member } from '../types';

export const getMembers = (req: Request, res: Response) => {
  const { search, role, status, department } = req.query;
  let members = db.get('members');

  if (role) {
    members = members.filter((m) => m.role.toLowerCase() === String(role).toLowerCase());
  }

  if (status) {
    members = members.filter((m) => m.status.toLowerCase() === String(status).toLowerCase());
  }

  if (department) {
    members = members.filter((m) => m.department.toLowerCase() === String(department).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    members = members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.rollNo.toLowerCase().includes(q) ||
        m.libraryCardNo.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.classGrade.toLowerCase().includes(q)
    );
  }

  return res.json({ success: true, count: members.length, data: members });
};

export const getMemberById = (req: Request, res: Response) => {
  const { id } = req.params;
  const members = db.get('members');
  const member = members.find(
    (m) => m.id === id || m.rollNo.toLowerCase() === id.toLowerCase() || m.libraryCardNo.toLowerCase() === id.toLowerCase()
  );

  if (!member) {
    return res.status(404).json({ success: false, message: 'Member not found' });
  }

  return res.json({ success: true, data: member });
};

export const createMember = (req: Request, res: Response) => {
  const memberData: Partial<Member> = req.body;

  if (!memberData.rollNo || !memberData.name) {
    return res.status(400).json({ success: false, message: 'Roll No and Full Name are required.' });
  }

  const members = db.get('members');
  const existing = members.find((m) => m.rollNo.toLowerCase() === memberData.rollNo?.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: `Member with Roll No "${memberData.rollNo}" is already registered!` });
  }

  const newMember: Member = {
    id: `m-${Date.now()}`,
    rollNo: memberData.rollNo,
    name: memberData.name,
    fatherName: memberData.fatherName || '',
    role: (memberData.role as any) || 'student',
    email: memberData.email || `${memberData.rollNo.toLowerCase().replace(/[^a-z0-9]/g, '')}@gacdn.edu.pk`,
    phone: memberData.phone || '0300-0000000',
    classGrade: memberData.classGrade || '1st Year (General)',
    section: memberData.section || 'Section A',
    shift: (memberData.shift as any) || 'Morning',
    department: memberData.department || 'General',
    status: (memberData.status as any) || 'Active',
    issuedBooksCount: 0,
    maxAllowedBooks: memberData.role === 'teacher' ? 5 : 2,
    joinedDate: memberData.joinedDate || new Date().toISOString().split('T')[0],
    libraryCardNo: memberData.libraryCardNo || `LIB-DN-${Math.floor(1000 + Math.random() * 9000)}`
  };

  db.update('members', (current) => [newMember, ...current]);

  return res.status(201).json({
    success: true,
    message: `Member ${newMember.name} (${newMember.rollNo}) registered successfully.`,
    data: newMember
  });
};

export const updateMember = (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: Partial<Member> = req.body;
  const members = db.get('members');
  const index = members.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Member not found' });
  }

  const updated: Member = {
    ...members[index],
    ...updateData,
    id: members[index].id
  };

  db.update('members', (current) => current.map((m) => (m.id === id ? updated : m)));

  return res.json({
    success: true,
    message: `Member "${updated.name}" updated successfully.`,
    data: updated
  });
};

export const toggleMemberStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const members = db.get('members');
  const member = members.find((m) => m.id === id);

  if (!member) {
    return res.status(404).json({ success: false, message: 'Member not found' });
  }

  const newStatus = member.status === 'Active' ? 'Blocked' : 'Active';
  const updated = { ...member, status: newStatus as any };

  db.update('members', (current) => current.map((m) => (m.id === id ? updated : m)));

  return res.json({
    success: true,
    message: `Member ${member.name} is now ${newStatus}.`,
    data: updated
  });
};

export const deleteMember = (req: Request, res: Response) => {
  const { id } = req.params;
  const members = db.get('members');
  const exists = members.some((m) => m.id === id);

  if (!exists) {
    return res.status(404).json({ success: false, message: 'Member not found' });
  }

  db.update('members', (current) => current.filter((m) => m.id !== id));

  return res.json({ success: true, message: 'Member deleted from college registry.' });
};
