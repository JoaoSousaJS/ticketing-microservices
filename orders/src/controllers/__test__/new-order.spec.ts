/* eslint-disable no-undef */
import { OrderStatus } from '@htickets/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/orders/orders';
import { Ticket } from '../../models/tickets/tickets';
import { natsWrapper } from '../../nats-wrapper';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

jest.mock('../../nats-wrapper');

describe('New Order', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should return an error if the ticket does not exist', async () => {
        const ticketId = mongoose.Types.ObjectId();

        await agent.post('/api/orders').set('Cookie', global.signin()).send({
            ticketId,
        }).expect(404);
    });

    it('should return an error if the ticket is already reserved', async () => {
        const ticket = await Ticket.create({
            id: mongoose.Types.ObjectId().toHexString(),
            title: 'concert',
            price: 20,
        });
        await Order.create({
            ticket,
            userId: 'asdasdas',
            status: OrderStatus.Created,
            expiresAt: new Date(),
        });

        await agent.post('/api/orders').set('Cookie', global.signin())
            .send({
                ticketId: ticket.id,
            }).expect(400);
    });

    it('should reserve a ticket', async () => {
        const ticket = await Ticket.create({
            id: mongoose.Types.ObjectId().toHexString(),
            title: 'concert',
            price: 20,
        });

        await agent.post('/api/orders').set('Cookie', global.signin())
            .send({
                ticketId: ticket.id,
            }).expect(201);
    });

    it('should emits an order created event', async () => {
        const ticket = await Ticket.create({
            id: mongoose.Types.ObjectId().toHexString(),
            title: 'concert',
            price: 20,
        });

        await agent.post('/api/orders').set('Cookie', global.signin())
            .send({
                ticketId: ticket.id,
            }).expect(201);

        expect(natsWrapper.client.publish).toHaveBeenCalled();
    });
});
