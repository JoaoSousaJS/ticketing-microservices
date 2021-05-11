import {
    Document, model, Model, Schema,
} from 'mongoose';

interface PaymentAttrs {
    orderId: string
    stripeId: string
}

interface PaymentDoc extends Document {
    orderId: string
    stripeId: string
}

interface PaymentModel extends Model<PaymentDoc> {
    // eslint-disable-next-line no-unused-vars
    build(attrs: PaymentAttrs): PaymentDoc
}

const paymentSchema = new Schema<PaymentDoc, PaymentModel>({
    orderId: {
        required: true,
        type: String,
    },
    stripeId: {
        required: true,
        type: String,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});

paymentSchema.statics.build = (attrs: PaymentAttrs) => new Payment(attrs);

export const Payment = model<PaymentDoc, PaymentModel>('Payment', paymentSchema);
