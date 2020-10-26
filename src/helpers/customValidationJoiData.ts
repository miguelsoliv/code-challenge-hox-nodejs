/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { parseISO, isValid } from 'date-fns';
import { CustomHelpers, ErrorReport } from 'joi';

export const validateDate = (
  value: any,
  helper: CustomHelpers<any>
): ErrorReport | true => {
  const parsedValue = parseISO(value);

  if (isValid(parsedValue)) return true;

  return helper.error('any.invalid');
};

export const validateParamsNumber = (
  value: any,
  helper: CustomHelpers<any>
): ErrorReport | true => {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) return helper.error('any.invalid');

  return true;
};
