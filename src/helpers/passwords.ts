/* eslint-disable @typescript-eslint/ban-types */
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';

export const generateHash = async (stringToHash: string): Promise<string> => {
  return hash(stringToHash, 8);
};

export const compareHashs = async (
  nonHashedString: string,
  hashedString: string
): Promise<boolean> => {
  return compare(nonHashedString, hashedString);
};

export const generateToken = (userId: string): string => {
  return sign({}, JWT_SECRET, {
    subject: userId,
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): string | object => {
  return verify(token, JWT_SECRET);
};
