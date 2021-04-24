import mongoose from 'mongoose';
import { requireAuth, validateRequest } from '@htickets/common';
import express from 'express';
import { body } from 'express-validator';
import {
    deleteOrder, getAllOrders, getOrder, newOrder,
} from '../controllers/orders';

export const router = express.Router();

router.post('/api/orders', requireAuth, validateRequest, [
    body('ticketId').notEmpty().custom((input:string) => mongoose.Types.ObjectId.isValid(input)).withMessage('TicketId must be provided'),
], newOrder);
router.get('/api/orders', getAllOrders);
router.get('/api/orders/:orderId', getOrder);
router.delete('/api/orders/:orderId', deleteOrder);
