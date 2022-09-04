import express from 'express';
import { seedDbController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', seedDbController.seedDB);

export { router as seedDbRouter };
