import mongoose, { Document, Model } from 'mongoose';

export interface TicketAttrs extends Document{
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

export const Ticket:Model<TicketAttrs> = mongoose.model('Ticket', ticketSchema);
