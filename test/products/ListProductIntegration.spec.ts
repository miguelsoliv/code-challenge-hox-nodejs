import { format } from 'date-fns';
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
let products: Product[] = [];

beforeAll(async () => {
  conn = await createConnection('test');
  await conn.synchronize(true);

  const { token } = await createRandomUser(new TypeormUsersRepository());
  createdUserToken = token;

  const productsPromises: Promise<Product>[] = [];

  for (let i = 11; i > 0; i -= 1) {
    productsPromises.push(
      createRandomProduct(
        new TypeormProductsRepository(),
        new TypeormCategoriesRepository()
      )
    );
  }

  products = await Promise.all(productsPromises);
});

afterAll(async () => {
  await conn.close();
  server.close();
});

const formattedProductsForView = (): IProductView[] =>
  products.map(product => ({
    id: product.id,
    name: product.name,
    expiration_date: format(product.expiration_date, 'yyyy-MM-dd HH:mm:ss SS'),
    manufacturing_date: format(
      product.manufacturing_date,
      'yyyy-MM-dd HH:mm:ss SS'
    ),
    perishable_product: product.perishable_product,
    price: product.price,
    category: product.category && {
      id: product.category.id,
      name: product.category.name,
    },
  }));

describe('ENDPOINT /products', () => {
  describe('Should be able to list the first 10 products', () => {
    it('[200] GET /products/:page/:category -', async done => {
      const response = await supertest(server)
        .get('/products/1/all')
        .set('Authorization', createdUserToken);

      expect.objectContaining(formattedProductsForView());
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products).toHaveLength(10);

      done();
    });
  });

  describe('Should be able to list the last product', () => {
    it('[200] GET /products/:page/:category -', async done => {
      const response = await supertest(server)
        .get('/products/2/all')
        .set('Authorization', createdUserToken);

      expect.objectContaining(formattedProductsForView());
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products).toHaveLength(1);

      done();
    });
  });
});
