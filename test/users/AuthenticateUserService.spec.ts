import AppError from '../../src/errors/AppError';
import { jwtHelper, passwordsHelper } from '../../src/helpers';
import User from '../../src/models/User';
import { FakeUsersRepository } from '../../src/repositories/users';
import { AuthenticateUserService } from '../../src/services/users';
import { createRandomUser } from '../factories';

let fakerUsersRepository: FakeUsersRepository;
let authenticateUserService: AuthenticateUserService;
let createdUser: User & { originalPassword: string };

beforeAll(async () => {
  fakerUsersRepository = new FakeUsersRepository();
  authenticateUserService = new AuthenticateUserService(fakerUsersRepository);

  createdUser = await createRandomUser(fakerUsersRepository);
});

describe('ENDPOINT /session', () => {
  it('Should be able to authenticate a user', async () => {
    const findUserByEmailSpy = jest.spyOn(fakerUsersRepository, 'findByEmail');
    const generateTokenSpy = jest.spyOn(jwtHelper, 'generateToken');
    const compareHashsSpy = jest.spyOn(passwordsHelper, 'compareHashs');

    const { id, name, email, password, created_at, updated_at } = createdUser;

    const authenticatedUserResponse = await authenticateUserService.execute({
      email: createdUser.email,
      password: createdUser.originalPassword,
    });

    expect(findUserByEmailSpy).toHaveBeenCalledTimes(1);
    expect(generateTokenSpy).toHaveBeenCalledTimes(1);
    expect(compareHashsSpy).toHaveBeenCalledTimes(1);
    expect(authenticatedUserResponse).toEqual<typeof authenticatedUserResponse>(
      {
        user: {
          id,
          name,
          email,
          password,
          created_at,
          updated_at,
        },
        token: authenticatedUserResponse.token,
      }
    );
  });

  it('Should not be able to authenticate a user with non-existing email', async () => {
    const findUserByEmailSpy = jest.spyOn(fakerUsersRepository, 'findByEmail');

    await authenticateUserService
      .execute({
        email: 'invalid@email.com',
        password: createdUser.originalPassword,
      })
      .catch(err => {
        expect(err).toBeInstanceOf(AppError);
        expect(err).toEqual<AppError>({
          statusCode: 401,
          message: 'Incorrect email/password combination',
        });
      });
    expect(findUserByEmailSpy).toHaveBeenCalledTimes(1);
  });

  it('Should not be able to authenticate a user with incorrect password', async () => {
    const compareHashsSpy = jest.spyOn(passwordsHelper, 'compareHashs');

    await authenticateUserService
      .execute({
        email: createdUser.email,
        password: 'invalid-password',
      })
      .catch(err => {
        expect(err).toBeInstanceOf(AppError);
        expect(err).toEqual<AppError>({
          statusCode: 401,
          message: 'Incorrect email/password combination',
        });
      });
    expect(compareHashsSpy).toHaveBeenCalledTimes(1);
  });
});
