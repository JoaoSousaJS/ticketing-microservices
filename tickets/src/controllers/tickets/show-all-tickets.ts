import { NotFoundError } from '@htickets/common';
import { Request, Response } from 'express';
import { Ticket } from '../../database/model/ticket';

export const showAllTickets = async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});

    if (!tickets) {
        throw new NotFoundError();
    }

    res.send(tickets);
};
