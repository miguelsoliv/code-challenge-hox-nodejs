import faker from 'faker';

import { jwtHelper, passwordsHelper } from '../../src/helpers';
import User from '../../src/models/User';
import { FakeUsersRepository } from '../../src/repositories/users';
import { CreateUserService } from '../../src/services/users';

let fakerUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

beforeAll(async () => {
  fakerUsersRepository = new FakeUsersRepository();
  createUserService = new CreateUserService(fakerUsersRepository);
});

describe('ENDPOINT /users', () => {
  it('Should be able to create a user', async () => {
    const createUserSpy = jest.spyOn(fakerUsersRepository, 'create');
    const generateTokenSpy = jest.spyOn(jwtHelper, 'generateToken');
    const generateHashSpy = jest.spyOn(passwordsHelper, 'generateHash');

    const userData = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const createdUser = await createUserService.execute(userData);

    const {
      id,
      name,
      email,
      password,
      created_at,
      updated_at,
    } = createdUser.user;

    expect(createUserSpy).toHaveBeenCalledTimes(1);
    expect(generateTokenSpy).toHaveBeenCalledTimes(1);
    expect(generateHashSpy).toHaveBeenCalledTimes(1);
    expect(createdUser).toEqual<{ user: User; token: string }>({
      user: {
        id,
        name,
        email,
        password,
        created_at,
        updated_at,
      },
      token: createdUser.token,
    });
  });
});
