/* eslint-disable no-undef */

import { TicketUpdatedEvent } from '@htickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/tickets/tickets';
import { natsWrapper } from '../../../nats-wrapper';
import { clear, close, connect } from '../../../test/setup';
import { TicketUpdatedListener } from '../ticket-updated-listener';

jest.mock('../../../nats-wrapper');

const setup = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client);

    const ticket = await Ticket.create({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    });

    await ticket.save();

    const data: TicketUpdatedEvent['data'] = {
        version: ticket.version + 1,
        id: ticket.id,
        title: 'new concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString(),
    };

    // @ts-ignore
    const msg:Message = {
        ack: jest.fn(),
    };

    return {
        listener, data, msg, ticket,
    };
};

describe('Ticket Updated listener', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should find, update and save a ticket', async () => {
        const {
            listener, data, msg, ticket,
        } = await setup();

        await listener.onMessage(data, msg);

        const updatedTicket = await Ticket.findById(ticket.id);

        expect(updatedTicket.title).toEqual(data.title);
        expect(updatedTicket.price).toEqual(data.price);
        expect(updatedTicket.version).toEqual(data.version);
    });

    it('should ack the message ', async () => {

    });
});
