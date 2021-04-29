/* eslint-disable no-undef */
import { OrderCreatedEvent, OrderStatus } from '@htickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../database/model/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { clear, close, connect } from '../../../test/setup';
import { OrderCreatedListener } from '../order-created-listener';

jest.mock('../../../nats-wrapper');

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const ticket = await Ticket.create({
        title: 'concert',
        price: 99,
        userId: 'asdf',
    });

    await ticket.save();

    const data: OrderCreatedEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: mongoose.Types.ObjectId().toHexString(),
        expiresAt: 'asdf',
        ticket: {
            id: ticket.id,
            price: ticket.price,
        },
    };

    // @ts-ignore
    const msg:Message = {
        ack: jest.fn(),
    };

    return {
        listener, ticket, data, msg,
    };
};

describe('Order Created Listener', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should set the userId of the ticket', async () => {
        const {
            listener, ticket, data, msg,
        } = await setup();

        await listener.onMessage(data, msg);

        const updatedTicket = await Ticket.findById(ticket.id);

        expect(updatedTicket.orderId).toEqual(data.id);
    });

    it('should ack the message', async () => {
        const {
            listener, data, msg,
        } = await setup();

        await listener.onMessage(data, msg);

        expect(msg.ack).toHaveBeenCalled();
    });

    it('should publish a ticket updated event', async () => {
        const {
            listener, data, msg,
        } = await setup();

        await listener.onMessage(data, msg);

        expect(natsWrapper.client.publish).toHaveBeenCalled();
    });
});
