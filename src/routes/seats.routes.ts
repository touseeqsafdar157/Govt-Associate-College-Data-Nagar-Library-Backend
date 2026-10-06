import { Router } from 'express';
import { getSeats, bookSeat, vacateSeat } from '../controllers/seatController';

const router = Router();

router.get('/', getSeats);
router.post('/:id/book', bookSeat);
router.post('/:id/vacate', vacateSeat);

export default router;
