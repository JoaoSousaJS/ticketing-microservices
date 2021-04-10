/* eslint-disable no-undef */
import request from 'supertest';
import { app } from '../../app';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

describe('Show Ticket', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should returns 404 if the ticket is not found', async () => {
        await agent.get('/api/tickets/fakeId').send().expect(404);
    });

    it('should returns the ticket if the ticket is found', async () => {
    });
});
