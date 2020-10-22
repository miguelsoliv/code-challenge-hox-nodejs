import { RequestHandler } from 'express';

import AppError from '../errors/AppError';
import { verifyToken } from '../helpers/passwords';

interface ITokenPayload {
  sub: string;
}

const ensureUserAuthenticated: RequestHandler = (request, _, next): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT is missing', 401);

  try {
    const [, token] = authHeader.split(' ');
    const validToken = verifyToken(token);

    const { sub } = validToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid JWT', 401);
  }
};

export default ensureUserAuthenticated;
