import mongoose, { Document, Model } from 'mongoose';

interface TicketAttrs extends Document{
    title: string
    price: number
}

export interface TicketDoc extends Model<TicketAttrs> {
    title: string
    price: number
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

export const Ticket = mongoose.model<TicketAttrs, TicketDoc>('Ticket', ticketSchema);
