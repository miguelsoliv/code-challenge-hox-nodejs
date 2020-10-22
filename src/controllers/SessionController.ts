import { Response, RequestHandler } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import { generateToken, compareHashs } from '../helpers/passwords';
import User from '../models/User';

const login: RequestHandler = async (request, response): Promise<Response> => {
  const { email, password } = request.body;

  const usersRepo = getRepository(User);

  const user = await usersRepo.findOne({
    email,
  });

  if (!user || !(await compareHashs(password, user.password))) {
    throw new AppError('Incorrect email/password combination', 401);
  }

  return response.status(200).json({
    user,
    token: generateToken(user.id),
  });
};

export default { login };
