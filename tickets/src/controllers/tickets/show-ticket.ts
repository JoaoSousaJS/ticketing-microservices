import { NotFoundError } from '@htickets/common';
import { Request, Response } from 'express';
import { Ticket } from '../../database/model/ticket';

export const showTicket = async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    res.send(ticket);
};
