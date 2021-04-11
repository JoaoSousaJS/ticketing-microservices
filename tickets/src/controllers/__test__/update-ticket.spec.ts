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

    it('should returns a 404 if the provided id does not exist', async () => {
        const id = mongoose.Types.ObjectId().toHexString();
        await agent.put(`/api/tickets/${id}`).set('Cookie', global.signin()).send({
            title: 'title',
            price: 10,
        }).expect(404);
    });

    it('should returns a 401 if the user is not authenticated', async () => {

    });

    it('should returns a 401 if the user does not own the ticket', async () => {

    });

    it('should returns a 400 if the user provides an invalid title or price', async () => {

    });

    it('should updates the ticket', async () => {

    });
});
