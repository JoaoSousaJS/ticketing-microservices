import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { DatabaseConnectionError, RequestValidationError } from '../../errors';

export const signUp = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  console.log('Creating a user...');
  throw new DatabaseConnectionError();

  // return res.send({});
};
