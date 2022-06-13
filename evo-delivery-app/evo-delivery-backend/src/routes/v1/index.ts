import express from 'express';
import { orderRouter } from './order.route';
import { driverRouter } from './driver.route';
import { routeRouter } from './route.route';
import { eaEngineRouter } from './ea-engine.route';
import { draftRouter } from './draft.route';

const router = express.Router({ mergeParams: true });
router.use('/orders', orderRouter);
router.use('/drivers', driverRouter);
router.use('/routes', routeRouter);
router.use('/ea-engine', eaEngineRouter)
router.use('/drafts', draftRouter);


export { router as v1Router };
