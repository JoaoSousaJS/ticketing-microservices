/* eslint-disable no-undef */

import { OrderCancelledEvent } from '@htickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../database/model/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { clear, close, connect } from '../../../test/setup';
import { OrderCancelledListener } from '../order-cancelled-listener';

jest.mock('../../../nats-wrapper');

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = mongoose.Types.ObjectId().toHexString();
    const ticket = await Ticket.create({
        title: 'concert',
        price: 20,
        userId: 'asdf',
    });

    ticket.set({ orderId });
    await ticket.save();

    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id,
        },
    };
    // @ts-ignore
    const msg:Message = {
        ack: jest.fn(),
    };

    return {
        msg, data, ticket, orderId, listener,
    };
};

describe('Order Created Listener', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should update the ticket, publish an event and acks the message', async () => {
        const {
            listener, ticket, data, msg,
        } = await setup();

        await listener.onMessage(data, msg);

        const updatedTicket = await Ticket.findById(ticket.id);

        expect(updatedTicket.orderId).toBeUndefined();
        expect(msg.ack).toHaveBeenCalled();
        expect(natsWrapper.client.publish).toHaveBeenCalled();
    });
});
