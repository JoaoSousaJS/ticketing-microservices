import { BadRequestError, NotFoundError } from '@htickets/common';
import { Request, Response } from 'express';
import { Ticket } from '../../models/tickets/tickets';

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
    res.send({});
};
