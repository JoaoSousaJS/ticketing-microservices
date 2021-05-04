import { ExpirationCompleteEvent, Publisher, Subjects } from '@htickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
