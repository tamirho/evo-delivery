import express from 'express';
import { draftController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', draftController.getDrafts);

router.get('/:id', draftController.getDraft);

router.post('/', draftController.createDraft);

router.post('/:id/evaluate_return', draftController.evaluateDraftWithReturn);

router.post('/:id/evaluate_update', draftController.evaluateDraftWithUpdate);

router.put('/:id', draftController.updateDraft);

router.delete('/:id', draftController.deleteDraft);

export { router as draftRouter };