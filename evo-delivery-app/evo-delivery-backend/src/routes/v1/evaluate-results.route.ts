import express, { Request, Response } from 'express';
import { evaluateResultsController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', evaluateResultsController.getResults);

router.get('/:id', evaluateResultsController.getById);

router.delete('/:id', evaluateResultsController.deleteById);

router.get('/draft/:id', evaluateResultsController.getByDraftId);

router.post('/', evaluateResultsController.createEvaluateResult);

router.post("/terminate/:id", evaluateResultsController.terminateById);


export { router as evaluateResultRouter };
