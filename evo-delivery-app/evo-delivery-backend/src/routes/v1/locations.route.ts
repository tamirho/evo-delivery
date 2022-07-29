import express from 'express';
import { locationController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', locationController.geFullLocation);

export { router as locationsRouter };
