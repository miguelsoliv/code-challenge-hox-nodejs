import { Response, RequestHandler } from 'express';

import { IUsersRepository } from '../repositories/users';
import { CreateUserService } from '../services/users';

class UsersController {
  constructor(private usersRepo: IUsersRepository) {}

  store: RequestHandler = async (request, response): Promise<Response> => {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService(this.usersRepo);

    const userData = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(200).json(userData);
  };
}

export default UsersController;
