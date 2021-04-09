/* eslint-disable no-undef */
import request from 'supertest';
import { app } from '../../app';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

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

    it('should returns an error if an invalid title is provided', async () => {
    });

    it('should returns an error if an invalid price is provided', async () => {
    });

    it('should creates a ticket with valid inputs', async () => {
    });
});
