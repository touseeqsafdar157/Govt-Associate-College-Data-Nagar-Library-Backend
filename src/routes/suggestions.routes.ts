import { Router } from 'express';
import {
  getSuggestions,
  createSuggestion,
  updateSuggestionStatus,
  deleteSuggestion
} from '../controllers/suggestionController';

const router = Router();

router.get('/', getSuggestions);
router.post('/', createSuggestion);
router.patch('/:id/status', updateSuggestionStatus);
router.delete('/:id', deleteSuggestion);

export default router;
