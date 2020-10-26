import faker from 'faker';
import supertest from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../src/database';
import { TypeormCategoriesRepository } from '../../src/repositories/categories';
import { TypeormProductsRepository } from '../../src/repositories/products';
import { TypeormUsersRepository } from '../../src/repositories/users';
import server from '../../src/server';
import { createRandomUser, createRandomProduct } from '../factories';

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

describe('ENDPOINT /products', () => {
  describe('Should be able to delete a product', () => {
    it('[204] DELETE /products/:id -', async done => {
      const createdProduct = await createRandomProduct(
        new TypeormProductsRepository(),
        new TypeormCategoriesRepository()
      );

      const response = await supertest(server)
        .delete(`/products/${createdProduct.id}`)
        .set('Authorization', createdUserToken);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});

      done();
    });
  });

  describe('Should not be able to delete a non-existing product', () => {
    it('[404] DELETE /products/:id -', async done => {
      const invalidProductId = faker.random.uuid();

      const response = await supertest(server)
        .delete(`/products/${invalidProductId}`)
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
