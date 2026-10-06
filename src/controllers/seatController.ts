import { Request, Response } from 'express';
import { SeatModel } from '../models/Seat';

export const getSeats = async (req: Request, res: Response) => {
  try {
    const seats = await SeatModel.find().sort({ seatId: 1 });
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
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const bookSeat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rollNo, studentName, bookedUntil } = req.body;
    const seatNum = Number(id);

    let seat = await SeatModel.findOne({ seatId: seatNum });
    if (!seat) {
      seat = await SeatModel.findById(id);
    }

    if (!seat) {
      return res.status(404).json({ success: false, message: 'Reading desk not found.' });
    }

    if (seat.status === 'Occupied') {
      return res.status(400).json({
        success: false,
        message: `Desk ${seat.seatNumber} is currently occupied by ${seat.currentOccupantName || 'another student'}.`
      });
    }

    seat.status = 'Occupied';
    seat.currentOccupantRollNo = rollNo || 'Walk-in Student';
    seat.currentOccupantName = studentName || 'Student Desk';
    seat.bookedUntil = bookedUntil || '04:00 PM';
    await seat.save();

    return res.json({
      success: true,
      message: `Desk ${seat.seatNumber} confirmed in MongoDB for ${studentName || rollNo || 'Student'} today!`,
      data: seat
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const vacateSeat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seatNum = Number(id);

    let seat = await SeatModel.findOne({ seatId: seatNum });
    if (!seat) {
      seat = await SeatModel.findById(id);
    }

    if (!seat) {
      return res.status(404).json({ success: false, message: 'Seat not found.' });
    }

    seat.status = 'Available';
    seat.currentOccupantRollNo = undefined;
    seat.currentOccupantName = undefined;
    seat.bookedUntil = undefined;
    await seat.save();

    return res.json({
      success: true,
      message: `Desk ${seat.seatNumber} is now vacant and available.`,
      data: seat
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
