/* eslint-disable no-undef */
import request from 'supertest';
import { clear, connect, close } from '../../../../test/setup';
import { app } from '../../../../app';

const agent = request.agent(app);

describe('Sign Up Controller', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should returns a 201 on successful signup', async () => {
        await agent.post('/api/users/signup').send({
            email: 'test@test23.com',
            password: '1234',
        }).expect(201);
    }, 5000);

    it('should returns a 400 with an invalid email', async () => {
        await agent.post('/api/users/signup').send({
            email: 'testtest23.com',
            password: '1234',
        }).expect(400);
    }, 5000);

    it('should returns a 400 with an invalid password', async () => {
        await agent.post('/api/users/signup').send({
            email: 'test@test23.com',
            password: '123',
        }).expect(400);
    }, 5000);

    it('should returns a 400 with missing email and password', async () => {
        await agent.post('/api/users/signup').send({}).expect(400);
    }, 5000);

    it('should disallows duplicate emails', async () => {
        await agent.post('/api/users/signup').send({
            email: 'test@test.com',
            password: '12345',
        }).expect(201);

        await agent.post('/api/users/signup').send({
            email: 'test@test.com',
            password: '12345',
        }).expect(400);
    });
});
