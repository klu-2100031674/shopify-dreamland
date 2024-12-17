import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  registerUser,
  loginUser,
  verifyEmail,
  getUserProfile,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);
router.get('/profile', protect, getUserProfile);

export default router;