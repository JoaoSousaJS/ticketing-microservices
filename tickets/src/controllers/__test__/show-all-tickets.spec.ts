/* eslint-disable no-undef */
import request from 'supertest';
import { app } from '../../app';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

jest.mock('../../nats-wrapper');

const title = 'title';
const price = 20;

const createTicket = () => agent.post('/api/tickets').set('Cookie', global.signin()).send({
    title,
    price,
}).expect(201);

describe('Show Ticket', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should returns a list of tickets', async () => {
        await createTicket();
        await createTicket();
        await createTicket();

        const ticketresponse = await agent.get('/api/tickets/').send().expect(200);

        expect(ticketresponse.body.length).toEqual(3);
    });
});
