import express from 'express';
import { v1Router } from './v1';

const router = express.Router({ mergeParams: true });
router.use('/v1', v1Router);

export { router as apiRouter };
