import { Router } from 'express';
import {
  getAlmaris,
  createAlmari,
  updateAlmari,
  deleteAlmari
} from '../controllers/almariController';

const router = Router();

router.get('/', getAlmaris);
router.post('/', createAlmari);
router.put('/:id', updateAlmari);
router.delete('/:id', deleteAlmari);

export default router;
