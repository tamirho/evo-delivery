import express from 'express';
import { eaEngineController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/:componentType/details', eaEngineController.getComponentDetails);

export { router as eaEngineRouter };
