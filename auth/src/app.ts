import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@htickets/common';
import { authRouter } from './infra/routes';

export const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    }),
);

app.use(authRouter);

app.all('*', () => {
    throw new NotFoundError();
});
app.use(errorHandler);
