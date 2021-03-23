import express from 'express';
import { authRouter } from './infra/routes';
import { errorHandler } from './main/middlewares/error-handler';

const app = express();

app.use(express.json());

app.use(authRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
