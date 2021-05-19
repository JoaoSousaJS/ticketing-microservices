/* eslint-disable no-undef */

import { OrderStatus } from '@htickets/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order/order';
import { clear, connect, close } from '../../test/setup';
import { stripe } from '../../utils/stripe/stripe';

const agent = request.agent(app);

jest.mock('../../utils/stripe/stripe');

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
        const order = Order.build({
            id: mongoose.Types.ObjectId().toHexString(),
            userId: mongoose.Types.ObjectId().toHexString(),
            version: 0,
            price: 20,
            status: OrderStatus.Created,
        });

        await order.save();

        await agent.post('/api/payments').set('Cookie', global.signin()).send({
            token: 'asdas',
            orderId: order.id,
        }).expect(401);
    });

    it('should return 400 if order is cancelled', async () => {
        const userId = mongoose.Types.ObjectId().toHexString();
        const order = Order.build({
            id: mongoose.Types.ObjectId().toHexString(),
            userId,
            version: 0,
            price: 20,
            status: OrderStatus.Cancelled,
        });

        await order.save();

        await agent.post('/api/payments').set('Cookie', global.signin(userId)).send({
            token: 'asdas',
            orderId: order.id,
        }).expect(400);
    });

    it('should return 201 with valid inputs', async () => {
        const userId = mongoose.Types.ObjectId().toHexString();
        const order = Order.build({
            id: mongoose.Types.ObjectId().toHexString(),
            userId,
            version: 0,
            price: 20,
            status: OrderStatus.Created,
        });

        await order.save();

        await agent.post('/api/payments').set('Cookie', global.signin(userId))
            .send({
                token: 'tok_visa',
                orderId: order.id,
            });

        const chargeOptions = (stripe.paymentIntents.create as jest.Mock).mock.calls[0][0];

        expect(chargeOptions.amount).toEqual(order.price * 100);
        expect(chargeOptions.currency).toEqual('usd');
    });
});
