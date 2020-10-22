import { RequestHandler } from 'express';
import * as Yup from 'yup';

interface IRequest {
  body?: Yup.ObjectSchema;
  params?: Yup.ObjectSchema;
  query?: Yup.ObjectSchema;
}

const applyValidation = async (
  data: Record<string, unknown>,
  schema?: Yup.ObjectSchema
) => {
  const schemaNonNullable = schema || Yup.object().shape({});

  await schemaNonNullable.noUnknown(true).validate(data, {
    abortEarly: false,
    strict: true,
  });
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
