import { requireAuth } from '@htickets/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { newPayment } from '../controllers';

export const router = Router();

router.post('/api/payments', requireAuth, [
    body('token').notEmpty(),
    body('orderId').notEmpty(),
], newPayment);
