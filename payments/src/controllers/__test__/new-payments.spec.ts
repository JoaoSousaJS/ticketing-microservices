/* eslint-disable no-undef */

import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { clear, connect, close } from '../../test/setup';

const agent = request.agent(app);

jest.mock('../../nats-wrapper');

describe('New Payment', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should return 404 if order does not exist', async () => {
        await agent.post('/api/payments').set('Cookie', global.signin()).send({
            token: 'asdas',
            orderId: mongoose.Types.ObjectId().toHexString(),
        }).expect(404);
    });

    it('should return a 401 when purchasing an order does not belong to the user', async () => {

    });
});
