import { Listener, Subjects, TicketCreatedEvent } from '@htickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/tickets/tickets';
import { queueGroupName } from './types/queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated

    queueGroupName = queueGroupName

    // eslint-disable-next-line class-methods-use-this
    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { title, price } = data;
        const ticket = await Ticket.create({
            _id: data.id,
            title,
            price,
        });
        await ticket.save();
        msg.ack();
    }
}
