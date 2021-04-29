import { BadRequestError, NotFoundError, OrderStatus } from '@htickets/common';
import { Request, Response } from 'express';
import { OrderCreatedPublisher } from '../../events/publishers/order-created-publisher';
import { Order } from '../../models/orders/orders';
import { Ticket } from '../../models/tickets/tickets';
import { natsWrapper } from '../../nats-wrapper';

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

    const order = await Order.create({
        userId: req.currentUser.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket,
    });
    // @ts-ignore
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        version: order.version,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: ticket.id,
            price: ticket.price,
        },
    });

    res.status(201).send(order);
};
