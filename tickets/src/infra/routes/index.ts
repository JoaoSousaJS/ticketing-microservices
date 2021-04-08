import { currentUser, validateRequest } from '@htickets/common';
import express from 'express';
import { body } from 'express-validator';
import {
    getCurrentUser, signIn, signOut, signUp,
} from '../../presentation/controllers/user';

export const authRouter = express.Router();

authRouter.get('/api/users/currentuser', currentUser, getCurrentUser);

authRouter.post('/api/users/signin', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
], validateRequest, signIn);

authRouter.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
    ], validateRequest, signUp);

authRouter.post('/api/users/signout', signOut);
