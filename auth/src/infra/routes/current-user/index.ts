import express from 'express';
import { getCurrentUser } from '../../../presentation/controllers/user/get-current-user';

export const authRouter = express.Router();

authRouter.get('/api/users/currentuser', getCurrentUser);
