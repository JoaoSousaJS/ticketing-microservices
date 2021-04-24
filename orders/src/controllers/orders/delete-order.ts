import { NotAuthorizedError, NotFoundError, OrderStatus } from '@htickets/common';
import { Request, Response } from 'express';
import { Order } from '../../models/orders/orders';

export const deleteOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser.id) {
        throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;

    await order.save();
    res.status(204).send(order);
};
