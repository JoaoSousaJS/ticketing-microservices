/* eslint-disable no-undef */

import { ExpirationCompleteEvent, OrderStatus } from '@htickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/orders/orders';
import { Ticket } from '../../../models/tickets/tickets';
import { natsWrapper } from '../../../nats-wrapper';
import { clear, close, connect } from '../../../test/setup';
import { ExpirationCompleteListener } from '../expiration-complete-listener';

jest.mock('../../../nats-wrapper');

const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = await Ticket.create({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    });

    await ticket.save();

    const order = await Order.create({
        userId: '1234',
        status: OrderStatus.Created,
        expiresAt: new Date(),
        ticket,
    });

    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id,
    };
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return {
        listener, order, ticket, data, msg,
    };
};

describe('Ticket Created listener', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('Should update the order status to cancelled', async () => {
        const {
            listener, order, data, msg,
        } = await setup();

        await listener.onMessage(data, msg);

        const updateOrde = await Order.findById(order.id);

        expect(updateOrde.status).toEqual(OrderStatus.Cancelled);
    });

    it('should emit an OrderCancelled event', async () => {
        const {
            listener, order, data, msg,
        } = await setup();

        await listener.onMessage(data, msg);

        expect(natsWrapper.client.publish).toHaveBeenCalled();

        const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

        expect(eventData.id).toEqual(order.id);
    });

    it('ack the message', async () => {
        const {
            listener, order, ticket, data, msg,
        } = await setup();

        await listener.onMessage(data, msg);
    });
});
