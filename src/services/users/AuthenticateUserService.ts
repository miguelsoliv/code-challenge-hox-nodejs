import AppError from '../../errors/AppError';
import { jwtHelper, passwordsHelper } from '../../helpers';
import User from '../../models/User';
import { IUsersRepository } from '../../repositories/users';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepo: IUsersRepository) {}

  execute = async ({ email, password }: IRequest): Promise<IResponse> => {
    const user = await this.usersRepo.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination', 401);

    if (!(await passwordsHelper.compareHashs(password, user.password))) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    return {
      user,
      token: jwtHelper.generateToken(user.id),
    };
  };
}

export default AuthenticateUserService;
