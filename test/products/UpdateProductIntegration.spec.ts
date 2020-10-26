import { format, addHours } from 'date-fns';
import faker from 'faker';
import supertest from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../src/database';
import Product from '../../src/models/Product';
import { TypeormCategoriesRepository } from '../../src/repositories/categories';
import { TypeormProductsRepository } from '../../src/repositories/products';
import { TypeormUsersRepository } from '../../src/repositories/users';
import server from '../../src/server';
import { IProductView } from '../../src/views/products_view';
import { createRandomUser, createRandomProduct } from '../factories';

let conn: Connection;
let createdUserToken: string;
let createdProduct: Product;

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
  describe('Should be able to update a product', () => {
    it('[200] PUT /products/:id -', async done => {
      createdProduct = await createRandomProduct(
        new TypeormProductsRepository(),
        new TypeormCategoriesRepository()
      );

      const productData = {
        category_id: createdProduct.category_id,
        name: faker.name.findName(),
        price: Number(faker.random.float().toPrecision(2)),
        expiration_date: faker.date.future(),
        manufacturing_date: faker.date.past(),
        perishable_product: createdProduct.perishable_product,
      };

      const response = await supertest(server)
        .put(`/products/${createdProduct.id}`)
        .set('Authorization', createdUserToken)
        .send(productData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('product');
      expect(response.body.product).toEqual<IProductView>({
        id: createdProduct.id,
        name: productData.name,
        expiration_date: format(
          productData.expiration_date,
          'yyyy-MM-dd HH:mm:ss SS'
        ),
        manufacturing_date: format(
          productData.manufacturing_date,
          'yyyy-MM-dd HH:mm:ss SS'
        ),
        perishable_product: productData.perishable_product,
        price: productData.price,
        category_id: productData.category_id,
      });

      done();
    });
  });

  describe('Should not be able to update a non-existing product', () => {
    it('[404] PUT /products/:id -', async done => {
      const invalidProductId = faker.random.uuid();

      const response = await supertest(server)
        .put(`/products/${invalidProductId}`)
        .set('Authorization', createdUserToken)
        .send({
          category_id: createdProduct.category_id,
          name: faker.name.findName(),
          expiration_date: faker.date.future(),
          manufacturing_date: faker.date.past(),
          price: createdProduct.price,
          perishable_product: createdProduct.perishable_product,
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'error',
        message: 'The requested resource could not be found',
      });

      done();
    });
  });

  describe('Should not be able to update a product with a manufacturing date later than its expiration date', () => {
    it('[400] PUT /products -', async done => {
      const expirationDate = faker.date.future();

      const productData = {
        category_id: createdProduct.category_id,
        name: faker.name.findName(),
        price: Number(faker.random.float().toPrecision(2)),
        expiration_date: expirationDate,
        manufacturing_date: addHours(expirationDate, 1),
        perishable_product: faker.random.boolean(),
      };

      const response = await supertest(server)
        .put(`/products/${createdProduct.id}`)
        .set('Authorization', createdUserToken)
        .send(productData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: 'error',
        message:
          'The manufacturing date cannot be later than the expiration date',
      });

      done();
    });
  });
});
