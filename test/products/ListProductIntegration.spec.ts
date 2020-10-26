import { format } from 'date-fns';
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
  describe('Should be able to list all products', () => {
    it('[200] GET /products -', async done => {
      const createdProduct1 = await createRandomProduct(
        new TypeormProductsRepository(),
        new TypeormCategoriesRepository()
      );

      const createdProduct2 = await createRandomProduct(
        new TypeormProductsRepository(),
        new TypeormCategoriesRepository()
      );

      const createdProduct3 = await createRandomProduct(
        new TypeormProductsRepository(),
        new TypeormCategoriesRepository()
      );

      const response = await supertest(server)
        .get('/products')
        .set('Authorization', createdUserToken);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products).toEqual<IProductView[]>([
        {
          id: createdProduct1.id,
          name: createdProduct1.name,
          expiration_date: format(
            createdProduct1.expiration_date,
            'yyyy-MM-dd HH:mm:ss SS'
          ),
          manufacturing_date: format(
            createdProduct1.manufacturing_date,
            'yyyy-MM-dd HH:mm:ss SS'
          ),
          perishable_product: createdProduct1.perishable_product,
          price: createdProduct1.price,
          category: {
            id: createdProduct1.category.id,
            name: createdProduct1.category.name,
          },
        },
        {
          id: createdProduct2.id,
          name: createdProduct2.name,
          expiration_date: format(
            createdProduct2.expiration_date,
            'yyyy-MM-dd HH:mm:ss SS'
          ),
          manufacturing_date: format(
            createdProduct2.manufacturing_date,
            'yyyy-MM-dd HH:mm:ss SS'
          ),
          perishable_product: createdProduct2.perishable_product,
          price: createdProduct2.price,
          category: {
            id: createdProduct2.category.id,
            name: createdProduct2.category.name,
          },
        },
        {
          id: createdProduct3.id,
          name: createdProduct3.name,
          expiration_date: format(
            createdProduct3.expiration_date,
            'yyyy-MM-dd HH:mm:ss SS'
          ),
          manufacturing_date: format(
            createdProduct3.manufacturing_date,
            'yyyy-MM-dd HH:mm:ss SS'
          ),
          perishable_product: createdProduct3.perishable_product,
          price: createdProduct3.price,
          category: {
            id: createdProduct3.category.id,
            name: createdProduct3.category.name,
          },
        },
      ]);

      done();
    });
  });
});
