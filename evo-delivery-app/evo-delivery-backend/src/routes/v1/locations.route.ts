import express from 'express';
import { locationController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', locationController.getFullLocation);
router.get('/route', locationController.getFullRoute);

export { router as locationsRouter };
