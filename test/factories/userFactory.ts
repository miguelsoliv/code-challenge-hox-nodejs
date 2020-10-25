import faker from 'faker';

import { jwtHelper } from '../../src/helpers';
import { generateHash } from '../../src/helpers/passwords';
import User from '../../src/models/User';
import { IUsersRepository } from '../../src/repositories/users';

interface IResponse extends User {
  originalPassword: string;
  token: string;
}

const createRandomUser = async (
  usersRepo: IUsersRepository
): Promise<IResponse> => {
  const password = faker.internet.password();

  const fakeUser = await usersRepo.create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: await generateHash(password),
  });

  return {
    ...fakeUser,
    originalPassword: password,
    token: `Bearer ${jwtHelper.generateToken(fakeUser.id)}`,
  };
};

export default createRandomUser;
