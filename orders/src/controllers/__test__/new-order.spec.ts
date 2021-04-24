/* eslint-disable no-undef */
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

jest.mock('../../nats-wrapper');

describe('New Order', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should return an error if the ticket does not exist', async () => {
        const ticketId = mongoose.Types.ObjectId();

        await agent.post('/api/orders').set('Cookie', global.signin()).send({
            ticketId,
        }).expect(404);
    });

    it('should return an error if the ticket is already reserved', async () => {

    });

    it('should reserve a ticket', async () => {

    });
});
