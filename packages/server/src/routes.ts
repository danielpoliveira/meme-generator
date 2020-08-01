import { Router } from 'express';

import MemeController from '@controllers/MemeController';

const router = Router();

router.use(MemeController)

export default router;