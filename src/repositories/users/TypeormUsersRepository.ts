import { getRepository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/userDTOs';
import User from '../../models/User';
import IUsersRepository from './IUsersRepository';

class TypeormUsersRepository implements IUsersRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    const usersRepo = getRepository(User);

    const user = usersRepo.create(data);

    return usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return getRepository(User).findOne({ email });
  }
}

export default TypeormUsersRepository;
