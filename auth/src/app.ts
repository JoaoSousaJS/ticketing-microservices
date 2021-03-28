import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { authRouter } from './infra/routes';
import { errorHandler } from './main/middlewares/error-handler';
import { NotFoundError } from './presentation/errors';

export const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    }),
);

app.use(authRouter);

app.all('*', () => {
    throw new NotFoundError();
});
app.use(errorHandler);
