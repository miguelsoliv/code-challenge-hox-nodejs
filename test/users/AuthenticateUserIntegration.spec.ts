import supertest from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../src/database';
import User from '../../src/models/User';
import { TypeormUsersRepository } from '../../src/repositories/users';
import server from '../../src/server';
import { IUserView } from '../../src/views/users_view';
import { createRandomUser } from '../factories';

let conn: Connection;
let createdUser: User & { originalPassword: string };

beforeAll(async () => {
  conn = await createConnection('test');
  await conn.synchronize(true);
  createdUser = await createRandomUser(new TypeormUsersRepository());
});

afterAll(async () => {
  await conn.close();
  server.close();
});

describe('ENDPOINT /session', () => {
  describe('Should be able to authenticate a user', () => {
    it('[200] POST /session -', async done => {
      const response = await supertest(server).post('/session').send({
        email: createdUser.email,
        password: createdUser.originalPassword,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toEqual<IUserView>({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      });

      done();
    });
  });

  describe('Should not be able to authenticate a user with non-existing email', () => {
    it('[401] POST /session -', async done => {
      const response = await supertest(server).post('/session').send({
        email: 'invalid@email.com',
        password: createdUser.originalPassword,
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Incorrect email/password combination',
      });

      done();
    });
  });

  describe('Should not be able to authenticate a user with incorrect password', () => {
    it('[401] POST /session -', async done => {
      const response = await supertest(server).post('/session').send({
        email: createdUser.email,
        password: 'invalid-password',
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Incorrect email/password combination',
      });

      done();
    });
  });
});
