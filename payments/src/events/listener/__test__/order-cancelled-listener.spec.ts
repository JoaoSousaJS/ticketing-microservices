/* eslint-disable no-undef */

import { OrderCancelledEvent, OrderStatus } from '@htickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order/order';
import { natsWrapper } from '../../../nats-wrapper';
import { clear, close, connect } from '../../../test/setup';
import { OrderCancelledListener } from '../order-cancelled-listener';

jest.mock('../../../nats-wrapper');

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Cancelled,
        price: 10,
        userId: '1213',
        version: 0,
    });

    await order.save();

    const data:OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        ticket: {
            id: 'asda',
        },
    };

    // @ts-ignore
    const msg:Message = {
        ack: jest.fn(),
    };

    return {
        listener, order, data, msg,
    };
};

describe('Order Cancelled listener', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should update the status of the order', async () => {
        const {
            listener, data, msg, order,
        } = await setup();

        await listener.onMessage(data, msg);

        const updatedOrder = await Order.findById(order.id);

        expect(updatedOrder.status).toEqual(order.status);
    });

    it('should ack the message', async () => {
        const {
            listener, data, msg,
        } = await setup();

        await listener.onMessage(data, msg);

        expect(msg.ack).toHaveBeenCalled();
    });
});
