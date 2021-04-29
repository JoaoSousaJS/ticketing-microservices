import { Listener, OrderCreatedEvent, Subjects } from '@htickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../database/model/ticket';
import { queueGroupName } from './types/queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated

    queueGroupName = queueGroupName

    // eslint-disable-next-line class-methods-use-this
    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        ticket.set({
            orderId: data.id,
        });

        await ticket.save();

        msg.ack();
    }
}
