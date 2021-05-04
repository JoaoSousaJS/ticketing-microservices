import { OrderStatus } from '@htickets/common';
import {
    Document, model, Model, Schema,
} from 'mongoose';

interface OrderAttrs {
    id: string
    version: number
    userId: string
    price: number
    status: OrderStatus
}

interface OrderDocument extends Document {
    version: number
    userId: string
    price: number
    status: OrderStatus
}

interface OrderModel extends Model<OrderDocument> {
    // eslint-disable-next-line no-unused-vars
    build(attrs: OrderAttrs) : OrderDocument
}

const orderSchema = new Schema<OrderDocument, OrderModel>({
    userId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
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

orderSchema.statics.build = (attrs: OrderAttrs) => new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
});

export const Order = model<OrderDocument, OrderModel>('Order', orderSchema);
