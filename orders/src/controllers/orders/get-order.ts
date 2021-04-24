import { NotAuthorizedError, NotFoundError } from '@htickets/common';
import { Request, Response } from 'express';
import { Order } from '../../models/orders/orders';

export const getOrder = async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser.id) {
        throw new NotAuthorizedError();
    }

    res.send(order);
};
