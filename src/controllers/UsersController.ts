import { Response, RequestHandler } from 'express';
import { getRepository } from 'typeorm';

import { generateHash, generateToken } from '../helpers/passwords';
import User from '../models/User';

const store: RequestHandler = async (request, response): Promise<Response> => {
  const { name, email, password } = request.body;

  const usersRepo = getRepository(User);

  const user = usersRepo.create({
    name,
    email,
    password: await generateHash(password),
  });

  await usersRepo.save(user);

  return response.status(200).json({
    ...user,
    token: generateToken(user.id),
  });
};

export default { store };
