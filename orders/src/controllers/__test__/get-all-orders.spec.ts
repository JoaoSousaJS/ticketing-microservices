/* eslint-disable no-undef */

import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets/tickets';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

const buildTicket = async () => {
    const ticket = await Ticket.create({
        title: 'concert',
        price: 20,
    });
    return ticket;
};

describe('New Order', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should fetch orders for an particular user', async () => {
        const ticketOne = await buildTicket();
        const ticketTwo = await buildTicket();
        const ticketThree = await buildTicket();

        const userOne = global.signin();
        const userTwo = global.signin();

        await agent.post('/api/orders').set('Cookie', userOne).send({
            ticketId: ticketOne.id,
        }).expect(201);

        const { body: orderOne } = await agent.post('/api/orders').set('Cookie', userTwo).send({
            ticketId: ticketTwo.id,
        }).expect(201);

        const { body: orderTwo } = await agent.post('/api/orders').set('Cookie', userTwo).send({
            ticketId: ticketThree.id,
        }).expect(201);

        const response = await agent.get('/api/orders').set('Cookie', userTwo).expect(200);

        expect(response.body.length).toEqual(2);
        expect(response.body[0].id).toEqual(orderOne.id);
        expect(response.body[1].id).toEqual(orderTwo.id);
        expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
        expect(response.body[1].ticket.id).toEqual(ticketThree.id);
    });
});
