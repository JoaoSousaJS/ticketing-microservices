import {
    ExpirationCompleteEvent, Listener, OrderStatus, Subjects,
} from '@htickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/orders/orders';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import { queueGroupName } from './types/queue-group-name';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete

    queueGroupName = queueGroupName

    // eslint-disable-next-line class-methods-use-this
    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId).populate('ticket');

        if (!order) {
            throw new Error('Order not found');
        }

        if (order.status === OrderStatus.Complete) {
            return msg.ack();
        }
        order.set({
            status: OrderStatus.Cancelled,
        });

        await order.save();

        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id,
            },
        });

        msg.ack();
    }
}
