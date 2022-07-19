import express from 'express';
import { locationController } from '../../controllers';
import {query} from 'express-validator'

const router = express.Router({ mergeParams: true });

router.get('/', locationController.geFullLocation);

export { router as locationsRouter };
