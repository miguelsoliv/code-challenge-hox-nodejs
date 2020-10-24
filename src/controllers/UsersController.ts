import { Response, RequestHandler } from 'express';

import { IUsersRepository } from '../repositories/users';
import { CreateUserService } from '../services/users';
import usersView from '../views/users_view';

class UsersController {
  constructor(private usersRepo: IUsersRepository) {}

  store: RequestHandler = async (request, response): Promise<Response> => {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService(this.usersRepo);

    const { user, token } = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(200).json({
      user: usersView.render(user),
      token,
    });
  };
}

export default UsersController;
