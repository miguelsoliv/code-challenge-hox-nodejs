import faker from 'faker';
import supertest from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../src/database';
import server from '../../src/server';
import { IUserView } from '../../src/views/users_view';

let conn: Connection;

beforeAll(async () => {
  conn = await createConnection('test');
  await conn.synchronize(true);
});

afterAll(async () => {
  await conn.close();
  server.close();
});

describe('ENDPOINT /users', () => {
  describe('Should be able to create a user', () => {
    it('[201] POST /users -', async done => {
      const userData = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const response = await supertest(server).post('/users').send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toEqual<IUserView>({
        id: response.body.user.id,
        name: userData.name,
        email: userData.email,
      });

      done();
    });
  });
});
