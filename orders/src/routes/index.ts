import express from 'express';
import { getAllOrders } from '../controllers/orders/get-all-orders';

export const router = express.Router();

router.get('/api/orders', getAllOrders);
