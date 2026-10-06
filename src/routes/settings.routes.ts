import { Router } from 'express';
import { getSettings, updateSettings, addStaffMember, deleteStaffMember } from '../controllers/settingsController';

const router = Router();

router.get('/', getSettings);
router.put('/', updateSettings);
router.post('/staff', addStaffMember);
router.delete('/staff/:index', deleteStaffMember);

export default router;
