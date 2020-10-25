import faker from 'faker';
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
  describe('Should be able to update a category', () => {
    it('[200] PUT /categories/:id -', async done => {
      const createdCategory = await createRandomCategory(
        new TypeormCategoriesRepository()
      );

      const categoryData = {
        name: faker.name.findName(),
      };

      const response = await supertest(server)
        .put(`/categories/${createdCategory.id}`)
        .set('Authorization', createdUserToken)
        .send(categoryData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('category');
      expect(response.body.category).toEqual<ICategoryView>({
        id: createdCategory.id,
        name: categoryData.name,
      });

      done();
    });
  });

  describe('Should not be able to update a non-existing category', () => {
    it('[404] PUT /categories/:id -', async done => {
      const invalidCategoryId = faker.random.uuid();

      const response = await supertest(server)
        .put(`/categories/${invalidCategoryId}`)
        .set('Authorization', createdUserToken)
        .send({
          name: faker.name.findName(),
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'error',
        message: 'The requested resource could not be found',
      });

      done();
    });
  });
});
