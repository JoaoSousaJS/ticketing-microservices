import { NotAuthorizedError, NotFoundError } from '@htickets/common';
import { Request, Response } from 'express';
import { Ticket } from '../../database/model/ticket';

export const updateTicket = async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    if (req.currentUser.id !== ticket.userId) {
        throw new NotAuthorizedError();
    }

    res.send(ticket);
};
