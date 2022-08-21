import express from 'express';
import { depotController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', depotController.getDepots);

router.get('/:id', depotController.getDepot);

router.post('/', depotController.createDepot);

router.put('/:id', depotController.updateDepot);

router.delete('/:id', depotController.deleteDepot);

export { router as depotRouter };
