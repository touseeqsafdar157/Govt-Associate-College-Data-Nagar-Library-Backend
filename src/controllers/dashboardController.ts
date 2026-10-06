import { Request, Response } from 'express';
import { db } from '../config/db';

export const getDashboardStats = (req: Request, res: Response) => {
  const books = db.get('books');
  const members = db.get('members');
  const transactions = db.get('transactions');
  const seats = db.get('seats');
  const suggestions = db.get('suggestions');
  const almaris = db.get('almaris');

  const totalTitles = books.length;
  const totalBookCopies = books.reduce((acc, b) => acc + (b.totalCopies || 0), 0);
  const availableCopies = books.reduce((acc, b) => acc + (b.availableCopies || 0), 0);
  const issuedCopies = totalBookCopies - availableCopies;

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === 'Active').length;
  const blockedMembers = members.filter((m) => m.status === 'Blocked').length;
  const studentMembers = members.filter((m) => m.role === 'student').length;
  const teacherMembers = members.filter((m) => m.role === 'teacher').length;

  const activeIssues = transactions.filter((t) => t.status === 'Active').length;
  const overdueIssues = transactions.filter((t) => t.status === 'Overdue').length;
  const returnedIssues = transactions.filter((t) => t.status === 'Returned').length;

  const pendingFines = transactions
    .filter((t) => t.fineStatus === 'Pending')
    .reduce((acc, t) => acc + (t.fineAmount || 0), 0);

  const collectedFines = transactions
    .filter((t) => t.fineStatus === 'Paid')
    .reduce((acc, t) => acc + (t.fineAmount || 0), 0);

  const occupiedSeats = seats.filter((s) => s.status === 'Occupied').length;
  const availableSeats = seats.filter((s) => s.status === 'Available').length;
  const totalSeats = seats.length;

  const pendingSuggestions = suggestions.filter((s) => s.status === 'Pending').length;

  // Department distribution
  const departmentCounts: Record<string, number> = {};
  books.forEach((b) => {
    departmentCounts[b.department] = (departmentCounts[b.department] || 0) + (b.totalCopies || 1);
  });

  return res.json({
    success: true,
    data: {
      books: {
        totalTitles,
        totalCopies: totalBookCopies,
        availableCopies,
        issuedCopies
      },
      members: {
        total: totalMembers,
        active: activeMembers,
        blocked: blockedMembers,
        students: studentMembers,
        teachers: teacherMembers
      },
      circulation: {
        totalTransactions: transactions.length,
        activeIssues,
        overdueIssues,
        returnedIssues,
        pendingFines,
        collectedFines
      },
      seats: {
        total: totalSeats,
        occupied: occupiedSeats,
        available: availableSeats,
        occupancyRate: totalSeats > 0 ? Math.round((occupiedSeats / totalSeats) * 100) : 0
      },
      almarisCount: almaris.length,
      pendingSuggestions,
      departmentDistribution: departmentCounts,
      recentTransactions: transactions.slice(0, 5)
    }
  });
};
