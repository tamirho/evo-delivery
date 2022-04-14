import express from 'express';
import { driverController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', driverController.getDrivers);

router.get('/:id', driverController.getDriver);

router.post('/', driverController.createDriver);

router.put('/:id', driverController.updateDriver);

router.delete('/:id', driverController.deleteDriver);

export { router as driverRouter };
