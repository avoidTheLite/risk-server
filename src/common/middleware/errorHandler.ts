import { Request, Response } from 'express';
import { HttpCode } from '../types';
import { AppError } from '../types/errors';

function ErrorHandler() {
  const isTrustedError = (err: Error): boolean => {
    if (err instanceof AppError) {
      return err.isOperational;
    }

    return false;
  };

  const handleTrustedError = (err: AppError, res: Response): void => {
    res
      .status(err.httpCode)
      .json({ error: { message: err.message, status: err.httpCode } });
  };

  const handleUnknownError = (err: Error, res: Response): void => {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'Internal Server Error',
        status: HttpCode.INTERNAL_SERVER_ERROR,
      },
    });
  };

  const handleError = (err: Error, req: Request, res: Response): void => {
    req.log.debug('Handling application error', { error: err });
    if (isTrustedError(err) && res) {
      handleTrustedError(err as AppError, res);
    } else {
      handleUnknownError(err, res);
    }
  };

  return {
    handleError,
  };
}

export const errorHandler = ErrorHandler();
