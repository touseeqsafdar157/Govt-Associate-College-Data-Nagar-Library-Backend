import { Request, Response } from 'express';
import { BorrowTransactionModel } from '../models/BorrowTransaction';
import { BookModel } from '../models/Book';
import { MemberModel } from '../models/Member';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { status, memberRollNo, bookId, search } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (memberRollNo) filter.memberRollNo = new RegExp(`^${memberRollNo}$`, 'i');
    if (bookId) filter.bookId = bookId;

    if (search) {
      const q = String(search).trim();
      filter.$or = [
        { transactionNo: { $regex: q, $options: 'i' } },
        { bookTitle: { $regex: q, $options: 'i' } },
        { bookAccessionNo: { $regex: q, $options: 'i' } },
        { memberName: { $regex: q, $options: 'i' } },
        { memberRollNo: { $regex: q, $options: 'i' } }
      ];
    }

    const txs = await BorrowTransactionModel.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: txs.length, data: txs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const issueBook = async (req: Request, res: Response) => {
  try {
    const { bookId, memberRollNo, dueDate, issuedByStaff } = req.body;

    if (!bookId || !memberRollNo) {
      return res.status(400).json({ success: false, message: 'Book ID and Member Roll No are required.' });
    }

    let book = null;
    if (bookId.match(/^[0-9a-fA-F]{24}$/)) {
      book = await BookModel.findById(bookId);
    }
    if (!book) {
      book = await BookModel.findOne({ accessionNo: bookId.toUpperCase() });
    }

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found in library catalog.' });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ success: false, message: `"${book.title}" has no available copies left in library shelf.` });
    }

    if (book.isReferenceOnly) {
      return res.status(400).json({ success: false, message: `"${book.title}" is Reference Only and cannot be issued for home circulation.` });
    }

    const roll = memberRollNo.toUpperCase().trim();
    const member = await MemberModel.findOne({ rollNo: roll });

    if (!member) {
      return res.status(404).json({ success: false, message: `No registered member found with Roll No "${roll}".` });
    }

    if (member.status === 'Blocked') {
      return res.status(400).json({ success: false, message: `Member ${member.name} is currently Blocked due to overdue dues.` });
    }

    if (member.issuedBooksCount >= member.maxAllowedBooks) {
      return res.status(400).json({
        success: false,
        message: `Member ${member.name} has already reached maximum issue limit of ${member.maxAllowedBooks} books.`
      });
    }

    let calculatedDueDate = dueDate;
    if (!calculatedDueDate) {
      const d = new Date();
      d.setDate(d.getDate() + (member.role === 'teacher' ? 30 : 14));
      calculatedDueDate = d.toISOString().split('T')[0];
    }

    const newTx = await BorrowTransactionModel.create({
      transactionNo: `TRX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      bookId: book.id || book._id.toString(),
      bookTitle: book.title,
      bookAccessionNo: book.accessionNo,
      almariLocation: `${book.almariNo} - ${book.shelfNo}`,
      memberId: member.id || member._id.toString(),
      memberRollNo: member.rollNo,
      memberName: member.name,
      memberClass: member.classGrade,
      memberSection: member.section,
      memberRole: member.role,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: calculatedDueDate,
      status: 'Active',
      fineAmount: 0,
      fineStatus: 'None',
      issuedByStaff: issuedByStaff || 'Chief Librarian',
      renewCount: 0
    });

    // Decrement availableCopies in MongoDB
    await BookModel.findByIdAndUpdate(book._id, { $inc: { availableCopies: -1 } });

    // Increment member issued count in MongoDB
    await MemberModel.findByIdAndUpdate(member._id, { $inc: { issuedBooksCount: 1 } });

    return res.status(201).json({
      success: true,
      message: `Book "${book.title}" issued successfully to ${member.name} (${member.rollNo})!`,
      data: newTx
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let tx = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      tx = await BorrowTransactionModel.findById(id);
    }
    if (!tx) {
      tx = await BorrowTransactionModel.findOne({ transactionNo: id });
    }

    if (!tx) {
      return res.status(404).json({ success: false, message: 'Transaction record not found.' });
    }

    if (tx.status === 'Returned') {
      return res.status(400).json({ success: false, message: 'This book has already been returned.' });
    }

    const today = new Date().toISOString().split('T')[0];
    tx.status = 'Returned';
    tx.returnDate = today;
    tx.fineStatus = tx.fineAmount > 0 ? 'Paid' : 'None';
    await tx.save();

    // Increment book availableCopies
    if (tx.bookId.match(/^[0-9a-fA-F]{24}$/)) {
      await BookModel.findByIdAndUpdate(tx.bookId, { $inc: { availableCopies: 1 } });
    } else {
      await BookModel.findOneAndUpdate({ accessionNo: tx.bookAccessionNo }, { $inc: { availableCopies: 1 } });
    }

    // Decrement member issuedBooksCount
    await MemberModel.findOneAndUpdate(
      { rollNo: tx.memberRollNo.toUpperCase() },
      { $inc: { issuedBooksCount: -1 } }
    );

    return res.json({
      success: true,
      message: `Book "${tx.bookTitle}" successfully returned and restored in MongoDB.`,
      data: tx
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const renewBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let tx = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      tx = await BorrowTransactionModel.findById(id);
    }
    if (!tx) {
      tx = await BorrowTransactionModel.findOne({ transactionNo: id });
    }

    if (!tx) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    if (tx.status === 'Returned') {
      return res.status(400).json({ success: false, message: 'Cannot renew a returned book.' });
    }

    const currentDue = new Date(tx.dueDate);
    currentDue.setDate(currentDue.getDate() + 7);
    const newDueDate = currentDue.toISOString().split('T')[0];

    tx.dueDate = newDueDate;
    tx.renewCount += 1;
    tx.status = 'Active';
    await tx.save();

    return res.json({
      success: true,
      message: `Book renewed for 7 additional days! New due date: ${newDueDate}`,
      data: tx
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const collectFine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tx = await BorrowTransactionModel.findByIdAndUpdate(
      id,
      { fineStatus: 'Paid' },
      { new: true }
    );

    if (!tx) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    return res.json({
      success: true,
      message: `Fine amount of Rs. ${tx.fineAmount} marked as Paid. Receipt logged.`,
      data: tx
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const waiveFine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tx = await BorrowTransactionModel.findByIdAndUpdate(
      id,
      { fineAmount: 0, fineStatus: 'Waived' },
      { new: true }
    );

    if (!tx) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    return res.json({
      success: true,
      message: 'Fine waived under college welfare provision.',
      data: tx
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
