import express from 'express';
import {
  getCurrentUser, signIn, signOut, signUp,
} from '../../presentation/controllers/user';

export const authRouter = express.Router();

authRouter.get('/api/users/currentuser', getCurrentUser);
authRouter.post('/api/users/signin', signIn);
authRouter.post('/api/users/signup', signUp);
authRouter.post('/api/users/signout', signOut);
