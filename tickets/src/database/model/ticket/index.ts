import mongoose, { Document } from 'mongoose';

interface TicketAttrs extends Document{
    title: string
    price: number
    userId: string
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});

export const Ticket = mongoose.model<TicketAttrs>('Ticket', ticketSchema);
