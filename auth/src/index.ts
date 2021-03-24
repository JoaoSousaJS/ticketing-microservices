import express from 'express';
import 'express-async-errors';
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

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
