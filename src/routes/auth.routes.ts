import { Router } from 'express';
import { login, getMe, updateProfile } from '../controllers/authController';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.put('/profile', updateProfile);

export default router;
