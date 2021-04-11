import { requireAuth, validateRequest } from '@htickets/common';
import express from 'express';
import { body } from 'express-validator';
import { newTicket, showTicket } from '../controllers/tickets';

export const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').notEmpty().isFloat({
        gt: 0,
    }).withMessage('Price is required'),
], validateRequest, newTicket);

router.get('/api/tickets/:id', requireAuth, showTicket);
