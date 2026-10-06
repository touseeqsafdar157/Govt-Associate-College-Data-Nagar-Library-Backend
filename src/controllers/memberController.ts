import { Request, Response } from 'express';
import { MemberModel } from '../models/Member';

export const getMembers = async (req: Request, res: Response) => {
  try {
    const { search, role, status, department } = req.query;
    const filter: any = {};

    if (role) filter.role = role;
    if (status) filter.status = status;
    if (department) filter.department = new RegExp(`^${department}$`, 'i');

    if (search) {
      const q = String(search).trim();
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { rollNo: { $regex: q, $options: 'i' } },
        { libraryCardNo: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
        { classGrade: { $regex: q, $options: 'i' } }
      ];
    }

    const members = await MemberModel.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: members.length, data: members });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let member = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      member = await MemberModel.findById(id);
    }
    if (!member) {
      member = await MemberModel.findOne({
        $or: [{ rollNo: id.toUpperCase() }, { libraryCardNo: id.toUpperCase() }]
      });
    }

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found in database' });
    }

    return res.json({ success: true, data: member });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const memberData = req.body;

    if (!memberData.rollNo || !memberData.name) {
      return res.status(400).json({ success: false, message: 'Roll No and Full Name are required.' });
    }

    const roll = memberData.rollNo.toUpperCase().trim();
    const existing = await MemberModel.findOne({ rollNo: roll });
    if (existing) {
      return res.status(400).json({ success: false, message: `Member with Roll No "${roll}" is already registered!` });
    }

    const newMember = await MemberModel.create({
      ...memberData,
      rollNo: roll,
      email: memberData.email || `${roll.toLowerCase().replace(/[^a-z0-9]/g, '')}@gacdn.edu.pk`,
      phone: memberData.phone || '0300-0000000',
      maxAllowedBooks: memberData.role === 'teacher' ? 5 : 2,
      issuedBooksCount: 0,
      libraryCardNo: memberData.libraryCardNo || `LIB-DN-${Math.floor(1000 + Math.random() * 9000)}`
    });

    return res.status(201).json({
      success: true,
      message: `Member ${newMember.name} (${newMember.rollNo}) registered successfully in MongoDB.`,
      data: newMember
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let updated = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      updated = await MemberModel.findByIdAndUpdate(id, req.body, { new: true });
    }
    if (!updated) {
      updated = await MemberModel.findOneAndUpdate({ rollNo: id.toUpperCase() }, req.body, { new: true });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    return res.json({
      success: true,
      message: `Member "${updated.name}" updated successfully.`,
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleMemberStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let member = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      member = await MemberModel.findById(id);
    }
    if (!member) {
      member = await MemberModel.findOne({ rollNo: id.toUpperCase() });
    }

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    member.status = member.status === 'Active' ? 'Blocked' : 'Active';
    await member.save();

    return res.json({
      success: true,
      message: `Member ${member.name} is now ${member.status}.`,
      data: member
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let deleted = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await MemberModel.findByIdAndDelete(id);
    }
    if (!deleted) {
      deleted = await MemberModel.findOneAndDelete({ rollNo: id.toUpperCase() });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    return res.json({ success: true, message: 'Member deleted from college registry.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
