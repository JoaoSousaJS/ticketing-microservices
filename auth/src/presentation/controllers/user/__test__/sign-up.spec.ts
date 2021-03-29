/* eslint-disable no-undef */
import request from 'supertest';
import { clear, connect, close } from '../../../../test/setup';
import { app } from '../../../../app';

const agent = request.agent(app);

describe('Sign Up Controller', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    test('should returns a 201 on successful signup', async () => {
        await agent.post('/api/users/signup').send({
            email: 'test@test23.com',
            password: '1234',
        }).expect(201);
    }, 5000);
});
