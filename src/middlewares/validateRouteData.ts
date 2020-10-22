import { RequestHandler } from 'express';
import * as Yup from 'yup';

interface IRequest {
  body?: Yup.ObjectSchema;
  params?: Yup.ObjectSchema;
  query?: Yup.ObjectSchema;
}

const validate = ({ body, params, query }: IRequest): RequestHandler => async (
  request,
  _,
  next
) => {
  if (body) {
    await body.validate(request.body, {
      abortEarly: false,
    });
  }

  if (params) {
    await params.validate(request.params, {
      abortEarly: false,
    });
  }

  if (query) {
    await query.validate(request.query, {
      abortEarly: false,
    });
  }

  next();
};

export default validate;
