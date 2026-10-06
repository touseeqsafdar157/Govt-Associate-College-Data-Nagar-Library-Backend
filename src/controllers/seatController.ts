import { Request, Response } from 'express';
import { db } from '../config/db';
import { ReadingRoomSeat } from '../types';

export const getSeats = (req: Request, res: Response) => {
  const seats = db.get('seats');
  const availableCount = seats.filter((s) => s.status === 'Available').length;
  const occupiedCount = seats.filter((s) => s.status === 'Occupied').length;
  const reservedCount = seats.filter((s) => s.status === 'Reserved').length;

  return res.json({
    success: true,
    total: seats.length,
    availableCount,
    occupiedCount,
    reservedCount,
    data: seats
  });
};

export const bookSeat = (req: Request, res: Response) => {
  const { id } = req.params;
  const { rollNo, studentName, bookedUntil } = req.body;
  const seatId = Number(id);

  const seats = db.get('seats');
  const seat = seats.find((s) => s.id === seatId);

  if (!seat) {
    return res.status(404).json({ success: false, message: 'Reading desk not found.' });
  }

  if (seat.status === 'Occupied') {
    return res.status(400).json({
      success: false,
      message: `Desk ${seat.seatNumber} is currently occupied by ${seat.currentOccupantName || 'another student'}.`
    });
  }

  const updatedSeat: ReadingRoomSeat = {
    ...seat,
    status: 'Occupied',
    currentOccupantRollNo: rollNo || 'Walk-in Student',
    currentOccupantName: studentName || 'Student Desk',
    bookedUntil: bookedUntil || '04:00 PM'
  };

  db.update('seats', (current) => current.map((s) => (s.id === seatId ? updatedSeat : s)));

  return res.json({
    success: true,
    message: `Desk ${seat.seatNumber} confirmed for ${studentName || rollNo || 'Student'} today!`,
    data: updatedSeat
  });
};

export const vacateSeat = (req: Request, res: Response) => {
  const { id } = req.params;
  const seatId = Number(id);

  const seats = db.get('seats');
  const seat = seats.find((s) => s.id === seatId);

  if (!seat) {
    return res.status(404).json({ success: false, message: 'Seat not found.' });
  }

  const updatedSeat: ReadingRoomSeat = {
    ...seat,
    status: 'Available',
    currentOccupantRollNo: undefined,
    currentOccupantName: undefined,
    bookedUntil: undefined
  };

  db.update('seats', (current) => current.map((s) => (s.id === seatId ? updatedSeat : s)));

  return res.json({
    success: true,
    message: `Desk ${seat.seatNumber} is now vacant and available.`,
    data: updatedSeat
  });
};
