import express from 'express';
import { orderController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/', orderController.getOrders);

router.get('/:id', orderController.getOrder);

router.post('/', orderController.createOrder);

router.put('/:id', orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);

export { router as orderRouter };
