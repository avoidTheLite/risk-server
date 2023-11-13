import { HttpCode } from '../types';

interface AppErrorArgs {
  name?: string;
  message: string;
  httpCode?: HttpCode;
  isOperational?: boolean;
}

interface StandardErrorArgs {
  name?: string;
  message: string;
}

export class AppError extends Error {
  name: string;
  httpCode: HttpCode;
  isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || 'Error';
    this.httpCode = args.httpCode || 500;
    this.message = args.message;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    // Error.captureStackTrace(this);
  }
}

export class NoRecordsError extends Error {
  name: string;

  constructor(args: StandardErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || 'Error';
  }
}

export class NotFoundError extends Error {
  name: string;
  httpCode: HttpCode;
  isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'NotFoundError';
    this.httpCode = HttpCode.NOT_FOUND;
    this.isOperational = true;
  }
}
