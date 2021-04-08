import { Request, Response } from 'express';

export const signOut = (req: Request, res: Response) => {
    // @ts-ignore
    req.session = null;

    res.send({});
};
