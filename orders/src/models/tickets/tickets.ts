import { OrderStatus } from '@htickets/common';
import mongoose, { Document, Model } from 'mongoose';
import { Order } from '../orders/orders';

export interface TicketAttrs extends Document{
    id: string
    title: string
    price: number
    isReserved(): Promise<boolean>
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});

ticketSchema.methods.isReserved = async function isReserved() {
    const existingOrder = await Order.findOne({
        ticket: this.id,
        status: {
            $in: [OrderStatus.Created, OrderStatus.AwaitingPament, OrderStatus.Complete],
        },
    });

    return !!existingOrder;
};

export const Ticket:Model<TicketAttrs> = mongoose.model('Ticket', ticketSchema);
