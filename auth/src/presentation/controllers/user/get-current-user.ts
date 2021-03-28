import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const getCurrentUser = (req: Request, res: Response) => {
    if (!req.session?.jwt) {
        return res.send({ currentUser: null });
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
        res.send({ currentUser: payload });
    } catch (error) {
        res.send({ currentUser: null });
    }
};
