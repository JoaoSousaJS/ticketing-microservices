/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongoServer = new MongoMemoryServer();

const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Provide connection to a new in-memory database server.
export const connect = async () => {
    // NOTE: before establishing a new connection close previous
    await mongoose.disconnect();
    process.env.JWT_KEY = 'asdf';

    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

// Remove and close the database and server.
export const close = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
};

// Remove all data from collections
export const clear = async () => {
    const { collections } = mongoose.connection;

    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};
