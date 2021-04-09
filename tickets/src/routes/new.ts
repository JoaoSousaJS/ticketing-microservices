import { requireAuth } from '@htickets/common';
import express from 'express';
import { newTicket } from '../controllers/tickets/new-ticket';

export const router = express.Router();

router.post('/api/tickets', requireAuth, newTicket);
