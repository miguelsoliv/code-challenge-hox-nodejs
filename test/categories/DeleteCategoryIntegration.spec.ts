import faker from 'faker';
import supertest from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../src/database';
import { TypeormCategoriesRepository } from '../../src/repositories/categories';
import { TypeormUsersRepository } from '../../src/repositories/users';
import server from '../../src/server';
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
  describe('Should be able to delete a category', () => {
    it('[204] DELETE /categories/:id -', async done => {
      const createdCategory = await createRandomCategory(
        new TypeormCategoriesRepository()
      );

      const response = await supertest(server)
        .delete(`/categories/${createdCategory.id}`)
        .set('Authorization', createdUserToken);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});

      done();
    });
  });

  describe('Should not be able to delete a non-existing category', () => {
    it('[404] DELETE /categories/:id -', async done => {
      const invalidCategoryId = faker.random.uuid();

      const response = await supertest(server)
        .delete(`/categories/${invalidCategoryId}`)
        .set('Authorization', createdUserToken);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'error',
        message: 'The requested resource could not be found',
      });

      done();
    });
  });
});
