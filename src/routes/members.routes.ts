import { Router } from 'express';
import {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  toggleMemberStatus,
  deleteMember
} from '../controllers/memberController';

const router = Router();

router.get('/', getMembers);
router.get('/:id', getMemberById);
router.post('/', createMember);
router.put('/:id', updateMember);
router.patch('/:id/toggle-status', toggleMemberStatus);
router.delete('/:id', deleteMember);

export default router;
