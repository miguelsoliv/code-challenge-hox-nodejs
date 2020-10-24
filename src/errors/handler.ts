import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'joi';
import { QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { NODE_ENV, SHOW_DATABASE_ERRORS } from '../config/env';
import AppError from './AppError';

const errorHandler: ErrorRequestHandler = (err, request, response, _) => {
  if (err instanceof ValidationError) {
    return response.status(400).json({
      status: 'error',
      message: err.details,
    });
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof QueryFailedError && SHOW_DATABASE_ERRORS) {
    return response.status(500).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof EntityNotFoundError) {
    return response.status(404).json({
      status: 'error',
      message: 'The requested resource could not be found',
    });
  }

  if (NODE_ENV === 'dev') console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default errorHandler;
