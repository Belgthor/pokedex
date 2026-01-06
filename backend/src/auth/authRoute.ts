import { Router } from 'express';
import * as authController from './authController';

const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.refresh);
router.post('/auth/changepw', authController.changePW);

export default router;