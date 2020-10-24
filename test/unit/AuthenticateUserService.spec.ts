import AppError from '../../src/errors/AppError';
import User from '../../src/models/User';
import { FakeUsersRepository } from '../../src/repositories/users';
import { AuthenticateUserService } from '../../src/services/users';
import { createRandomUser } from '../factories';

let user: User & { originalPassword: string };
let authenticateUserService: AuthenticateUserService;

beforeAll(async () => {
  const fakerUsersRepository = new FakeUsersRepository();

  user = await createRandomUser(fakerUsersRepository);
  authenticateUserService = new AuthenticateUserService(fakerUsersRepository);
});

describe('ENDPOINT /session', async () => {
  describe('Should be able to authenticate a user', () => {
    it('[200] POST /session -', async () => {
      const { id, name, email, password, created_at, updated_at } = user;

      const authenticatedUser = await authenticateUserService.execute({
        email: user.email,
        password: user.originalPassword,
      });

      expect(authenticatedUser).toEqual<{ user: User; token: string }>({
        user: {
          id,
          name,
          email,
          password,
          created_at,
          updated_at,
        },
        token: authenticatedUser.token,
      });
    });
  });

  describe('Should not be able to authenticate a user with non-existing email', () => {
    it('[401] POST /session -', async () => {
      await expect(
        authenticateUserService.execute({
          email: 'invalid@email.com',
          password: user.originalPassword,
        })
      ).rejects.toEqual<AppError>({
        statusCode: 401,
        message: 'Incorrect email/password combination',
      });
    });
  });

  describe('Should not be able to authenticate a user with incorrect password', () => {
    it('[401] POST /session -', async () => {
      await expect(
        authenticateUserService.execute({
          email: user.email,
          password: 'invalid-password',
        })
      ).rejects.toEqual<AppError>({
        statusCode: 401,
        message: 'Incorrect email/password combination',
      });
    });
  });
});
