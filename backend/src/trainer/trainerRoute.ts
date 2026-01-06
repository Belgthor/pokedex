import { Router } from 'express';
import * as controller from './trainerController';

const router = Router();

// Public trainer endpoints
router.get('/trainer', controller.trainer);
router.get('/trainer/:name', controller.findOneTrainer);

export default router;