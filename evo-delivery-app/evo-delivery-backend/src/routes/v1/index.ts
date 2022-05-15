import express from 'express';
import { orderRouter } from './order.route';
import { driverRouter } from './driver.route';
import { routeRouter } from './route.route';
import { evaluateRouter } from './evaluate.route';

const router = express.Router({ mergeParams: true });
router.use('/orders', orderRouter);
router.use('/drivers', driverRouter);
router.use('/routes', routeRouter);
router.use('/evaluate', evaluateRouter)

export { router as v1Router };
