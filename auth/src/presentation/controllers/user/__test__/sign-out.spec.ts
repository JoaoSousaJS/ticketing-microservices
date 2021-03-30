/* eslint-disable no-undef */
import request from 'supertest';
import { clear, connect, close } from '../../../../test/setup';
import { app } from '../../../../app';

const agent = request.agent(app);

describe('Sign Out Controller', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should clears the cookie after signing out', async () => {
        await agent.post('/api/users/signup').send({
            email: 'test@test23.com',
            password: '1234',
        }).expect(201);

        const response = await agent.post('/api/users/signout').send({}).expect(200);
        expect(response.get('Set-Cookie')[0]).toEqual(
            'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
        );
    });
});
