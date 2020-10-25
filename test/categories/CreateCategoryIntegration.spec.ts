import faker from 'faker';
import supertest from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../src/database';
import { TypeormUsersRepository } from '../../src/repositories/users';
import server from '../../src/server';
import { ICategoryView } from '../../src/views/categories_view';
import { createRandomUser } from '../factories';

let conn: Connection;
let createdUserToken: string;

beforeAll(async () => {
  conn = await createConnection('test');
  await conn.synchronize(true);

  const { token } = await createRandomUser(new TypeormUsersRepository());
  createdUserToken = token;
});

afterAll(async () => {
  await conn.close();
  server.close();
});

describe('ENDPOINT /categories', () => {
  describe('Should be able to create a category', () => {
    it('[201] POST /categories -', async done => {
      const categoryData = {
        name: faker.name.findName(),
      };

      const response = await supertest(server)
        .post('/categories')
        .set('Authorization', createdUserToken)
        .send(categoryData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('category');
      expect(response.body.category).toEqual<ICategoryView>({
        id: response.body.category.id,
        name: categoryData.name,
      });

      done();
    });
  });
});
