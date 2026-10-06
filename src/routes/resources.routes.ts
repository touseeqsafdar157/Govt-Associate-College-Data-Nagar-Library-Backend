import { Router } from 'express';
import {
  getResources,
  createResource,
  incrementView,
  deleteResource
} from '../controllers/resourceController';

const router = Router();

router.get('/', getResources);
router.post('/', createResource);
router.post('/:id/view', incrementView);
router.delete('/:id', deleteResource);

export default router;
