import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refreshtoken', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
