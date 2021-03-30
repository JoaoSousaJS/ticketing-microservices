/* eslint-disable no-undef */
import request from 'supertest';
import { clear, connect, close } from '../../../../test/setup';
import { app } from '../../../../app';

const agent = request.agent(app);

describe('Sign In Controller', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should fail where a email that does not exist is supplied', async () => {
        await agent.post('/api/users/signin').send({
            email: 'test@test23.com',
            password: '1234',
        }).expect(400);
    });

    it('should fail when an incorrect password is supplied', async () => {
        await agent.post('/api/users/signup').send({
            email: 'test@test23.com',
            password: '1234',
        }).expect(201);

        await agent.post('/api/users/signin').send({
            email: 'test@test23.com',
            password: '1235',
        }).expect(400);
    });

    it('should return with a cookie when given valid credentials', async () => {
        await agent.post('/api/users/signup').send({
            email: 'test@test23.com',
            password: '1234',
        }).expect(201);

        const response = await agent.post('/api/users/signin').send({
            email: 'test@test23.com',
            password: '1234',
        }).expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
});
