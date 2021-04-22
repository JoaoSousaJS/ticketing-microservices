/* eslint-disable no-undef */
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../database/model/ticket';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

jest.mock('../../nats-wrapper');

describe('New Ticket', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should handler listening to /api/tickets for post requests', async () => {
        const response = await agent.post('/api/tickets').send({
        });

        expect(response.status).not.toEqual(404);
    });

    it('should only be accessed if user is signed in', async () => {
        await agent.post('/api/tickets').send({}).expect(401);
    });

    it('should returns a status other than 401 if the user signed in', async () => {
        const response = await agent.post('/api/tickets').set('Cookie', global.signin()).send({
        });

        expect(response.status).not.toEqual(401);
    });

    it('should returns an error if an invalid title is provided', async () => {
        await agent.post('/api/tickets').set('Cookie', global.signin()).send({
            title: '',
            price: 10,
        }).expect(400);

        await agent.post('/api/tickets').set('Cookie', global.signin()).send({
            price: 10,
        }).expect(400);
    });

    it('should returns an error if an invalid price is provided', async () => {
        await agent.post('/api/tickets').set('Cookie', global.signin()).send({
            title: 'test',
            price: -10,
        }).expect(400);

        await agent.post('/api/tickets').set('Cookie', global.signin()).send({
            title: 'test',
        }).expect(400);
    });

    it('should creates a ticket with valid inputs', async () => {
        // add mongo
        let tickets = await Ticket.find({});

        expect(tickets.length).toEqual(0);

        await agent.post('/api/tickets').set('Cookie', global.signin()).send({
            title: 'test',
            price: 10,
        }).expect(201);

        tickets = await Ticket.find({});

        expect(tickets.length).toEqual(1);
        expect(tickets[0].price).toEqual(10);
        expect(tickets[0].title).toEqual('test');
    });
});
