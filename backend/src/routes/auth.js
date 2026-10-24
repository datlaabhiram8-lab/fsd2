import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  getCsrfToken,
  register,
  login,
  me,
  logout,
} from '../Controllers/authController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
});

router.get('/csrf', getCsrfToken);
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', requireAuth, me);
router.post('/logout', requireAuth, logout);

export default router;
