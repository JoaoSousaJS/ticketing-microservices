import { NotAuthorizedError, NotFoundError } from '@htickets/common';
import { Request, Response } from 'express';
import { Ticket } from '../../database/model/ticket';
import { TicketUpdatedPublisher } from '../../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

export const updateTicket = async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    if (req.currentUser.id !== ticket.userId) {
        throw new NotAuthorizedError();
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price,
    });

    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
    });
    res.send(ticket);
};
