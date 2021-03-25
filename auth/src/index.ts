import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { authRouter } from './infra/routes';
import { errorHandler } from './main/middlewares/error-handler';
import { NotFoundError } from './presentation/errors';

const app = express();

app.use(express.json());

app.use(authRouter);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to mongodb');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('listening on port 3000!');
  });
};

start();
