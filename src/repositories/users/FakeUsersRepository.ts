import faker from 'faker';

import { ICreateUserDTO } from '../../dtos/userDTOs';
import User from '../../models/User';
import IUsersRepository from './IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = {
      ...data,
      id: faker.random.uuid(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}

export default FakeUsersRepository;
