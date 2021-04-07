import { BadRequestError } from '@htickets/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../../infra/database/models/user';

export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }
    const user = await User.create({
        email,
        password,
    });
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY);

    // @ts-ignore
    req.session = {
        jwt: userJwt,
    };

    res.status(201).send(user);
};
