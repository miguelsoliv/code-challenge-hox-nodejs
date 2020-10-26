import { format } from 'date-fns';
import faker from 'faker';
import supertest from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../src/database';
import { TypeormCategoriesRepository } from '../../src/repositories/categories';
import { TypeormProductsRepository } from '../../src/repositories/products';
import { TypeormUsersRepository } from '../../src/repositories/users';
import server from '../../src/server';
import { IProductView } from '../../src/views/products_view';
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
  describe('Should be able to show a product', () => {
    it('[200] GET /products/:id -', async done => {
      const createdProduct = await createRandomProduct(
        new TypeormProductsRepository(),
        new TypeormCategoriesRepository()
      );

      const response = await supertest(server)
        .get(`/products/${createdProduct.id}`)
        .set('Authorization', createdUserToken);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('product');
      expect(response.body.product).toEqual<IProductView>({
        id: createdProduct.id,
        name: createdProduct.name,
        expiration_date: format(
          createdProduct.expiration_date,
          'yyyy-MM-dd HH:mm:ss SS'
        ),
        manufacturing_date: format(
          createdProduct.manufacturing_date,
          'yyyy-MM-dd HH:mm:ss SS'
        ),
        perishable_product: createdProduct.perishable_product,
        price: createdProduct.price,
        category: {
          id: createdProduct.category.id,
          name: createdProduct.category.name,
        },
      });

      done();
    });
  });

  describe('Should not be able to show a non-existing products', () => {
    it('[404] GET /products -', async done => {
      const invalidProductId = faker.random.uuid();

      const response = await supertest(server)
        .get(`/products/${invalidProductId}`)
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
