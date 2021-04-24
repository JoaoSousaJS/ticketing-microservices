/* eslint-disable no-undef */

import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets/tickets';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

jest.mock('../../nats-wrapper');

describe('New Order', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should fetch the order', async () => {
        const ticket = await Ticket.create({
            title: 'concert',
            price: 20,
        });

        const user = global.signin();

        const { body: order } = await agent.post('/api/orders').set('Cookie', user).send({
            ticketId: ticket.id,
        }).expect(201);

        const { body: fetchedOrder } = await agent.get(`/api/orders/${order.id}`).set('Cookie', user).send().expect(200);

        expect(fetchedOrder.id).toEqual(order.id);
    });

    it('should return an error if one user tries to fetch another users order', async () => {
        const ticket = await Ticket.create({
            title: 'concert',
            price: 20,
        });

        const user = global.signin();

        const { body: order } = await agent.post('/api/orders').set('Cookie', user).send({
            ticketId: ticket.id,
        }).expect(201);

        await agent.get(`/api/orders/${order.id}`).set('Cookie', global.signin()).send().expect(401);
    });
});
