import express from 'express';
import { evaluateController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.post('/', evaluateController.evaluate);

export { router as evaluateRouter };
