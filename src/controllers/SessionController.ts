import { Response, RequestHandler } from 'express';

import { IUsersRepository } from '../repositories/users';
import { AuthenticateUserService } from '../services/users';
import usersView from '../views/users_view';

class SessionController {
  constructor(private usersRepo: IUsersRepository) {}

  login: RequestHandler = async (request, response): Promise<Response> => {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService(this.usersRepo);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.status(200).json({
      user: usersView.render(user),
      token,
    });
  };
}

export default SessionController;
