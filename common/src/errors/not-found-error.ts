import { CustomError } from './interface/custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{
      message: this.message,
    }];
  }
}
