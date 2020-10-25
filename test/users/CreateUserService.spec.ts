import faker from 'faker';

import { jwtHelper, passwordsHelper } from '../../src/helpers';
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

    const createdUserResponse = await createUserService.execute(userData);

    const { name, email } = userData;

    expect(createUserSpy).toHaveBeenCalledTimes(1);
    expect(generateTokenSpy).toHaveBeenCalledTimes(1);
    expect(generateHashSpy).toHaveBeenCalledTimes(1);
    expect(createdUserResponse).toEqual<typeof createdUserResponse>({
      user: {
        id: createdUserResponse.user.id,
        name,
        email,
        password: createdUserResponse.user.password,
        created_at: createdUserResponse.user.created_at,
        updated_at: createdUserResponse.user.updated_at,
      },
      token: createdUserResponse.token,
    });
  });
});
