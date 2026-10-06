import { Request, Response } from 'express';
import { db } from '../config/db';
import { BorrowTransaction } from '../types';

export const getTransactions = (req: Request, res: Response) => {
  const { status, memberRollNo, bookId, search } = req.query;
  let txs = db.get('transactions');

  if (status) {
    txs = txs.filter((t) => t.status.toLowerCase() === String(status).toLowerCase());
  }

  if (memberRollNo) {
    txs = txs.filter((t) => t.memberRollNo.toLowerCase() === String(memberRollNo).toLowerCase());
  }

  if (bookId) {
    txs = txs.filter((t) => t.bookId === String(bookId));
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    txs = txs.filter(
      (t) =>
        t.transactionNo.toLowerCase().includes(q) ||
        t.bookTitle.toLowerCase().includes(q) ||
        t.bookAccessionNo.toLowerCase().includes(q) ||
        t.memberName.toLowerCase().includes(q) ||
        t.memberRollNo.toLowerCase().includes(q)
    );
  }

  return res.json({ success: true, count: txs.length, data: txs });
};

export const issueBook = (req: Request, res: Response) => {
  const { bookId, memberRollNo, dueDate, issuedByStaff } = req.body;

  if (!bookId || !memberRollNo) {
    return res.status(400).json({ success: false, message: 'Book ID and Member Roll No are required.' });
  }

  const books = db.get('books');
  const book = books.find((b) => b.id === bookId || b.accessionNo.toLowerCase() === bookId.toLowerCase());
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found.' });
  }

  if (book.availableCopies <= 0) {
    return res.status(400).json({ success: false, message: `"${book.title}" has no available copies left in library shelf.` });
  }

  if (book.isReferenceOnly) {
    return res.status(400).json({ success: false, message: `"${book.title}" is Reference Only and cannot be issued for home circulation.` });
  }

  const members = db.get('members');
  const member = members.find((m) => m.rollNo.toLowerCase() === memberRollNo.toLowerCase().trim());
  if (!member) {
    return res.status(404).json({ success: false, message: `No registered member found with Roll No "${memberRollNo}".` });
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

  // Calculate default due date (14 days for students, 30 days for faculty) if not given
  let calculatedDueDate = dueDate;
  if (!calculatedDueDate) {
    const d = new Date();
    d.setDate(d.getDate() + (member.role === 'teacher' ? 30 : 14));
    calculatedDueDate = d.toISOString().split('T')[0];
  }

  const newTx: BorrowTransaction = {
    id: `tx-${Date.now()}`,
    transactionNo: `TRX-2025-${Math.floor(1000 + Math.random() * 9000)}`,
    bookId: book.id,
    bookTitle: book.title,
    bookAccessionNo: book.accessionNo,
    almariLocation: `${book.almariNo} - ${book.shelfNo}`,
    memberId: member.id,
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
  };

  // 1. Add transaction
  db.update('transactions', (current) => [newTx, ...current]);

  // 2. Decrement available copies
  db.update('books', (current) =>
    current.map((b) => (b.id === book.id ? { ...b, availableCopies: Math.max(0, b.availableCopies - 1) } : b))
  );

  // 3. Increment member's issued count
  db.update('members', (current) =>
    current.map((m) => (m.id === member.id ? { ...m, issuedBooksCount: m.issuedBooksCount + 1 } : m))
  );

  return res.status(201).json({
    success: true,
    message: `Book "${book.title}" issued successfully to ${member.name} (${member.rollNo})!`,
    data: newTx
  });
};

export const returnBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const txs = db.get('transactions');
  const tx = txs.find((t) => t.id === id || t.transactionNo === id);

  if (!tx) {
    return res.status(404).json({ success: false, message: 'Transaction record not found.' });
  }

  if (tx.status === 'Returned') {
    return res.status(400).json({ success: false, message: 'This book has already been returned.' });
  }

  const today = new Date().toISOString().split('T')[0];

  // 1. Update transaction
  const updatedTx: BorrowTransaction = {
    ...tx,
    status: 'Returned',
    returnDate: today,
    fineStatus: tx.fineAmount > 0 ? 'Paid' : 'None'
  };

  db.update('transactions', (current) => current.map((t) => (t.id === tx.id ? updatedTx : t)));

  // 2. Increment book available copies
  db.update('books', (current) =>
    current.map((b) => (b.id === tx.bookId ? { ...b, availableCopies: Math.min(b.totalCopies, b.availableCopies + 1) } : b))
  );

  // 3. Decrement member issuedBooksCount
  db.update('members', (current) =>
    current.map((m) =>
      m.id === tx.memberId || m.rollNo.toLowerCase() === tx.memberRollNo.toLowerCase()
        ? { ...m, issuedBooksCount: Math.max(0, m.issuedBooksCount - 1) }
        : m
    )
  );

  return res.json({
    success: true,
    message: `Book "${tx.bookTitle}" successfully returned and placed back on ${tx.almariLocation}.`,
    data: updatedTx
  });
};

export const renewBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const txs = db.get('transactions');
  const tx = txs.find((t) => t.id === id);

  if (!tx) {
    return res.status(404).json({ success: false, message: 'Transaction not found.' });
  }

  if (tx.status === 'Returned') {
    return res.status(400).json({ success: false, message: 'Cannot renew a returned book.' });
  }

  const currentDue = new Date(tx.dueDate);
  currentDue.setDate(currentDue.getDate() + 7);
  const newDueDate = currentDue.toISOString().split('T')[0];

  const updatedTx: BorrowTransaction = {
    ...tx,
    dueDate: newDueDate,
    renewCount: tx.renewCount + 1,
    status: 'Active' // If it was overdue, renewing extends it to active
  };

  db.update('transactions', (current) => current.map((t) => (t.id === id ? updatedTx : t)));

  return res.json({
    success: true,
    message: `Book renewed for an additional 7 days! New due date: ${newDueDate}`,
    data: updatedTx
  });
};

export const collectFine = (req: Request, res: Response) => {
  const { id } = req.params;
  const txs = db.get('transactions');
  const tx = txs.find((t) => t.id === id);

  if (!tx) {
    return res.status(404).json({ success: false, message: 'Transaction not found.' });
  }

  const updatedTx: BorrowTransaction = {
    ...tx,
    fineStatus: 'Paid'
  };

  db.update('transactions', (current) => current.map((t) => (t.id === id ? updatedTx : t)));

  return res.json({
    success: true,
    message: `Fine amount of Rs. ${tx.fineAmount} marked as Paid. Receipt generated.`,
    data: updatedTx
  });
};

export const waiveFine = (req: Request, res: Response) => {
  const { id } = req.params;
  const txs = db.get('transactions');
  const tx = txs.find((t) => t.id === id);

  if (!tx) {
    return res.status(404).json({ success: false, message: 'Transaction not found.' });
  }

  const updatedTx: BorrowTransaction = {
    ...tx,
    fineAmount: 0,
    fineStatus: 'Waived'
  };

  db.update('transactions', (current) => current.map((t) => (t.id === id ? updatedTx : t)));

  return res.json({
    success: true,
    message: 'Fine waived under college welfare provision.',
    data: updatedTx
  });
};
