/* eslint-disable no-undef */

import { TicketCreatedEvent } from '@htickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import request from 'supertest';
import { app } from '../../../app';
import { Ticket } from '../../../models/tickets/tickets';
import { natsWrapper } from '../../../nats-wrapper';
import { clear, close, connect } from '../../../test/setup';
import { TicketCreatedListener } from '../ticket-created-listener';

const agent = request.agent(app);

jest.mock('../../../nats-wrapper');

const setup = async () => {
    const listener = new TicketCreatedListener(natsWrapper.client);

    const data: TicketCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString(),
    };

    // @ts-ignore
    const msg:Message = {
        ack: jest.fn(),
    };

    return { listener, data, msg };
};

describe('Ticket Created listener', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('creates and saves a ticket', async () => {
        const { listener, data, msg } = await setup();

        await listener.onMessage(data, msg);

        const ticket = await Ticket.findById(data.id);

        expect(ticket).toBeDefined();
        expect(ticket.title).toEqual(data.title);
        expect(ticket.price).toEqual(data.price);
    });
});
