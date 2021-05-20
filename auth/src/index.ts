import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    console.log('Starting...');
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI not defined');
    }
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log('connected to mongodb and NATS');
    app.listen(3000, () => {
        console.log('listening on port 3000!');
    });
};

start();
