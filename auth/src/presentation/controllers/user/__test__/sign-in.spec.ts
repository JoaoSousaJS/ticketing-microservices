/* eslint-disable no-undef */
import request from 'supertest';
import { clear, connect, close } from '../../../../test/setup';
import { app } from '../../../../app';

const agent = request.agent(app);

describe('Sign In Controller', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should fails where a email that does not exist is supplied', async () => {
        await agent.post('/api/users/signin').send({
            email: 'test@test23.com',
            password: '1234',
        }).expect(400);
    });
});
