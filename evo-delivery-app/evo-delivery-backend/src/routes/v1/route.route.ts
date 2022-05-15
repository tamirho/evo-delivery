import express, { Request, Response } from 'express';
import { routeController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', routeController.getRoutes);

router.get('/:id', routeController.getRoute);

router.delete('/:id', routeController.deleteRoute);

export { router as routeRouter };
