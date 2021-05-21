import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@htickets/common';
import { router } from './routes';

export const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    }),
);

app.use(currentUser);

app.use(router);

app.all('*', () => {
    throw new NotFoundError();
});
app.use(errorHandler);
