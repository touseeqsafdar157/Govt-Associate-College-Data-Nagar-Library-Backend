import { Router } from 'express';
import { getFeedback, submitFeedback } from '../controllers/feedbackController';

const router = Router();

router.get('/', getFeedback);
router.post('/', submitFeedback);

export default router;
