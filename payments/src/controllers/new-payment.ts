import {
    BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus,
} from '@htickets/common';
import { Request, Response } from 'express';
import { Order } from '../models/order/order';
import { stripe } from '../utils/stripe/stripe';

export const newPayment = async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser.id) {
        throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
        throw new BadRequestError('Can not pay for a cancelled order');
    }

    await stripe.charges.create({
        currency: 'usd',
        amount: order.price * 100,
        source: token,
    });

    res.status(201).send({ success: true });
};
