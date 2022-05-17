import express from 'express';
import { driverController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', driverController.getDrivers);

router.get('/:id', driverController.getDriver);

export { router as driverRouter };
