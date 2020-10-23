/* eslint-disable @typescript-eslint/ban-types */
import { sign, verify } from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';

export const generateToken = (userId: string): string => {
  return sign({}, JWT_SECRET, {
    subject: userId,
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): string | object => {
  return verify(token, JWT_SECRET);
};
