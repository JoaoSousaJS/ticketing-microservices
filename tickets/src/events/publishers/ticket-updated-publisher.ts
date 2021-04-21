import { Publisher, Subjects, TicketUpdatedEvent } from '@htickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}
