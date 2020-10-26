import { addHours, format } from 'date-fns';
import faker from 'faker';
import supertest from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../src/database';
import Category from '../../src/models/Category';
import { TypeormCategoriesRepository } from '../../src/repositories/categories';
import { TypeormUsersRepository } from '../../src/repositories/users';
import server from '../../src/server';
import { IProductView } from '../../src/views/products_view';
import { createRandomUser } from '../factories';

let conn: Connection;
let createdUserToken: string;
let createdCategory: Category;

beforeAll(async () => {
  conn = await createConnection('test');
  await conn.synchronize(true);

  const { token } = await createRandomUser(new TypeormUsersRepository());
  createdUserToken = token;

  const typeormCategoriesRepository = new TypeormCategoriesRepository();
  createdCategory = await typeormCategoriesRepository.create({
    name: faker.name.findName(),
  });
});

afterAll(async () => {
  await conn.close();
  server.close();
});

describe('ENDPOINT /products', () => {
  describe('Should be able to create a product', () => {
    it('[201] POST /products -', async done => {
      const productData = {
        category_id: createdCategory.id,
        name: faker.name.findName(),
        price: Number(faker.random.float().toPrecision(2)),
        expiration_date: faker.date.future(),
        manufacturing_date: faker.date.past(),
        perishable_product: faker.random.boolean(),
      };

      const response = await supertest(server)
        .post('/products')
        .set('Authorization', createdUserToken)
        .send(productData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('product');
      expect(response.body.product).toEqual<IProductView>({
        id: response.body.product.id,
        category_id: productData.category_id,
        name: productData.name,
        price: productData.price,
        expiration_date: format(
          productData.expiration_date,
          'yyyy-MM-dd HH:mm:ss SS'
        ),
        manufacturing_date: format(
          productData.manufacturing_date,
          'yyyy-MM-dd HH:mm:ss SS'
        ),
        perishable_product: productData.perishable_product,
      });

      done();
    });
  });

  describe('Should not be able to create a product with a manufacturing date later than its expiration date', () => {
    it('[400] POST /products -', async done => {
      const expirationDate = faker.date.future();

      const productData = {
        category_id: createdCategory.id,
        name: faker.name.findName(),
        price: Number(faker.random.float().toPrecision(2)),
        expiration_date: expirationDate,
        manufacturing_date: addHours(expirationDate, 1),
        perishable_product: faker.random.boolean(),
      };

      const response = await supertest(server)
        .post('/products')
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
