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
        const cookie = await global.signin();

        const response = await agent.get('/api/users/currentuser').set('Cookie', cookie).send().expect(200);

        expect(response.body.currentUser.email).toEqual('test@test.com');
    });
});
