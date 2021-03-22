import express from 'express';
import {
  getCurrentUser, signIn, signOut, signUp,
} from '../../presentation/controllers/user';

export const authRouter = express.Router();

authRouter.get('/api/users/currentuser', getCurrentUser);
authRouter.get('/api/users/signin', signIn);
authRouter.get('/api/users/signup', signUp);
authRouter.get('/api/users/signout', signOut);
