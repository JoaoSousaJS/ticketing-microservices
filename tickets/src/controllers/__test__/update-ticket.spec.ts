/* eslint-disable no-undef */
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

describe('Show Ticket', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should return a 404 if the provided id does not exist', async () => {
        const id = mongoose.Types.ObjectId().toHexString();
        await agent.put(`/api/tickets/${id}`).set('Cookie', global.signin()).send({
            title: 'title',
            price: 10,
        }).expect(404);
    });

    it('should return a 401 if the user is not authenticated', async () => {
        const id = mongoose.Types.ObjectId().toHexString();
        await agent.put(`/api/tickets/${id}`).send({
            title: 'title',
            price: 10,
        }).expect(401);
    });

    it('should return a 401 if the user does not own the ticket', async () => {
        const response = await agent.post('/api/tickets').set('Cookie', global.signin()).send({
            title: 'title',
            price: 10,
        });

        await agent.put(`/api/tickets/${response.body.id}`).set('Cookie', global.signin()).send({
            title: 'title2',
            price: 11,
        }).expect(401);
    });

    it('should return a 400 if the user provides an invalid title or price', async () => {
        const cookie = global.signin();
        const response = await agent.post('/api/tickets').set('Cookie', cookie).send({
            title: 'title',
            price: 10,
        });

        await agent.put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
            title: '',
            price: 10,
        }).expect(400);

        await agent.put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
            title: 'teste',
            price: -1,
        }).expect(400);
    });

    it('should update the ticket', async () => {

    });
});
