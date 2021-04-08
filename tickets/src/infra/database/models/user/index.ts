import mongoose, { Document } from 'mongoose';
import { Password } from '../../service/password';

interface UserAttrs extends Document{
    email: string
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc: any, ret:any):any {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        },
    },
});

userSchema.pre('save', async function signUp(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

export const User = mongoose.model<UserAttrs>('User', userSchema);
