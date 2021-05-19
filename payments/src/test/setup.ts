/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signin(id?:string): string[]
        }
    }
}

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

    await mongoServer.start();

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
    jest.clearAllMocks();
    const { collections } = mongoose.connection;

    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};

global.signin = (id?: string) => {
    const payload = {
        id: id || mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com',
    };

    const token = jwt.sign(payload, process.env.JWT_KEY);

    const session = {
        jwt: token,
    };

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`express:sess=${base64}`];
};
