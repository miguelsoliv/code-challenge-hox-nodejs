import { jwtHelper, passwordsHelper } from '../../helpers';
import User from '../../models/User';
import { IUsersRepository } from '../../repositories/users';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateUserService {
  constructor(private usersRepo: IUsersRepository) {}

  execute = async ({ name, email, password }: IRequest): Promise<IResponse> => {
    const user = await this.usersRepo.create({
      name,
      email,
      password: await passwordsHelper.generateHash(password),
    });

    return {
      user,
      token: jwtHelper.generateToken(user.id),
    };
  };
}

export default CreateUserService;
