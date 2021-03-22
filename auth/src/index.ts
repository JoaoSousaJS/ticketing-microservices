import express from 'express';
import { authRouter } from './infra/routes';

const app = express();

app.use(express.json());

app.use(authRouter);

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
