import { Listener, Subjects, TicketUpdatedEvent } from '@htickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/tickets/tickets';
import { queueGroupName } from './types/queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated

    queueGroupName = queueGroupName

    // eslint-disable-next-line class-methods-use-this
    async onMessage(data: TicketUpdatedEvent['data'], msg:Message) {
        const ticket = await Ticket.findOne({
            _id: data.id,
            version: data.version - 1,
        });

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        const { title, price } = data;

        ticket.set({
            title,
            price,
        });

        await ticket.save();

        msg.ack();
    }
}
