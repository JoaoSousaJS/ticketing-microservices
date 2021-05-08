import { Request, Response } from 'express';

export const newPayment = (req: Request, res: Response) => {
    res.send({ sucess: true });
};
