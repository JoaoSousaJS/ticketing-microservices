import { BadRequestError } from '@htickets/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../../infra/database/models/user';
import { Password } from '../../../infra/database/service/password';

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);

    if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials');
    }

    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
    }, process.env.JWT_KEY);

    req.session = {
        jwt: userJwt,
    };

    res.status(200).send(existingUser);
};
