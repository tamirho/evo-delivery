import express from 'express';
import { orderRouter } from './order.route';
import { driverRouter } from './driver.route';
import { evaluateResultRouter } from './evaluate-results.route';
import { eaEngineRouter } from './ea-engine.route';
import { draftRouter } from './draft.route';
import { depotRouter } from './depot.route';
import { locationsRouter } from './locations.route';
import { seedDbRouter } from './seed-db.route';

const router = express.Router({ mergeParams: true });
router.use('/orders', orderRouter);
router.use('/drivers', driverRouter);
router.use('/results', evaluateResultRouter);
router.use('/ea-engine', eaEngineRouter);
router.use('/drafts', draftRouter);
router.use('/depots', depotRouter);
router.use('/locations', locationsRouter);
router.use('/seed', seedDbRouter);

export { router as v1Router };
