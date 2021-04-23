import { OrderStatus } from '@htickets/common';
import mongoose, { Document } from 'mongoose';
import { TicketAttrs } from '../tickets/tickets';

interface OrderAttrs extends Document {
    userId: string
    status: OrderStatus
    expiresAt: Date
    ticket: TicketAttrs
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created,
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});

export const Order = mongoose.model<OrderAttrs>('Order', orderSchema);
