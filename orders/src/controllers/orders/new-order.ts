import { BadRequestError, NotFoundError, OrderStatus } from '@htickets/common';
import { Request, Response } from 'express';
import { Order } from '../../models/orders/orders';
import { Ticket } from '../../models/tickets/tickets';

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

export const newOrder = async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();

    if (isReserved) {
        throw new BadRequestError('Thicket is already reserved');
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.create({
        userId: req.currentUser.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket,
    });

    res.status(201).send(order);
};
