import { OrderStatus } from '@htickets/common';
import mongoose, { Document, Model } from 'mongoose';
import { TicketDoc } from '../tickets/tickets';

interface OrderAttrs extends Document {
    userId: string
    status: OrderStatus
    expiresAt: Date
    ticket: TicketDoc
}

interface OrderDoc extends Model<OrderAttrs> {
    userId: string
    status: OrderStatus
    expiresAt: Date
    ticket: TicketDoc
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

export const Order = mongoose.model<OrderAttrs, OrderDoc>('Order', orderSchema);
