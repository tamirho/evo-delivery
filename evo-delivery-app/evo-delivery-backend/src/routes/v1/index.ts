import express from 'express';
import { orderRouter } from './order.route';
import { driverRouter } from './driver.route';
import { routeRouter } from './route.route';

const router = express.Router({ mergeParams: true });
router.use('/orders', orderRouter);
router.use('/drivers', driverRouter);
router.use('/routes', routeRouter);

export { router as v1Router };
