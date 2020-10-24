import faker from 'faker';

import { generateHash } from '../../src/helpers/passwords';
import User from '../../src/models/User';
import { FakeUsersRepository } from '../../src/repositories/users';

const createRandomUser = async (
  fakeRepo: FakeUsersRepository
): Promise<User & { originalPassword: string }> => {
  const password = faker.internet.password();

  const fakeUser = await fakeRepo.create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: await generateHash(password),
  });

  return {
    ...fakeUser,
    originalPassword: password,
  };
};

export default createRandomUser;
