import {
    BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus,
} from '@htickets/common';
import { Request, Response } from 'express';
import { PaymentCreatedPublisher } from '../events/publisher/payment-created-publisher';
import { Order } from '../models/order/order';
import { Payment } from '../models/payment/payment';
import { natsWrapper } from '../nats-wrapper';
import { stripe } from '../utils/stripe/stripe';

export const newPayment = async (req: Request, res: Response) => {
    const { orderId } = req.body;

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

    const charge = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: order.price * 100,
        payment_method_types: ['card'],
        metadata: {
            order_id: order.id,
        },
    });

    if (!charge) {
        throw new BadRequestError('Something has happened');
    }

    const payment = Payment.build({
        orderId,
        stripeId: charge.id,
    });

    await payment.save();
    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId,
    });

    res.status(201).send({ id: payment.id });
};
