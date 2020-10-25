import supertest from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../src/database';
import { TypeormCategoriesRepository } from '../../src/repositories/categories';
import { TypeormUsersRepository } from '../../src/repositories/users';
import server from '../../src/server';
import { ICategoryView } from '../../src/views/categories_view';
import { createRandomUser, createRandomCategory } from '../factories';

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
  describe('Should be able to list all categories', () => {
    it('[200] GET /categories -', async done => {
      const createdCategory1 = await createRandomCategory(
        new TypeormCategoriesRepository()
      );

      const createdCategory2 = await createRandomCategory(
        new TypeormCategoriesRepository()
      );

      const createdCategory3 = await createRandomCategory(
        new TypeormCategoriesRepository()
      );

      const response = await supertest(server)
        .get('/categories')
        .set('Authorization', createdUserToken);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('categories');
      expect(response.body.categories).toEqual<ICategoryView[]>([
        {
          id: createdCategory1.id,
          name: createdCategory1.name,
        },
        {
          id: createdCategory2.id,
          name: createdCategory2.name,
        },
        {
          id: createdCategory3.id,
          name: createdCategory3.name,
        },
      ]);

      done();
    });
  });
});
