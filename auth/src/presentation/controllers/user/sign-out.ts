import { Request, Response } from 'express';

export const signOut = (req: Request, res: Response) => {
  res.send('Hi there');
};
