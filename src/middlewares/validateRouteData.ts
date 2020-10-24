import { RequestHandler } from 'express';
import Joi, { Schema, ValidationError } from 'joi';

interface IRequest {
  body?: Schema;
  params?: Schema;
  query?: Schema;
}

const applyValidation = async (
  data: Record<string, unknown>,
  schema?: Schema
) => {
  const nonNullableSchema = schema || Joi.object({});

  const validationResult = nonNullableSchema.validate(data, {
    abortEarly: false,
  });

  if (validationResult.error) {
    throw new ValidationError(
      validationResult.error.message,
      validationResult.error.details.map(err => err.message),
      data
    );
  }
};

const validate = ({ body, params, query }: IRequest): RequestHandler => async (
  request,
  _,
  next
) => {
  await applyValidation(request.body, body);
  await applyValidation(request.params, params);
  await applyValidation(request.query, query);

  next();
};

export default validate;
