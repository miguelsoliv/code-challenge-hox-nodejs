import { addHours, format } from 'date-fns';
import faker from 'faker';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import AppError from '../../src/errors/AppError';
import Product from '../../src/models/Product';
import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { FakeProductsRepository } from '../../src/repositories/products';
import { UpdateProductService } from '../../src/services/products';
import { createRandomProduct } from '../factories';

let fakeProductsRepository: FakeProductsRepository;
let updateProductService: UpdateProductService;
let createdProduct: Product;

beforeAll(async () => {
  fakeProductsRepository = new FakeProductsRepository();
  updateProductService = new UpdateProductService(fakeProductsRepository);
});

describe('ENDPOINT /products', () => {
  it('Should be able to update a product', async () => {
    const updateProductSpy = jest.spyOn(fakeProductsRepository, 'updateOrFail');

    createdProduct = await createRandomProduct(
      fakeProductsRepository,
      new FakeCategoriesRepository()
    );

    const updatedProductResponse = await updateProductService.execute({
      id: createdProduct.id,
      category_id: createdProduct.category_id,
      name: faker.name.findName(),
      price: faker.random.float(),
      expiration_date: format(faker.date.future(), 'yyyy-MM-dd HH:mm:ss SS'),
      manufacturing_date: format(faker.date.past(), 'yyyy-MM-dd HH:mm:ss SS'),
      perishable_product: faker.random.boolean(),
    });

    const { id, category_id, perishable_product, created_at } = createdProduct;

    expect(updateProductSpy).toHaveBeenCalledTimes(1);
    expect(updatedProductResponse).toEqual<typeof updatedProductResponse>({
      product: {
        id,
        category_id,
        name: updatedProductResponse.product.name,
        price: updatedProductResponse.product.price,
        expiration_date: updatedProductResponse.product.expiration_date,
        manufacturing_date: updatedProductResponse.product.manufacturing_date,
        perishable_product,
        created_at,
        updated_at: updatedProductResponse.product.updated_at,
      },
    });
  });

  it('Should not be able to update a non-existing product', async () => {
    const updateProductSpy = jest.spyOn(fakeProductsRepository, 'updateOrFail');

    expect.assertions(3);

    await updateProductService
      .execute({
        id: 'invalid-product-id',
        category_id: createdProduct.category_id,
        name: faker.name.findName(),
        price: faker.random.float(),
        expiration_date: faker.date.future().toDateString(),
        manufacturing_date: faker.date.past().toDateString(),
        perishable_product: faker.random.boolean(),
      })
      .catch(err => {
        expect(err).toBeInstanceOf(EntityNotFoundError);
        expect(err).toMatchObject({
          name: 'EntityNotFound',
          message: `Could not find any entity of type "Product" matching: ""`,
        });
        expect(updateProductSpy).toHaveBeenCalledTimes(1);
      });
  });

  it('Should not be able to update a product with a manufacturing date later than its expiration date', async () => {
    const expirationDate = faker.date.future();

    const productData = {
      category_id: faker.random.uuid(),
      name: faker.name.findName(),
      price: faker.random.float(),
      expiration_date: expirationDate,
      manufacturing_date: addHours(expirationDate, 1),
      perishable_product: faker.random.boolean(),
    };

    expect.assertions(2);

    await updateProductService
      .execute({
        ...productData,
        id: createdProduct.id,
        expiration_date: format(
          productData.expiration_date,
          'yyyy-MM-dd HH:mm:ss.SSS'
        ),
        manufacturing_date: format(
          productData.manufacturing_date,
          'yyyy-MM-dd HH:mm:ss.SSS'
        ),
      })
      .catch(err => {
        expect(err).toBeInstanceOf(AppError);
        expect(err).toEqual<AppError>({
          statusCode: 400,
          message:
            'The manufacturing date cannot be later than the expiration date',
        });
      });
  });
});
