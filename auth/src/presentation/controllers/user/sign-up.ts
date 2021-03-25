import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../../../infra/database/models/user';
import { BadRequestError, RequestValidationError } from '../../errors';

export const signUp = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }
    const user = await User.create({
        email,
        password,
    });

    res.status(201).send(user);
};
