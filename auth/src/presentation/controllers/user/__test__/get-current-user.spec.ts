/* eslint-disable no-undef */
import request from 'supertest';
import { clear, connect, close } from '../../../../test/setup';
import { app } from '../../../../app';

const agent = request.agent(app);

describe('Current user Controller', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should return the details of the current user', async () => {
        const authResponse = await agent.post('/api/users/signup').send({
            email: 'test@test23.com',
            password: '1234',
        }).expect(201);
        const cookie = authResponse.get('Set-Cookie')[0];

        const response = await agent.get('/api/users/currentuser').set('Cookie', cookie).send().expect(200);

        expect(response.body.currentUser.email).toEqual('test@test23.com');
    });
});
