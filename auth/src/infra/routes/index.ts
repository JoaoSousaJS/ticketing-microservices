import express from 'express';
import { getCurrentUser, signIn } from '../../presentation/controllers/user';

export const authRouter = express.Router();

authRouter.get('/api/users/currentuser', getCurrentUser);
authRouter.get('/api/users/signin', signIn);
