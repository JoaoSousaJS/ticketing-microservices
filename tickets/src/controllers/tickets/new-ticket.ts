import { Request, Response } from 'express';
import { Ticket } from '../../database/model/ticket';
import { TicketCreatedPublisher } from '../../events/publishers/ticket-created-publisher';
import { natsWrapper } from '../../nats-wrapper';

export const newTicket = async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = await Ticket.create({
        title,
        price,
        userId: req.currentUser.id,
    });

    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
    });

    res.status(201).send(ticket);
};
