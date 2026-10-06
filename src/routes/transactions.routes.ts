import { Router } from 'express';
import {
  getTransactions,
  issueBook,
  returnBook,
  renewBook,
  collectFine,
  waiveFine
} from '../controllers/transactionController';

const router = Router();

router.get('/', getTransactions);
router.post('/issue', issueBook);
router.post('/:id/return', returnBook);
router.post('/:id/renew', renewBook);
router.post('/:id/collect-fine', collectFine);
router.post('/:id/waive-fine', waiveFine);

export default router;
