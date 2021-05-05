/* eslint-disable no-undef */

import { OrderCreatedEvent, OrderStatus } from '@htickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order/order';
import { natsWrapper } from '../../../nats-wrapper';
import { clear, close, connect } from '../../../test/setup';
import { OrderCreatedListener } from '../order-created-listener';

jest.mock('../../../nats-wrapper');

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data:OrderCreatedEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt: 'asda',
        userId: 'asd',
        status: OrderStatus.Created,
        ticket: {
            id: 'asdf',
            price: 10,
        },
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return { listener, data, msg };
};

describe('Order Created listener', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should replicate the order info', async () => {
        const { listener, data, msg } = await setup();

        await listener.onMessage(data, msg);

        const order = await Order.findById(data.id);

        expect(order.price).toEqual(data.ticket.price);
    });
});
