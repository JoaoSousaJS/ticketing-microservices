import { BadRequestError, NotFoundError, OrderStatus } from '@htickets/common';
import { Request, Response } from 'express';
import { Order } from '../../models/orders/orders';
import { Ticket } from '../../models/tickets/tickets';

export const newOrder = async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new NotFoundError();
    }

    const existingOrder = await Order.findOne({
        ticket,
        status: {
            $in: [OrderStatus.Created, OrderStatus.AwaitingPament, OrderStatus.Complete],
        },
    });

    if (existingOrder) {
        throw new BadRequestError('Thicket is already reserved');
    }
    res.send({});
};
