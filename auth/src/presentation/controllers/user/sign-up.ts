import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const signUp = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }

  console.log('Creating a user...');

  return res.send({});
};
