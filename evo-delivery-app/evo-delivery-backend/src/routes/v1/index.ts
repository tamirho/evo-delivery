import express from 'express';
import { orderRouter } from './order.route';
import { driverRouter } from './driver.route';
import { routeRouter } from './route.route';
import { eaEngineRouter } from './ea-engine.route';
import { draftRouter } from './draft.route';
import {depotRouter} from "./depot.route";

const router = express.Router({ mergeParams: true });
router.use('/orders', orderRouter);
router.use('/drivers', driverRouter);
router.use('/routes', routeRouter);
router.use('/ea-engine', eaEngineRouter)
router.use('/drafts', draftRouter);
router.use('/depots', depotRouter);


export { router as v1Router };
