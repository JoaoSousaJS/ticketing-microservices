/* eslint-disable no-undef */

import { OrderStatus } from '@htickets/common';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/orders/orders';
import { Ticket } from '../../models/tickets/tickets';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

jest.mock('../../nats-wrapper');

describe('Delete Order', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should mark an order as cancelled', async () => {
        const ticket = await Ticket.create({
            title: 'concert',
            price: 20,
        });

        const user = global.signin();

        const { body: order } = await agent.post('/api/orders').set('Cookie', user).send({
            ticketId: ticket.id,
        }).expect(201);

        await agent.delete(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204);
        const fetchedOrder = await Order.findById(order.id);
        expect(fetchedOrder.status).toEqual(OrderStatus.Cancelled);
    });
});
