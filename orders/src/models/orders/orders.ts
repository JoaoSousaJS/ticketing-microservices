import { OrderStatus } from '@htickets/common';
import mongoose, { Document } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
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
orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

export const Order = mongoose.model<OrderAttrs>('Order', orderSchema);
