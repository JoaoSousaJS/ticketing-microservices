import express from 'express';
import {
    deleteOrder, getAllOrders, getOrder, newOrder,
} from '../controllers/orders';

export const router = express.Router();

router.get('/api/orders', getAllOrders);
router.post('/api/orders', newOrder);
router.get('/api/orders/:orderId', getOrder);
router.delete('/api/orders/:orderId', deleteOrder);
