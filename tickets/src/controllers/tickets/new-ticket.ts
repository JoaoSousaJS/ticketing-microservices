import { Request, Response } from 'express';
import { Ticket } from '../../database/model/ticket';

export const newTicket = async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = await Ticket.create({
        title,
        price,
        userId: req.currentUser.id,
    });

    await ticket.save();

    res.status(201).send(ticket);
};
