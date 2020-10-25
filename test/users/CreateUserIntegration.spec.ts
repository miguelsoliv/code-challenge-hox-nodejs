import { Application } from 'express';
import faker from 'faker';
import supertest from 'supertest';
import { Connection } from 'typeorm';

import App from '../../src/app';
import createConnection from '../../src/database';
import { IUserView } from '../../src/views/users_view';

let server: Application;
let conn: Connection;

beforeAll(async () => {
  server = new App().express;
  conn = await createConnection('test');
});

afterAll(async () => conn.close());

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
