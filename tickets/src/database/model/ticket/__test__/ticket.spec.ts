/* eslint-disable no-undef */

import { Ticket } from '..';
import { clear, close, connect } from '../../../../test/setup';

describe('Ticket Model', () => {
    beforeAll(async () => connect());
    beforeEach(async () => clear());
    afterAll(async () => close());

    it('should implements optimistic concurrency control', async (done) => {
        const ticket = await Ticket.create({
            title: 'concert',
            price: 5,
            userId: '123',
        });

        const firstInstace = await Ticket.findById(ticket.id);
        const secondInstance = await Ticket.findById(ticket.id);

        firstInstace.set({
            price: 10,
        });

        secondInstance.set({
            price: 25,
        });

        await firstInstace.save();

        try {
            await secondInstance.save();
        } catch (error) {
            return done();
        }

        throw new Error('Should not reach this point');
    });

    it('should increment the version number on multiple saves', async () => {
        const ticket = await Ticket.create({
            title: 'concert',
            price: 20,
            userId: '123',
        });

        expect(ticket.version).toEqual(0);

        await ticket.save();
        expect(ticket.version).toEqual(1);
        await ticket.save();
        expect(ticket.version).toEqual(2);
    });
});
